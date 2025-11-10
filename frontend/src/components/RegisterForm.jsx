import React, { useState } from 'react';

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);

    const submit = async e => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const json = await res.json();
            // use status for success
            if (res.status === 201) {
                setMessage(json.message || 'Registration successful');
                alert('Registration Successful');
                setEmail('');
                setPassword('');
            } else {
                setMessage(json.error || 'Registration failed');
            }
        } catch (err) {
            setMessage('Network error');
        }
    };



    return (
        <div className="form-container">
            <form onSubmit={submit} className="register-form">
                <h2>Register</h2>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="submit-button">Register</button>
                {message && <div data-testid="message" className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</div>}
            </form>
        </div>
    );
}
