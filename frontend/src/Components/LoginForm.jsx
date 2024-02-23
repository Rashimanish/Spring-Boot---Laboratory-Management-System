import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom'; // Import useHistory hook
import axios from 'axios';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const history = useHistory(); // Initialize useHistory hook

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', formData);
            // Check user role and redirect accordingly
            const userRoles = response.data.roles.map(role => role.name);
            if (userRoles.includes('ROLE_PATIENT')) {
                history.push('/patient-dashboard'); // Redirect to patient dashboard
            } else if (userRoles.includes('ROLE_ADMIN')) {
                history.push('/admin-dashboard'); // Redirect to admin dashboard
            } else if (userRoles.includes('ROLE_TECHNICIAN')) {
                history.push('/technician-dashboard'); // Redirect to technician dashboard
            } else {
                setError('Invalid user role');
            }
        } catch (error) {
            setError('Invalid username or password');
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="container">
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
                New user? <Link to="/api/auth/register">Register here</Link>
            </p>
        </div>
    );
};

export default LoginForm;
