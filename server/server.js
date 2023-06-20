require('dotenv').config();
const express = require('express');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 3001;
const db = require('./database/db'); // Import the database connection


// Middleware to parse JSON request bodies
app.use(express.json());

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept only pdf, docx, or txt
  if (file.mimetype === 'application/pdf' ||
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.mimetype === 'text/plain') {
    cb(null, true);
  } else {
    cb(new Error('File type not allowed'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// File upload endpoint
app.post('/uploadResume', upload.single('resume'), (req, res) => {
  console.log('File uploaded successfully');
  // You can now send the file to the ChatGPT API for course recommendations
  res.status(200).send('File uploaded successfully');
});

// Example route to enroll a user in a course
app.post('/enroll', (req, res) => {
  const { userId, courseId } = req.body; // Corrected to courseId

  // Insert enrollment into the database
  const query = 'INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)';
  db.query(query, [userId, courseId], (error, results) => { // Corrected to courseId
    if (error) {
      console.error('Database error:', error);
      res.status(500).json({ message: 'An error occurred' });
    } else {
      res.json({ message: 'Enrollment successful' });
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
