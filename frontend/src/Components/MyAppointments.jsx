import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';

const MyAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('loggedInUser'));
            if (user && user.name) {
                const response = await axios.get(`http://localhost:8084/api/appointment/viewByUser/${user.name}`);
                setAppointments(response.data);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
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

    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    };

    const formatTime = (date) => {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return new Date(date).toLocaleTimeString(undefined, options);
    };

    return (
        <Container>
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
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.number}</td>
                            <td>{appointment.type}</td>
                            <td>{formatDate(appointment.dateTime)}</td>
                            <td>{formatTime(appointment.dateTime)}</td>
                            <td>{appointment.patientName}</td>
                            <td>{appointment.test}</td>
                            <td>{appointment.technician}</td>
                            <td>{appointment.doctor}</td>
                            <td>{appointment.status}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleCancelAppointment(appointment.id)}>Cancel</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default MyAppointments;
