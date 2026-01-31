# Getting Started with Create React App
🎓 Online Course Recommendation App

AI-powered course recommendations based on CVs

This project is an online course platform where users can upload their CV, and the system uses an LLM (Large Language Model) to recommend the most relevant courses based on their skills, experience, and career goals.

The goal is to help candidates upskill faster while creating a monetization channel through sponsored course providers such as Coursera, Platzi, and other learning platforms.

💡 Project Vision

Many professionals don’t know which courses will actually improve their careers.

This app solves that by:

Analyzing a candidate’s CV

Understanding their skills, background, and gaps

Using AI to recommend personalized courses

Connecting them with high-quality course providers

Future Monetization Strategy

Sponsored recommendations from Platzi, Coursera, and other platforms

Affiliate partnerships with online education providers

Premium plans for advanced career guidance

⚙️ How It Works

A user uploads their CV

The backend extracts structured data (skills, roles, experience)

An LLM evaluates the profile

The system generates top course recommendations

The user sees personalized learning paths

🧩 Tech Stack

Frontend: React (Create React App)

Backend: Node.js + Express

Database: MySQL

AI Layer: LLM-powered recommendation engine

State Management: Redux Toolkit

Authentication: bcryptjs

API Parsing: body-parser

📦 Install Dependencies
Backend
npm install express mysql2 bcryptjs body-parser cors dotenv

Frontend
npm install @reduxjs/toolkit react-redux

🚀 How to Start the Test Environment
1️⃣ Start MySQL Server

Ensure your MySQL server is running.

2️⃣ Start the Express Backend
node server.js


Confirm there are no errors in the terminal.

3️⃣ Start the React Frontend
npm start
# or
yarn start


Open:

http://localhost:3000

🗄️ MySQL Shell — Connect & Query Guide
Connect to MySQL Shell
\connect your_username@localhost

Switch to SQL Mode
\sql

Show Databases
SHOW DATABASES;

Select Database
USE your_database_name;

Show Tables
SHOW TABLES;

View Table Data
SELECT * FROM table_name;

📜 Available Scripts (React)
Start Development
npm start

Run Tests
npm test

Build Production App
npm run build

Eject (Advanced)
npm run eject


⚠️ This action is irreversible.

🛠️ Setup Notes

Install bcryptjs and body-parser for backend support

Install Redux Toolkit if using global state

Create MySQL tables manually if missing

Configure .env with DB credentials

Ensure MySQL user permissions are correct

📈 Why This Project Matters

This project aims to:

Help people choose the right courses, not just more courses

Reduce wasted time and money on irrelevant learning

Create a career accelerator powered by AI

Build a scalable EdTech product with real monetization potential

📚 Learn More

Create React App Docs
https://create-react-app.dev/

React Docs
https://react.dev/

🤝 Want to Contribute or Partner?

If you’re a:

Developer

EdTech company

Course provider (Coursera, Platzi, etc.)

Sponsor or investor

Feel free to open an issue or reach out.
