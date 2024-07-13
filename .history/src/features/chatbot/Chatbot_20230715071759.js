import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css'; // Import the CSS file


function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async (event) => {
    event.preventDefault();

    // Append the user's message to the messages array
    setMessages([...messages, { text: input, user: 'user' }]);

    try {
      // Send the user's message to the OpenAI API
      const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: input,
        max_tokens: 60
      }, {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      // Append the chatbot's response to the messages array
      setMessages([...messages, { text: response.data.choices[0].text.trim(), user: 'chatbot' }]);
    } catch (error) {
      console.error(error);
    }

    // Clear the input field
    setInput('');
  };

  return (
    <>
      <div className={`chatbot-container ${isOpen ? 'chatbot-open' : ''}`}>
        <div className="chatbot-header">
          <h2>Chatbot</h2>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
        <div className="chatbot-messages">
          {messages.map((message, index) => (
            <p key={index}><strong>{message.user}:</strong> {message.text}</p>
          ))}
        </div>
        <form onSubmit={sendMessage} className="chatbot-input-form">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} className="chatbot-input" />
          <button type="submit" className="chatbot-button">Send</button>
        </form>
      </div>
      <div className="chatbot-icon" onClick={() => setIsOpen(true)}>
        <img src={chatbotIcon} alt="Chatbot" />
      </div>
    </>
  );
}

export default Chatbot;
