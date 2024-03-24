import React, { useState, useEffect, useCallback } from 'react';
import { Container, Table, Button, Modal, Form, FormControl } from 'react-bootstrap';
import axios from 'axios';

function ViewAppointment() {
    const [appointments, setAppointments] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showTestResultModal, setShowTestResultModal] = useState(false);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [updateAppointment, setUpdateAppointment] = useState({
        id: '',
        type: '',
        test: '', 
        doctor: '', 
        technician: '', 
    });

    const [tests, setTests] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [doctors, setDoctors] = useState([]);

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
        fetchTests();
        fetchTechnicians();
        fetchDoctors();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:8084/api/appointment/viewall');
            setAppointments(response.data);
            filterAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const fetchTests = async () => {
        try {
            const response = await axios.get('http://localhost:8084/api/tests/viewall');
            const sortedTests = response.data.sort((a, b) => a.testName.localeCompare(b.testName));
            setTests(sortedTests);
        } catch (error) {
            console.error('Error fetching tests');
        }
    };

    const fetchTechnicians = async () => {
        try {
            const response = await axios.get('http://localhost:8084/api/auth/getTechnicians');
            setTechnicians(response.data);
        } catch (error) {
            console.error('Error fetching technicians:', error);
        }
    };

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:8084/api/doctors/viewall');
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const handleUpdateAppointment = async () => {
        try {
            
            const updatedData = {
                id: updateAppointment.id,
                type: updateAppointment.type,
                test: updateAppointment.test,
                technician: updateAppointment.technician,
                doctor: updateAppointment.doctor,
               
            };

            await axios.put(`http://localhost:8084/api/appointment/${updateAppointment.id}/update`, updatedData);
            handleCloseUpdateModal();
            fetchAppointments();
        } catch (error) {
            console.error('Error updating appointment:', error);
        }
    };

    const handleCancelAppointment = async (appointmentId) => {
        try {
            await axios.put(`http://localhost:8084/api/appointment/${appointmentId}/cancel`);
            fetchAppointments();
        } catch (error) {
            console.error('Error canceling appointment:', error);
        }
    };

    const handleTestResultSubmission = async () => {
        try {

            await axios.post('http://localhost:8084/api/result/create', testResultData);

            handleCloseTestResultModal();
        } catch (error) {
            console.error('Error submitting test result:', error);
        }
    };


    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
    };

    const handleShowUpdateModal = (appointmentId) => {
        const selectedAppointment = appointments.find(appointment => appointment.id === appointmentId);
        setUpdateAppointment({
            id: selectedAppointment.id,
            type: selectedAppointment.type,
            test: selectedAppointment.test,
            technician: selectedAppointment.technician,
            doctor: selectedAppointment.doctor
        });
        setShowUpdateModal(true);
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


    function formatDate(dateTime) {
        const date = new Date(dateTime);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    function formatTime(dateTime) {
        const date = new Date(dateTime);
        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
        return date.toLocaleTimeString('en-US', options);
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
                                    <Button variant="primary" onClick={() => handleShowUpdateModal(appointment.id)}>Update</Button>
                                    <Button variant="danger" onClick={() => handleCancelAppointment(appointment.id)}>Cancel</Button>
                                    <Button variant="info" onClick={() => handleShowTestResultModal(appointment.id)}>Test Result</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

           
            <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Appointment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="updateType">
                            <Form.Label>Appointment Type</Form.Label>
                            <Form.Control as="select" value={updateAppointment.type} onChange={(e) => setUpdateAppointment({ ...updateAppointment, type: e.target.value })}>
                                <option value="Regular">Regular</option>
                                <option value="Emergency">Emergency</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="updateTestName">
                            <Form.Label>Test Name</Form.Label>
                            <Form.Control as="select" value={updateAppointment.test} onChange={(e) => setUpdateAppointment({ ...updateAppointment, test: e.target.value })}>
                                {tests.map(testItem => (
                                    <option key={testItem.id} value={testItem.testName}>{testItem.testName}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="updateTechnician">
    <Form.Label>Technician</Form.Label>
    <Form.Control as="select" value={updateAppointment.technician} onChange={(e) => setUpdateAppointment({ ...updateAppointment, technician: e.target.value })}>
        {technicians.sort((a, b) => a.name.localeCompare(b.name)).map(technician => (
            <option key={technician.id} value={technician.name}>{technician.name}</option>
        ))}
    </Form.Control>
</Form.Group>
<Form.Group controlId="updateDoctor">
    <Form.Label>Doctor Name</Form.Label>
    <Form.Control as="select" value={updateAppointment.doctor} onChange={(e) => setUpdateAppointment({ ...updateAppointment, doctor: e.target.value })}>
        {doctors.sort((a, b) => a.name.localeCompare(b.name)).map(doctor => (
            <option key={doctor.id} value={doctor.name}>{doctor.name}</option>
        ))}
    </Form.Control>
</Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseUpdateModal}>Close</Button>
                    <Button variant="primary" onClick={handleUpdateAppointment}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
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

export default ViewAppointment;
