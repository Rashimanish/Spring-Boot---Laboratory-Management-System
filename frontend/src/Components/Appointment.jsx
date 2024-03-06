import React, { useState, useEffect } from 'react';
import { Form, Button, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import './component.css';

function Appointment() {
    const [type, setType] = useState('');
    const [date, setDate] = useState('');
    const [tests, setTests] = useState([]);
    const [selectedTest, setSelectedTest] = useState('');
    const [userName, setUserName] = useState('');
    const [appointmentNumber, setAppointmentNumber] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
   

    useEffect(() => {
        fetchTests();
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (user && user.name) {
            setUserName(user.name);
        }
    }, []);

    const fetchTests = async () => {
        try {
            const response = await axios.get('http://localhost:8084/api/tests/viewall');
            const sortedTests = response.data.sort((a, b) => a.testName.localeCompare(b.testName));
            setTests(sortedTests);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error fetching tests');
        }
    };

    const handleAppointmentSubmit = async () => {
        try {
            const currentDate = new Date();
            const selectedDate = new Date(date);
    
            // Check if the selected date is before the current date
            if (selectedDate < currentDate) {
                setErrorMessage('Please select a future date for the appointment.');
                return;
            }
    
            const appointmentData = {
                type: type,
                date: date,
                selectedTest: selectedTest,
                userName: userName,
            };
    
            const response = await axios.post('http://localhost:8084/api/appointment/create', appointmentData);
            const { number, dateTime } = response.data;
            setAppointmentNumber(number);
            setAppointmentTime(dateTime);
            setErrorMessage('');
        } catch (error) {
            console.error('Error creating appointment:', error);
            setErrorMessage('Error creating appointment');
        }
    };

    return (
        <div>
            <h2>Make Appointment</h2>
            <Form>
                <FormGroup>
                    <Form.Label>Type:</Form.Label>
                    <Form.Control as="select" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="emergency">Emergency</option>
                        <option value="regular">Regular</option>
                    </Form.Control>
                </FormGroup>
                <FormGroup>
                    <Form.Label>Date:</Form.Label>
                    <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Form.Label>Tests:</Form.Label>
                    <Form.Control as="select" value={selectedTest} onChange={(e) => setSelectedTest(e.target.value)}>
                        <option value="">Select Test</option>
                        {tests.map(test => (
                            <option key={test.id} value={test.id}>{test.testName}</option>
                        ))}
                    </Form.Control>
                </FormGroup>
                <Button onClick={handleAppointmentSubmit}>Submit</Button>
            </Form>
            {appointmentNumber && appointmentTime && (
                <div>
                    <p>Appointment Number: {appointmentNumber}</p>
                    <p>Appointment Time: {new Date(appointmentTime).toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    })}</p>
                </div>
            )}
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}

export default Appointment;
