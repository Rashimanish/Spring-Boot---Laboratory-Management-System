import React, { useState } from 'react';
import './register.css';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate , Link} from 'react-router-dom';

const RegistrationForm = () => {
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
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    
    const validateForm = () => {
        let valid = true;
        const newErrors = {};

     
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            valid = false;
        }

       
        if (!formData.age.trim()) {
            newErrors.age = 'Age is required';
            valid = false;
        }

        
        if (!formData.contact.trim()) {
            newErrors.contact = 'Contact is required';
            valid = false;
        }

    
        if (!formData.gender) {
            newErrors.gender = 'Gender is required';
            valid = false;
        }

      
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
            valid = false;
        }

      
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
            valid = false;
        }

        
        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
            valid = false;
        }

        if (!formData.role) {
            newErrors.role = 'Role is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:8084/api/auth/register', formData);
               
                if (response.status === 200) {
                    
                    setSuccessMessage('Registration successful. Redirecting to login...');
                    
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                }
            } catch (error) {
                if (error.response) {
                    setErrors(error.response.data.errors); 
                } else {
                    setErrors({ registration: 'Registration failed. Please try again.' }); 
                }
                console.error('Registration failed:', error);
            }
        };
    }

    return (
        <div className='reg-container'>
            <div className="form-container">
                <h2 className="text-center">Registration</h2>
                {errors.registration && <Alert variant="danger">{errors.registration}</Alert>}
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            isInvalid={!!errors.name}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="age">
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Enter age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            isInvalid={!!errors.age}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="contact">
                        <Form.Label>Contact</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter contact"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            isInvalid={!!errors.contact}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.contact}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            isInvalid={!!errors.gender}
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!errors.email}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            isInvalid={!!errors.username}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            isInvalid={!!errors.password}
                            required
                        />
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="role">
                        <Form.Label>Role</Form.Label>
                        <Form.Select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            isInvalid={!!errors.role}
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="Patient">Patient</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
                <p className="mt-3">
                Already have an account? <Link to="/login">Login here</Link> 
            </p>
            </div>
        </div>
    );
};

export default RegistrationForm;

