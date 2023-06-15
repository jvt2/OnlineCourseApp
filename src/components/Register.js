import React, { useState } from 'react';

function Register({ onRegister }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onRegister(username, password);
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
        </form>
    );
}

export default Register;