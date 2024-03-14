import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import Header from '../Components/Header';
import WelcomeMessage from '../Components/WelcomeMessage';
import Appointment from '../Components/Appointment';
import MyAppointments from '../Components/MyAppointments';
import Footer from '../Components/Footer';
import MyTestResult from '../Components/MyTestResult';


const PatientDashboard = () => {
    const { selectedItem } = useParams();

    const renderComponent = () => {
        switch (selectedItem) {
            case 'makeAppointment':
                return <Appointment />;
            case 'viewMyAppointment':
                return  <MyAppointments />;
              
            case 'viewMyResult':
                return <MyTestResult />;
            default:
                return null;
        }
    };

    return (
        <div>
            <Header />
            <WelcomeMessage />
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <Nav defaultActiveKey="/patient/makeAppointment" className="flex-column">
                            <Nav.Link href="/patient/makeAppointment">Make Appointment</Nav.Link>
                            <Nav.Link href="/patient/viewMyAppointment">View My Appointments</Nav.Link>
                            <Nav.Link href="/patient/viewMyResult">View My Test Results</Nav.Link>
                        </Nav>
                    </Col>
                    <Col md={9}>
                        <h2>Patient Dashboard</h2>
                        {renderComponent()}
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default PatientDashboard;
