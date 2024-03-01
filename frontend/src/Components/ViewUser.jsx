import React, { useState, useEffect } from 'react';
import { Container, Table, Form, Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const ViewUser = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:8084/api/auth/viewusers')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    }

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    }


    const handleDelete = (id) => {
        // Convert id to string for comparison
        const userId = String(id);
    
        axios.delete(`http://localhost:8084/api/auth/deleteuser/${id}`)
            .then(() => {
                // Remove the deleted user from the state
                setUsers(users.filter(user => user.id !== userId));
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    }

    const handleSaveChanges = () => {
        if (selectedUser && selectedUser.id) {
            
            const { name, username, email, age, contact, gender } = selectedUser;

            // Create a new object with only the editable fields
            const updatedUser = { name, username, email, age, contact, gender };

            // Send PUT request to update user details
            axios.put(`http://localhost:8084/api/auth/updateuser/${selectedUser.id}`, updatedUser)
                .then(() => {
                    // Close the modal
                    setShowModal(false);
                    // Refresh users after update
                    fetchUsers();
                })
                .catch(error => {
                    console.error('Error updating user:', error);
                });
        }
    }

    return (
        <Container>
            <h1>View Users</h1>
            <Form.Group controlId="search">
                <Form.Control
                    type="text"
                    placeholder="Search here.."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </Form.Group>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Contact</th>
                        <th>Gender</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
    {filteredUsers.map(user => (
            <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.contact}</td>
                <td>{user.gender}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                    <Button variant="primary" onClick={() => handleEdit(user)}>Edit</Button>{' '}
                    <Button variant="danger" onClick={() => handleDelete(user.id)}>Delete</Button>
                </td>
            </tr>
        
    ))}
    </tbody>
            </Table>
            {/* Edit Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Form to edit user details */}
                    {selectedUser !== null &&(
                        <Form>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" defaultValue={selectedUser.name} onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formAge">
                                <Form.Label>Age</Form.Label>
                                <Form.Control type="number" defaultValue={selectedUser.age} onChange={(e) => setSelectedUser({ ...selectedUser, age: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formContact">
                                <Form.Label>Contact</Form.Label>
                                <Form.Control type="text" defaultValue={selectedUser.contact} onChange={(e) => setSelectedUser({ ...selectedUser, contact: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formGender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control as="select" defaultValue={selectedUser.gender} onChange={(e) => setSelectedUser({ ...selectedUser, gender: e.target.value })}>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" defaultValue={selectedUser.email} onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })} />
                            </Form.Group>
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" defaultValue={selectedUser.username} onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })} />
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default ViewUser;