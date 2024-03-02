import React, { useEffect, useState } from "react";
import { Form, Button, Table, FormControl, Modal, FormGroup } from 'react-bootstrap';
import './component.css';
import axios from 'axios';

const DoctorProfile = () => {
    const [name, setName] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedDoctorId, setSelectedDoctorId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:8084/api/doctors/viewall');
            setDoctors(response.data);
            setFilteredDoctors(response.data);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error fetching doctors');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        try {
            await axios.post('http://localhost:8084/api/doctors/adddoctor', {
                name: name,
                specialization: specialization
            });
            setName('');
            setSpecialization('');
            fetchDoctors();
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error adding doctor');
        }
    };

    const handleSearch = (event) => {
        const keyword = event.target.value.toLowerCase();
        setSearchKeyword(keyword);
        const filtered = doctors.filter((doctor) => doctor.name.toLowerCase().includes(keyword));
        setFilteredDoctors(filtered);
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8084/api/doctors/delete/${id}`);
            fetchDoctors();
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error deleting doctor');
        }
    };

    const handleEdit = (id) => {
        const selectedDoctor = doctors.find((doctor) => doctor.id === id);
        setName(selectedDoctor.name);
        setSpecialization(selectedDoctor.specialization);
        setSelectedDoctorId(id);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setName('');
        setSpecialization('');
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(`http://localhost:8084/api/doctors/update/${selectedDoctorId}`, {
                name: name,
                specialization: specialization
            });
            handleCloseModal();
            fetchDoctors();
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error updating doctor');
        }
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Form.Label>Doctor Name:</Form.Label>
                    <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Form.Label>Specialization</Form.Label>
                    <Form.Control type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
                </FormGroup>
                <Button type="submit">Save Doctor Details</Button>
            </Form>
            <Form className="mt-4">
                <FormControl
                    type="text"
                    placeholder="Search here.."
                    className="mr-sm-2"
                    value={searchKeyword}
                    onChange={handleSearch}
                />
            </Form>
            <Table striped bordered hover responsive className="mt-3">
                <thead>
                    <tr>
                        <th>Doctor Name</th>
                        <th>Specialization</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDoctors.map((doctor) => (
                        <tr key={doctor.id}>
                            <td>{doctor.name}</td>
                            <td>{doctor.specialization}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDelete(doctor.id)}>Delete</Button>
                                <Button variant="primary" onClick={() => handleEdit(doctor.id)}>Edit</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Doctor Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Doctor Name:</Form.Label>
                        <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Specialization:</Form.Label>
                        <Form.Control type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={handleEditSubmit}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default DoctorProfile;
