require('dotenv').config();
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const initializePassport = require('./passport-config');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3001;
const db = require('./database/db');

app.use(express.json());
app.use(passport.initialize());

initializePassport(passport, email => {
  // Implement logic to retrieve user from database by email
});

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

app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Save user in the database with hashedPassword
    res.status(201).send('User Registered');
  } catch {
    res.status(500).send('Error registering User');
  }
});

app.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

app.post('/uploadResume', upload.single('resume'), (req, res) => {
  console.log('File uploaded successfully');
  res.status(200).send('File uploaded successfully');
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
