import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const PeakAppointmentTimes = () => {
    const [peakTimes, setPeakTimes] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
    const [selectedDate, setSelectedDate] = useState(new Date().getDate());
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPeakAppointmentTimes(selectedYear, selectedMonth, selectedDate);
    }, [selectedYear, selectedMonth, selectedDate]);

    const fetchPeakAppointmentTimes = async (year, month, date) => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:8084/api/appointment/peak-appointment-times', {
                params: {
                    year: year,
                    month: month,
                    date: date,
                }
            });
            setPeakTimes(response.data);
        } catch (error) {
            console.error('Error fetching peak appointment times:', error);
            setError(error.message);
        }
        setLoading(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        fetchPeakAppointmentTimes(selectedYear, selectedMonth, selectedDate);
    };

    const styles = StyleSheet.create({
        page: {
            fontFamily: 'Helvetica',
            padding: '20px',
        },
        header: {
            fontSize: '20px',
            marginBottom: '20px',
            textAlign: 'center',
            fontWeight: 'bold',
        },
        labName: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '5px',
        },
        blueLine: {
            borderBottom: '2px solid blue',
            marginBottom: '10px',
        },
        reportContainer: {
            padding: '20px',
            border: '1px solid #ccc',
            marginBottom: '20px',
        },
        reportHeading: {
            fontSize: '18px',
            fontWeight: 'bold',
            marginBottom: '10px',
        },
        reportText: {
            marginBottom: '5px',
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse',
            marginBottom: '20px',
        },
        th: {
            border: '1px solid #000',
            padding: '8px',
            textAlign: 'left',
        },
        td: {
            border: '1px solid #000',
            padding: '8px',
            textAlign: 'left',
        },
    });

    return (
        <Container>
            <h2>Peak Appointment Times</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="yearSelect">
                    <Form.Label>Select Year:</Form.Label>
                    <Form.Control as="select" onChange={(e) => setSelectedYear(parseInt(e.target.value))} value={selectedYear}>
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="monthSelect">
                    <Form.Label>Select Month:</Form.Label>
                    <Form.Control as="select" onChange={(e) => setSelectedMonth(parseInt(e.target.value))} value={selectedMonth}>
                        {[...Array(12)].map((_, index) => (
                            <option key={index + 1} value={index + 1}>
                                {new Date(0, index).toLocaleString('en-US', { month: 'long' })}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="dateSelect">
                    <Form.Label>Select Date:</Form.Label>
                    <Form.Control as="select" onChange={(e) => setSelectedDate(parseInt(e.target.value))} value={selectedDate}>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                            <option key={date} value={date}>
                                {date}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
           {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : Object.keys(peakTimes).length > 0 ? (
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Time Slot</th>
                                <th>Number of Appointments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(peakTimes).map(([timeSlot, count]) => (
                                <tr key={timeSlot}>
                                    <td>{timeSlot}</td>
                                    <td>{count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <PDFDownloadLink
    document={
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.reportContainer}>
                    <View style={styles.header}>
                        <Text style={styles.labName}>ABC Laboratories</Text>
                        <Text>No. Roswell Road, Colombo 5</Text>
                        <Text>Contact: 0112331874</Text>
                        <View style={styles.blueLine} />
                    </View>
                    <Text style={styles.reportHeading}>Peak Appointment Times Report</Text>
                    <Text style={styles.reportText}>Year: {selectedYear}</Text>
                    <Text style={styles.reportText}>Month: {new Date(0, selectedMonth - 1).toLocaleString('en-US', { month: 'long' })}</Text>
                    <Text style={styles.reportText}>Date: {new Date(selectedYear, selectedMonth - 1, selectedDate).toLocaleDateString()}</Text>
                    <Text style={styles.reportText}>Peak Appointment Times on the Selected Date </Text>
                    {Object.entries(peakTimes).map(([timeSlot, count]) => (
                        <Text key={timeSlot} style={styles.reportText}>
                            Time Slot: {timeSlot}, Number of Appointments: {count}
                        </Text>
                    ))}
                </View>
            </Page>
        </Document>
    }
    fileName="peak_appointment_times_report.pdf"
>
    {({ loading }) => (loading ? 'Loading document...' : <Button variant="primary">Download Report</Button>)}
</PDFDownloadLink>
                </div>
            ) : null}
        </Container>
    );
};

export default PeakAppointmentTimes;