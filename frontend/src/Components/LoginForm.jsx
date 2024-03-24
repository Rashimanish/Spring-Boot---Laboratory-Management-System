import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './login.css';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [attemptCount, setAttemptCount] = useState(0);
    const [blocked, setBlocked] = useState(false); 

    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (attemptCount >= 3 && !blocked) {
            setError('Too many attempts, wait 10 minutes and try again');
            setBlocked(true);
            setTimeout(() => {
                setAttemptCount(0);
                setBlocked(false);
                setError('');
            }, 600000);
            return;
        }

        try {
            const response = await axios.post('http://localhost:8084/api/auth/login', formData);
    
            if (response.status === 200) {
                const user = response.data;
                localStorage.setItem('loggedInUser', JSON.stringify(user));
               
                if (user.role && user.role.length > 0) {
                    // Redirect user based on their role
                    if (user.role.includes('Patient')) {
                        navigate('/patient');
                    } else if (user.role.includes('Admin')) {
                        navigate('/admin');
                    } else if (user.role.includes('Technician')) {
                        navigate('/technician');
                    } else {
                        setError('Invalid user role');
                    }
                } else {
                    setError('User roles not found');
                }
            } else {
                setError('Invalid response status');
            }
        } catch (error) {
            setAttemptCount(attemptCount + 1);
            setError('Invalid username or password');
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="login-container">
            <h2 className="text-center">User Login</h2>
            {error && <Alert variant="danger">{error}</Alert>} 
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <p className="mt-3">
                New user? <Link to="/register" style={{ fontWeight: 'bold', color: '#1B3C73', fontSize: '1.2em' }}>Register here</Link> 
            </p>
        </div>
    );
};

export default LoginForm;
