import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const MyTestResult = () => {
    const [testResults, setTestResults] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [selectedTestResult, setSelectedTestResult] = useState(null); // State to store selected test result
    const [pdfVisible, setPdfVisible] = useState(false); // State to control PDF visibility

    useEffect(() => {
        fetchTestResults();
    }, []);

    const fetchTestResults = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('loggedInUser'));
            if (user && user.name) {
                const response = await axios.get(`http://localhost:8084/api/result/viewByUser/${user.name}`);
                setTestResults(response.data); 
            }
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

    const handleDownloadReport = (testResult) => {
        setSelectedTestResult(testResult); // Set the selected test result
        setPdfVisible(true); // Show PDF viewer
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
                    {testResults
                        .filter((testResult) =>
                            testResult.patientName.toLowerCase().includes(searchKeyword.toLowerCase())
                        )
                        .map((testResult) => (
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
                                    <Button
                                        variant="primary"
                                        onClick={() => handleDownloadReport(testResult)}
                                    >
                                        Download Report
                                    </Button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            {pdfVisible && selectedTestResult && (
                <PDFViewer style={{ width: '100%', height: '500px' }}>
                    <Document>
                        <Page size="A4">
                            {/* Render PDF content for the selected test result */}
                            <View>
                                <Text>Test Name: {selectedTestResult.testName}</Text>
                                <Text>Test Code: {selectedTestResult.testCode}</Text>
                                <Text>Test Range: {selectedTestResult.testRange}</Text>
                                <Text>Remark: {selectedTestResult.remark}</Text>
                                <View style={{ borderBottom: '2px solid blue', marginVertical: 10 }} />
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ width: '50%' }}>
                                        <Text>Appointment ID: {selectedTestResult.appointmentId}</Text>
                                        <Text>Appointment Type: {selectedTestResult.appointmentType}</Text>
                                        <Text>Appointment Number: {selectedTestResult.appointmentNumber}</Text>
                                        <Text>
                                            Appointment DateTime: {formatDate(selectedTestResult.appointmentDateTime)}{' '}
                                            {formatTime(selectedTestResult.appointmentDateTime)}
                                        </Text>
                                    </View>
                                    <View style={{ width: '50%' }}>
                                        <Text>Patient Name: {selectedTestResult.patientName}</Text>
                                        <Text>Technician: {selectedTestResult.technician}</Text>
                                    </View>
                                </View>
                            </View>
                        </Page>
                    </Document>
                </PDFViewer>
            )}
        </Container>
    );
};

export default MyTestResult;
