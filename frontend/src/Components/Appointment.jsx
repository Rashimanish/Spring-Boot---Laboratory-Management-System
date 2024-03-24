import React, { useState, useEffect } from 'react';
import { Form, Button, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import './component.css';

function Appointment() {
    const [type, setType] = useState('emergency');
    const [date, setDate] = useState('');
    const [tests, setTests] = useState([]);
    const [test, setTest] = useState('');
    const [patientName, setPatientName] = useState('');
    const [appointmentNumber, setAppointmentNumber] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchTests();
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (user && user.name) {
            setPatientName(user.name); 
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

            if (selectedDate < currentDate) {
                setErrorMessage('Please select a future date for the appointment.');
                return;
            }

            const maxDate = new Date();
            maxDate.setDate(currentDate.getDate() + 30);
            if (selectedDate > maxDate) {
                setErrorMessage('Appointment can be made within 1 month only!!');
                return;
            }

            const appointmentData = {
                type: type,
                date: selectedDate.toISOString().split('T')[0],
                test: test,
                patientName: patientName
            };

            const response = await axios.post('http://localhost:8084/api/appointment/create', appointmentData);
            const { number, dateTime } = response.data;
            setAppointmentNumber(number);
            setAppointmentTime(dateTime);
            setErrorMessage('');
        } catch (error) {
            console.error('Error creating appointment:', error);
            setErrorMessage('Please Fill the Required fields!!');
        }
    };

    return (
        <div>
            <h2>Make Appointment</h2>
            <Form>
                <FormGroup>
                    <Form.Label>Type:</Form.Label>
                    <Form.Control as="select" name="type" value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="emergency">Emergency</option>
                        <option value="regular">Regular</option>
                    </Form.Control>
                </FormGroup>
                <FormGroup>
                    <Form.Label>Date:</Form.Label>
                    <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Form.Label>Test:</Form.Label>
                    <Form.Control as="select" name="test" value={test} onChange={(e) => setTest(e.target.value)}>
                        {tests.map(testItem => (
                            <option key={testItem.id} value={testItem.testName}>{testItem.testName}</option>
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