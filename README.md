# Getting Started with Create React App
<h1>🎓 Online Course Recommendation App</h1>
<p><strong>AI-powered course recommendations based on CVs</strong></p>

<hr/>

<h2>💡 Project Vision</h2>
<p>
This project is an <strong>online course platform</strong> where users can 
<strong>upload their CV</strong>, and an <strong>LLM (Large Language Model)</strong> 
analyzes their experience, skills, and career goals to recommend the 
<strong>most relevant courses</strong>.
</p>

<p>
The mission is to help professionals <strong>upskill faster, avoid irrelevant courses</strong>, 
and connect them with <strong>high-quality learning platforms</strong>.
</p>

---

<h2>💰 Monetization Strategy</h2>
<ul>
  <li>Sponsored course placements from <strong>Coursera, Platzi, and other EdTech platforms</strong></li>
  <li>Affiliate partnerships with course providers</li>
  <li>Premium plans for career guidance and advanced recommendations</li>
</ul>

---

<h2>⚙️ How It Works</h2>
<ol>
  <li>User uploads their <strong>CV</strong></li>
  <li>The backend extracts <strong>skills, roles, and experience</strong></li>
  <li>An <strong>LLM evaluates the candidate profile</strong></li>
  <li>The system generates <strong>personalized course recommendations</strong></li>
  <li>The user receives a <strong>tailored learning path</strong></li>
</ol>

---

<h2>🧩 Tech Stack</h2>
<ul>
  <li><strong>Frontend:</strong> React (Create React App)</li>
  <li><strong>Backend:</strong> Node.js + Express</li>
  <li><strong>Database:</strong> MySQL</li>
  <li><strong>AI Layer:</strong> LLM-powered recommendation engine</li>
  <li><strong>State Management:</strong> Redux Toolkit</li>
  <li><strong>Auth & Security:</strong> bcryptjs</li>
  <li><strong>API Parsing:</strong> body-parser</li>
</ul>

---

<h2>📦 Install Dependencies</h2>

<h3>Backend</h3>
<pre><code>npm install express mysql2 bcryptjs body-parser cors dotenv</code></pre>

<h3>Frontend</h3>
<pre><code>npm install @reduxjs/toolkit react-redux</code></pre>

---

<h2>🚀 How to Start the Test Environment</h2>

<h3>1️⃣ Start MySQL Server</h3>
<p>Ensure your <strong>MySQL server is running</strong>.</p>

<h3>2️⃣ Start Express Backend</h3>
<pre><code>node server.js</code></pre>
<p>Make sure there are <strong>no errors in the console</strong>.</p>

<h3>3️⃣ Start React Frontend</h3>
<pre><code>npm start</code></pre>

<p>Open in your browser:</p>
<pre><code>http://localhost:3000</code></pre>

---

<h2>🗄️ MySQL Shell — Connect & Query Guide</h2>

<h3>Connect to MySQL Shell</h3>
<pre><code>\connect your_username@localhost</code></pre>

<h3>Switch to SQL Mode</h3>
<pre><code>\sql</code></pre>

<h3>Show Databases</h3>
<pre><code>SHOW DATABASES;</code></pre>

<h3>Select Database</h3>
<pre><code>U
