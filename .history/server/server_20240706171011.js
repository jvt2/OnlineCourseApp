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
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use(bodyParser.json());

const port = process.env.PORT || 3002;


// OpenAI API Key
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('OpenAI API Key not found');
  process.exit(1);
} 

// forgot password function later on we can use.
//initializePassport(passport, email => {
  // Implement logic to retrieve user from database by email
//});

const fs = require('fs');
const path = require('path');

// Create the uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.mimetype === 'text/plain') {
    cb(null, true);
  } else {
    cb(new Error('File type not allowed'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

app.post('/register', [
  body('username').isString().isLength({ min: 3 }).withMessage('Username must be at leas 3 characters long'),
  body('password').isString().isLength({ min: 8 }).withMessage('Password must be at leas 8 characters long'),
  body('email').isEmail().withMessage('Email must be valid')
], async (req, res) => {
  //Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // Save user in the database with hashedPassword
    const checkQuery = 'SELECT * FROM users WHERE username = ? OR email = ?';
    
    db.query(checkQuery, [username, email], (checkError, checkResults) => {
      if (checkError) {
        console.error('Database Error:', checkError);
        return res.status(500).json({ message: 'Error checking for existing user' });
      }
      if (checkResults.length > 0) {
        return res.status(400).json({ message: 'Username already taken' });
      }
      const insertQuery = 'INSERT INTO users (username, password, email) VALUES (?,?,?)';
      db.query(insertQuery, [username, hashedPassword, email], (insertError, insertResults) => {
        if (insertError) {
          console.error('Database Error:', insertError);
          return res.status(500).json({ message: 'Error Registering User' });
        }
        return res.status(201).json({ message: 'User Registered' });
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error registering User');
  }  
});

app.post('/login', [
  body('username').isString().withMessage('Username must be string'),
  body('password').isString().withMessage('Password must be string')
] ,passport.authenticate('local', { session: false }), (req, res) => {
  // Checking for validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

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



// getting recommendations from OpenAI API then serving them to the client side

app.post('/getCourseRecommendations', async (req, res, next) => {
  const { resumeText } = req.body;
  console.log('Resume Text:', resumeText);
  // Check if resumeText is present 
  if (!resumeText) {
    return res.status(400).json({ message: 'Please provide resume text' });
  }

  try {
    console.log('Getting course recommendations from OpenAI API');
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      prompt: `From this resume: "${resumeText}" please give me 3 course recommendations that will help this person progress in their career path.`,
      max_tokens: 3000
  }, {
      headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
      }
  });
  

    console.log('POST request sentm response received')
    console.log('OpenAI API Response:', response.data);

    // Check if the OpenAI API returned an error
    if (response.data.error) {
      console.error('OpenAI API Error:', response.data.error);
      return res.status(500).json({ message: 'Error getting course recommendations', error: response.data.error });
    }

    const parsedRecommendations = response.data.choices[0].text.trim().split('\n').map((recommendation, index) => {
      return { id: index, text: recommendation };
  });

    // Return the course recommendations
    res.json(parsedRecommendations);
  } catch (error) {
    console.error('Error getting course recommendations:', error);
    next(error); // Pass the error to the error handling middleware
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
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
      res.json({message: 'Enrollment successful' });
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

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
