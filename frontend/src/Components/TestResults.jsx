import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const TestResults = () => {
    const [testResults, setTestResults] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        fetchTestResults();
    }, []);

    const fetchTestResults = async () => {
        try {
            const response = await axios.get('http://localhost:8084/api/result/viewAll');
            setTestResults(response.data);
        } catch (error) {
            console.error('Error fetching test results:', error);
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

    const handleSearchChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    const filteredTestResults = testResults.filter((testResult) =>
        testResult.patientName.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    const downloadReport = (testResultId) => {
        // Implement your logic to download the report for the specified test result
        console.log('Downloading report for test result with ID:', testResultId);
    };

    return (
        <Container>
            <Form.Group controlId="searchKeyword">
                <Form.Control
                    type="text"
                    placeholder="Search by patient name"
                    value={searchKeyword}
                    onChange={handleSearchChange}
                />
            </Form.Group>
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
                        <th>Test Range</th>
                        <th>Remark</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTestResults.map((testResult) => (
                        <tr key={testResult.appointmentId}>
                            <td>{testResult.appointmentNumber}</td>
                            <td>{testResult.appointmentType}</td>
                            <td>{formatDate(testResult.appointmentDateTime)}</td>
                            <td>{formatTime(testResult.appointmentDateTime)}</td>
                            <td>{testResult.patientName}</td>
                            <td>{testResult.testName}</td>
                            <td>{testResult.technician}</td>
                            <td>{testResult.testRange}</td>
                            <td>{testResult.remark}</td>
                            <td>{testResult.description}</td>
                            <td>
                                <Button variant="primary" onClick={() => downloadReport(testResult.appointmentId)}>
                                    Download Report
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default TestResults;
