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
const axios = require('axios');
const { body, validationResult } = require('express-validator');
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
const apiKey = process.env.OPENAI_API_KEY;

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
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Save user in the database with hashedPassword
    const checkQuery = 'SELECT * FROM users WHERE username = ?';
    
    db.query(checkQuery, [username], (checkError, checkResults) => {
      if (checkError) {
        console.error('Database Error:', checkError);
        return res.status(500).json({ message: 'Error checking for existing user' });
      }
      if (checkResults.length > 0) {
        return res.status(400).json({ message: 'Username already taken' });
      }
      const insertQuery = 'INSERT INTO users (username, password) VALUES (?,?)';
      db.query(insertQuery, [username, hashedPassword], (insertError, insertResults) => {
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


// getting recommendations from OpenAI API then serving them to the client side

app.post('/getCourseRecommendations', async (req, res, next) => {
  const { resumeText } = req.body;

  try {
    const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
      prompt: `From this resume: "${ resumeText }" please give me 3 course recommendations that will help this person progress in their career path.`,
      max_tokens: 3000 // Increase the number of tokens to get more detailed responses
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    // Check if the OpenAI API returned an error
    if (response.data.error) {
      console.error('OpenAI API Error:', response.data.error);
      return res.status(500).json({ message: 'Error getting course recommendations', error: response.data.error });
    }

    // Map the choices to a simpler format
    const recommendations = response.data.choices.map(choice => choice.text.trim());

    // Return the course recommendations
    res.json(recommendations);
  } catch (error) {
    console.error('Error getting course recommendations:', error);
    next(error); // Pass the error to the error handling middleware
  }
});



app.post('/enroll', (req, res) => {
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
