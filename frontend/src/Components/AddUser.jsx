import React, { useState } from 'react';
import './component.css';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
    const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        contact: '',
        gender: '',
        email: '',
        username: '',
        password: '',
        role: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if any field is empty
        if (!validateForm()) {
            setError('Please fill in all the fields.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8084/api/auth/register', formData);
            // Check if registration was successful
            if (response.status === 200) {
                setSuccess('User registered successfully!');
                setTimeout(() => {
                    navigate('/admin/viewUser');
                }, 2000); // Redirect after 2 seconds
            }
        } catch (error) {
            // Handle registration failure and display error message
            setError('Registration failed. Please try again.');
            console.error('Registration failed:', error);
        }
    };

    const validateForm = () => {
        for (const field in formData) {
            if (!formData[field].trim()) {
                return false;
            }
        }
        return true;
    };

    return (
        <div className='reg-container'>
            <div className="form-container">
                <h2 className="text-center">Create User</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="age">
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="contact">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter contact"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

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

                    <Form.Group className="mb-3" controlId="role">
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="Patient">Patient</option>
                            <option value="Technician">Technician</option>
                        </Form.Select>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default AddUser;
