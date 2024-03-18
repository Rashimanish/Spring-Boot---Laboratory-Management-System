import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal , Alert} from 'react-bootstrap';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

function MyAppointments() {
    const [appointments, setAppointments] = useState([]);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [paymentError, setPaymentError] = useState(null);
    const [loading, setLoading] = useState(false); 
    
    useEffect(() => {
        fetchAppointments();
    }, []);

    async function fetchAppointments() {
        try {
            const user = JSON.parse(localStorage.getItem('loggedInUser'));
            if (user && user.name) {
                const response = await axios.get(`http://localhost:8084/api/appointment/viewByUser/${user.name}`);
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

    function handleOpenPaymentModal(appointment) {
        setSelectedAppointment(appointment);
        setShowPaymentModal(true);
    }

    function handleClosePaymentModal() {
        setShowPaymentModal(false);
        setSelectedAppointment(null);
    }

    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
    }

    function formatTime(date) {
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return new Date(date).toLocaleTimeString(undefined, options);
    }

    async function handleToken(token) {
        try {
            setLoading(true); 
    
            const customToken = generateCustomToken(); 
        const response = await axios.post('http://localhost:8084/api/payment/save', {
            token: customToken, 
            amount: selectedAppointment.testPrice * 100,
            appointmentId: selectedAppointment.id
        }, {
            headers: {
                'token': customToken, 
                'amount': selectedAppointment.testPrice * 100,
                'appointmentId' : selectedAppointment.id
            }
        });
    
            console.log('Payment response:', response.data);
    
           
            handleClosePaymentModal();
        } catch (error) {
            setPaymentError(error.response.data.message);
            console.error('Error processing payment:', error.response.data);
        } finally {
            setLoading(false);
        }
    }


    function generateCustomToken() {

        return Math.random().toString(36).substr(2); 
    }

    return (
        <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Appointment Type</th>
                        <th>Test Date</th>
                        <th>Test Time</th>
                        <th>Test Name</th>
                        <th>Test Price</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment, index) => (
                        <tr key={index}>
                            <td>{appointment.type}</td>
                            <td>{formatDate(appointment.dateTime)}</td>
                            <td>{formatTime(appointment.dateTime)}</td>
                            <td>{appointment.test}</td>
                            <td>${appointment.testPrice}</td>
                            <td>{appointment.status}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleCancelAppointment(appointment.id)}>Cancel</Button>
                                <Button variant="success" onClick={() => handleOpenPaymentModal(appointment)}>Make Payment</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <Modal show={showPaymentModal} onHide={handleClosePaymentModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <StripeCheckout
                        stripeKey="pk_test_51OtoQ3LjhdK8oyAc6cAVkkQdSKCNO4gbAECzJ3xYe6tJQ6GbHhRsKe3EHy2WQ6bnbwmPVspsIB02ARndAnqBP7lG00MavcQv6e"
                        token={handleToken}
                        amount={selectedAppointment ? selectedAppointment.testPrice * 100 : 0}
                        name="Appointment Payment"
                    />
                    {paymentError && <Alert variant="danger">{paymentError}</Alert>}
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default MyAppointments;
