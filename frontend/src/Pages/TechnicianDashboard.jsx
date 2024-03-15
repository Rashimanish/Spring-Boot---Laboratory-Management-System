import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import WelcomeMessage from '../Components/WelcomeMessage';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import TechAppoinments from '../Components/TechAppoinments';
import TechResults from '../Components/TechResults';


const TechnicianDashboard = () => {

    const { selectedItem } = useParams();

    const renderComponent = () => {
        switch (selectedItem) {
            case 'ViewAppointment':
                return <TechAppoinments />;
            case 'TechResults':
                return  <TechResults />;
            default:
                return null;
        }
    };

    return (
        <div className="dashboard-container">
            <Header />
            <WelcomeMessage />
            <Container fluid style={{ flex: '1' }}>
                <Row>
                    <Col md={3}>
                        <Nav defaultActiveKey="/technician/ViewAppointment" className="sidebar-container flex-column">
                            <Nav.Link href="/technician/ViewAppointment" className="sidebar-link">View Appointments</Nav.Link>
                            <Nav.Link href="/technician/TechResults" className="sidebar-link">View Results</Nav.Link>
                        </Nav>
                    </Col>
                    <Col md={9}>
    { selectedItem ? null : <h2 className="dashboard-heading">Technician Dashboard</h2> }
    {renderComponent()}
</Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default TechnicianDashboard;


