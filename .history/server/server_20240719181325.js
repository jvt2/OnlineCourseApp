//server.js

require('dotenv').config();
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const initializePassport = require('./passport-config');
initializePassport(passport);
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3001;
const db = require('./database/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const { body, validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf'); // Add this import

app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use(bodyParser.json());

// OpenAI API Key
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('OpenAI API Key not found');
  process.exit(1);
}

// Create the uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploadsDir');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploadsDir/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1024 * 1024}, // 1MB file size limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed'), false);
    }
  }
});

// Register a new user
app.post('/register', upload.single('resume'), [
  body('username').isString().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('password').isString().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  body('email').isEmail().withMessage('Email must be valid')
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password, email } = req.body;
  const resumePath = req.file.path;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Resume Path:', resumePath);

    // Check if user already exists
    const checkQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
    db.query(checkQuery, [username, email], (checkError, checkResults) => {
      if (checkError) {
        console.error('Database Error:', checkError);
        return res.status(500).json({ message: 'Error checking for existing user' });
      }
      if (checkResults.length > 0) {
        return res.status(400).json({ message: 'Username or email already taken' });
      }

      // Insert new user into the database
      const insertQuery = 'INSERT INTO users (username, password, email, resume_path) VALUES (?, ?, ?, ?)';
      db.query(insertQuery, [username, hashedPassword, email, resumePath], (insertError, insertResults) => {
        if (insertError) {
          console.error('Database Error:', insertError);
          return res.status(500).json({ message: 'Error registering user' });
        }
        const token = jwt.sign({ email }, 'secretkey', { expiresIn: '1h' });
        return res.status(201).json({ message: 'User registered', token });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering user');
  }
});

// Endpoint to check if email exists
app.post('/check-email', (req, res) => {
  const { email } = req.body;

  // Check if the email exists in the database
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Email not found' });
    }

    res.status(200).json({ message: 'Email found' });
  });
});

// LOGIN
app.post('/login', async (req, res) => {
  console.log('Request Body:', req.body);
  const { email, password } = req.body;

  // Check if the email exists in the database
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (error, results) => {
    if (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ email }, 'secretkey', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Upload resume
app.post('/uploadResume', upload.single('resume'), (req, res) => {
  console.log('File uploaded successfully');
  res.status(200).send('File uploaded successfully');
});

// Get user's enrolled courses
app.get('/courses', async (req, res) => {
  const query = 'SELECT * FROM courses';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ message: 'Error fetching courses' });
    } else {
      res.json(results);
    }
  });
});

// Course details
app.get('/courses/:id', async (req, res) => {
  const courseId = req.params.id;
  const query = 'SELECT * FROM courses WHERE id = ?';
  db.query(query, [courseId], (error, results) => {
    if (error) {
      console.error('Error fetching course details:', error);
      res.status(500).json({ message: 'Error fetching course details' });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Course not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Helper functions
const getResumePath = async (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT resume_path FROM users WHERE id = ?';
    db.query(query, [userId], (error, results) => {
      if (error) {
        return reject('Database error');
      }
      if (results.length === 0) {
        return reject('User not found');
      }
      resolve(results[0].resume_path);
    });
  });
};

const getResumeText = async (resumePath) => {
  const arrayBuffer = fs.readFileSync(resumePath);
  const typedArray = new Uint8Array(arrayBuffer);
  const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
  let text = '';
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map(item => item.str).join(' ');
  }
  return text;
};

const parseOpenAIResponse = (messageContent) => {
  const lines = messageContent.split('\n\n');
  return lines.map((line, index) => {
    const [title, ...descriptionParts] = line.split(': ');
    const titleText = title.trim();
    const descriptionText = descriptionParts.join(': ').trim();
    return { id: index, title: titleText, description: descriptionText };
  });
};

// Endpoint for OpenAI course recommendations
app.post('/courses', async (req, res, next) => {
  const { resumeText } = req.body;
  console.log('Resume Text:', resumeText);
  if (!resumeText) {
    return res.status(400).json({ message: 'Please provide resume text' });
  }

  try {
    console.log('Getting course recommendations from OpenAI API');
    const response = await axios.post('https://api.openai.com//v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: [{ role: "user", content: `From this resume: "${resumeText}" please give me 3 course recommendations that will help this person progress in their career path.` }],
      max_tokens: 3000
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('POST request sent, response received');
    console.log('OpenAI API Response:', JSON.stringify(response.data, null, 2));

    const messageContent = response.data.choices[0].message.content;
    console.log('Message Content:', messageContent);

    if (messageContent) {
      const parsedRecommendations = parseOpenAIResponse(messageContent);
      console.log('Parsed Recommendations:', parsedRecommendations);
      res.json(parsedRecommendations);
    } else {
      throw new Error('No content found in OpenAI API response');
    }
  } catch (error) {
    console.error('Error getting course recommendations:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Career Path Recommendations
app.get('/user/:id/career-path', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const userId = req.params.id;
  try {
    const resumePath = await getResumePath(userId);
    const resumeText = await getResumeText(resumePath);
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [{ role: "user", content: `Based on this resume: "${resumeText}" please suggest potential career paths.` }],
      max_tokens: 3000
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const careerPaths = parseOpenAIResponse(response.data.choices[0].message.content);
    res.status(200).json(careerPaths);
  } catch (error) {
    console.error('Error getting career path recommendations:', error.message);
    res.status(500).json({ message: 'Error getting career path recommendations', error: error.message });
  }
});

// Skill Development Recommendations
app.get('/user/:id/skill-development', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const userId = req.params.id;
  try {
    const resumePath = await getResumePath(userId);
    const resumeText = await getResumeText(resumePath);
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [{ role: "user", content: `Based on this resume: "${resumeText}" please suggest skills that this person should develop further.` }],
      max_tokens: 3000
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const skillRecommendations = parseOpenAIResponse(response.data.choices[0].message.content);
    res.status(200).json(skillRecommendations);
  } catch (error) {
    console.error('Error getting skill development recommendations:', error.message);
    res.status(500).json({ message: 'Error getting skill development recommendations', error: error.message });
  }
});

// Enroll in a course
app.post('/enrollments', (req, res) => {
  const { userId, courseId } = req.body;
  const query = 'INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)';
  db.query(query, [userId, courseId], (error, results) => {
    if (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'An error occurred' });
    } else {
      res.json({ message: 'Enrollment successful' });
    }
  });
});

// Getting enrolled courses
app.get('/user/:id/courses', (req, res) => {
  const userId = req.params.id;
  const query = `
    SELECT c.* FROM courses c
    JOIN enrollments e ON c.id = e.course_id
    WHERE e.user_id = ?
  `;
  db.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error fetching enrolled courses:', error);
      res.status(500).json({ message: 'Error fetching enrolled courses' });
    } else {
      res.json(results);
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
