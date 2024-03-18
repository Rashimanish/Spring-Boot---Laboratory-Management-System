import React, { useState, useEffect, useCallback } from 'react';
import { Container, Table, Button, Modal, Form, FormControl } from 'react-bootstrap';
import axios from 'axios';

function TechAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [showTestResultModal, setShowTestResultModal] = useState(false);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const [testResultData, setTestResultData] = useState({
        appointmentId: '',
        appointmentType: '',
        appointmentNumber: '',
        appointmentDateTime: '',
        patientName: '',
        testName: '',
        technician: '',
        testRange: '',
        remark: '',
        description: ''
    });

    useEffect(() => {
        fetchAppointments();
    }, []);

    async function fetchAppointments() {
        try {
            const user = JSON.parse(localStorage.getItem('loggedInUser'));
            if (user && user.name) {
                const response = await axios.get(`http://localhost:8084/api/appointment/viewByTechnician/${user.name}`);
                setAppointments(response.data);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    }

    async function handleCancelAppointment(appointmentId) {
        try {
            await axios.put(`http://localhost:8084/api/appointment/${appointmentId}/cancel`);
            fetchAppointments();
        } catch (error) {
            console.error('Error canceling appointment:', error);
        }
    }

    const handleTestResultSubmission = async () => {
        try {

            await axios.post('http://localhost:8084/api/result/create', testResultData);

            handleCloseTestResultModal();
        } catch (error) {
            console.error('Error submitting test result:', error);
        }
    };

    const handleCloseTestResultModal = () => {
        setShowTestResultModal(false);
    };

    const handleShowTestResultModal = (appointmentId) => {
        const selectedAppointment = appointments.find(appointment => appointment.id === appointmentId);
        setTestResultData({
            appointmentId: selectedAppointment.id,
            appointmentType: selectedAppointment.type,
            appointmentNumber: selectedAppointment.number,
            appointmentDateTime: selectedAppointment.dateTime,
            patientName: selectedAppointment.patientName,
            testName: selectedAppointment.test,
            technician: selectedAppointment.technician,
            testRange: '',
            remark: '',
            description: ''
        });
        setShowTestResultModal(true);
    };

    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    function formatTime(date) {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return new Date(date).toLocaleTimeString(undefined, options);
    }

    const filterAppointments = useCallback((appointmentsData) => {
        const filtered = appointmentsData.filter(appointment => {
            return (
                (appointment.patientName && appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (appointment.number && appointment.number.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (appointment.type && appointment.type.toLowerCase().includes(searchQuery.toLowerCase())) ||
                (appointment.status && appointment.status.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        });

        setFilteredAppointments(filtered);
    }, [searchQuery]);

    
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        filterAppointments(appointments);
    }, [searchQuery, appointments, filterAppointments]);

    return (
        <Container>
            <FormControl
                type="text"
                placeholder="Search..."
                className="mr-sm-2 mb-3"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            {filteredAppointments.length === 0 ? (
                <p>No records found 😔</p>
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Appointment Number</th>
                            <th>Appointment Type</th>
                            <th>Test Date</th>
                            <th>Test Time</th>
                            <th>Patient Name</th>
                            <th>Test Name</th>
                            <th>Technician</th>
                            <th>Doctor Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments
                .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime)) 
                .map((appointment) => (
                            <tr key={appointment.id}>
                                <td>{appointment.number}</td>
                                <td>{appointment.type}</td>
                                <td>{formatDate(appointment.dateTime)} </td>
                                <td>{formatTime(appointment.dateTime)}</td>
                                <td>{appointment.patientName}</td>
                                <td>{appointment.test}</td>
                                <td>{appointment.technician}</td>
                                <td>{appointment.doctor}</td>
                                <td>{appointment.status}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleCancelAppointment(appointment.id)}>Cancel</Button>
                                    <Button variant="info" onClick={() => handleShowTestResultModal(appointment.id)}>Test Result</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

{/* Modal for Test Result */}
<Modal show={showTestResultModal} onHide={handleCloseTestResultModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Test Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="testRange">
                            <Form.Label>Test Range</Form.Label>
                            <Form.Control type="text" value={testResultData.testRange} onChange={(e) => setTestResultData({ ...testResultData, testRange: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="remark">
                            <Form.Label>Remark</Form.Label>
                            <Form.Control type="text" value={testResultData.remark} onChange={(e) => setTestResultData({ ...testResultData, remark: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={testResultData.description} onChange={(e) => setTestResultData({ ...testResultData, description: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseTestResultModal}>Close</Button>
                    <Button variant="primary" onClick={handleTestResultSubmission}>Submit</Button>
                </Modal.Footer>
            </Modal>

        </Container>
    );
}

export default TechAppointments;
