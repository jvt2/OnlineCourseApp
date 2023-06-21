import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, userNavigate } from 'react-router-dom';

function Register({ onRegister }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            // Send a POST request to the server with the username and password
            const response = await axios.post('/register', { username, password});

            //Handle response (this could be redirect, update UI , etc)
            console.log(response.data);
            onRegister(username, password);
            navigate('/login');
        } catch (error) {
            //Display error Message
            setError('Registration failed. Please Try Again.');
            console.error(error);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <label>
                username
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password:
                <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <input type="submit" value="Register" />

            {error && <div style={{ color: 'red'}}>{error}</div>}
        </form>
    );
}

export default Register;