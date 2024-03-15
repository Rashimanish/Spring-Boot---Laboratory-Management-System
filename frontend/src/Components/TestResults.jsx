import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { Document, Page, Text, View, PDFDownloadLink } from '@react-pdf/renderer';

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


    const styles = {
        section: {
            marginBottom: '20px',
        },
        header: {
            marginBottom: '20px',
            textAlign: 'center',
        },
        labName: {
            fontSize: '20px',
            fontWeight: '500',
            marginBottom: '10px',
            color: 'white',
            backgroundColor: '#34495e',
            padding: '10px',
        },
        blueLine: {
            width: '100%',
            borderBottom: '3px solid #34495e',
            margin: '20px auto',
            marginBottom: '5px'
        },
        greyBox: {
            backgroundColor: '#f2f2f2',
            padding: '20px',
            borderRadius: '5px',
            marginBottom: '10px',
        },
        title: {
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '10px',
            color: '#34495e',
            textAlign: 'center',
        },
        row: {
            marginBottom: '10px',
            textAlign: 'center',
        },
        label: {
            fontWeight: 'bold',
            marginRight: '10px',
            color: '#555',
        },
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
                            <PDFDownloadLink
                                        document={
                                            <Document>
                                                <Page size="A4">
                                                    <View style={styles.section}>
                                                        {/* Header with Lab Details */}
                                                        <View style={styles.header}>
                                                            <Text style={styles.labName}>ABC Laboratories</Text>
                                                            <Text>No. Roswell Road, Colombo 5</Text>
                                                            <Text>Contact: 0112331874</Text>
                                                            <View style={styles.blueLine} />
                                                        </View>

                                                        {/* Test Details */}
                                                        <View style={styles.greyBox}>
                                                            <Text style={styles.title}>Test Details</Text>
                                                            <View style={styles.row}>
                                                                <Text style={styles.label}>Appointment ID:</Text>
                                                                <Text>{testResult.appointmentId}</Text>
                                                            </View>
                                                            <View style={styles.row}>
                                                                <Text style={styles.label}>Appointment Type:</Text>
                                                                <Text>{testResult.appointmentType}</Text>
                                                            </View>
                                                            <View style={styles.row}>
                                                                <Text style={styles.label}>Appointment Number:</Text>
                                                                <Text>{testResult.appointmentNumber}</Text>
                                                            </View>
                                                            <View style={styles.row}>
                                                                <Text style={styles.label}>Appointment DateTime:</Text>
                                                                <Text>{formatDate(testResult.appointmentDateTime)} {formatTime(testResult.appointmentDateTime)}</Text>
                                                            </View>
                                                            <View style={styles.row}>
                                                                <Text style={styles.label}>Patient Name:</Text>
                                                                <Text>{testResult.patientName}</Text>
                                                            </View>
                                                            <View style={styles.row}>
                                                                <Text style={styles.label}>Technician:</Text>
                                                                <Text>{testResult.technician}</Text>
                                                            </View>
                                                        </View>

                                                        {/* Test Result */}
                                                        <View style={styles.greyBox}>
                                                            <Text style={styles.title}>Test Result</Text>
                                                            <View style={styles.row}>
                                                                <Text style={styles.label}>Test Name:</Text>
                                                                <Text>{testResult.testName}</Text>
                                                            </View>
                                                            <View style={styles.row}>
                                                                <Text style={styles.label}>Test Code:</Text>
                                                                <Text>{testResult.testCode}</Text>
                                                            </View>
                                                            <View style={styles.row}>
                                                                <Text style={styles.label}>Test Range:</Text>
                                                                <Text>{testResult.testRange}</Text>
                                                            </View>
                                                            <View style={styles.row}>
                                                                <Text style={styles.label}>Remark:</Text>
                                                                <Text>{testResult.remark}</Text>
                                                            </View>
                                                            <View style={styles.row}>
                                                                <Text style={styles.label}>Description:</Text>
                                                                <Text>{testResult.description}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </Page>
                                            </Document>
                                        }
                                        fileName="testReport.pdf"
                                    >
                                        {({ blob, url, loading, error }) =>
                                            loading ? 'Loading document...' : (
                                                <Button variant="primary">Download Report</Button>
                                            )
                                        }
                                    </PDFDownloadLink>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default TestResults;
