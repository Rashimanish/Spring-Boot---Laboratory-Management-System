import React, { useState } from 'react';
import './component.css';
import { Form, Button } from 'react-bootstrap';
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
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        setErrors({ ...errors, [name]: '' });
       
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newErrors = {};
        for (const field in formData) {
            if (!formData[field].trim()) {
                newErrors[field] = 'Please fill in this field.';
            }
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:8084/api/auth/register', formData);
            
            if (response.status === 200) {
                setFormData({
                    name: '',
                    age: '',
                    contact: '',
                    gender: '',
                    email: '',
                    username: '',
                    password: '',
                    role: ''
                }); 
                setErrors({}); 
                setSuccess('User registered successfully!'); 
                navigate('/admin/viewUser');
            }
        } catch (error) {
            
            console.error('Registration failed:', error);
            setErrors({ server: 'Registration failed. Please try again.' });
            setSuccess('');
        }
    };

    return (
        <div className='reg-container'>
            <div className="form-container">
                <h2 className="text-center">Create User</h2>
                {errors.server && <Form.Label className="text-danger">{errors.server}</Form.Label>}
                {success && <Form.Label className="text-success">{success}</Form.Label>}
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
                        {errors.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
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
                        {errors.age && <Form.Text className="text-danger">{errors.age}</Form.Text>}
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
                        {errors.contact && <Form.Text className="text-danger">{errors.contact}</Form.Text>}
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
                        {errors.gender && <Form.Text className="text-danger">{errors.gender}</Form.Text>}
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
                        {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
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
                        {errors.username && <Form.Text className="text-danger">{errors.username}</Form.Text>}
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
                        {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
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
                        {errors.role && <Form.Text className="text-danger">{errors.role}</Form.Text>}
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
