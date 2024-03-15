import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col , Nav } from 'react-bootstrap';
import Header from '../Components/Header';
import AddUser from '../Components/AddUser';
import ViewUser from '../Components/ViewUser';
import Footer from '../Components/Footer';
import TestForm from '../Components/TestForm';
import DoctorProfile from '../Components/DoctorProfile';
import WelcomeMessage from '../Components/WelcomeMessage';
import Appointment from '../Components/Appointment';
import ViewAppointment from '../Components/ViewAppointment';
import TestResults from '../Components/TestResults';


const AdminDashboard = () => {

    const { selectedItem } = useParams();
    
    const renderComponent = () => {
        switch (selectedItem) {
            case 'addUser':
                return <AddUser />;
            case 'viewUser':
               return <ViewUser />;
            case 'addTest':
               return <TestForm />;
            case 'doctorProfile':
                return <DoctorProfile />
            case 'makeAppointment':
                return <Appointment />
            case 'viewAppointment':
                return <ViewAppointment />
            case 'viewResults' :
                return <TestResults />
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
                        <Nav defaultActiveKey="/admin/viewUser" className="sidebar-container flex-column">
                            <Nav.Link href="/admin/viewUser" className="sidebar-link">View User</Nav.Link>
                            <Nav.Link href="/admin/addUser" className="sidebar-link">Add User</Nav.Link>
                            <Nav.Link href="/admin/addTest" className="sidebar-link">Create test</Nav.Link>
                            <Nav.Link href="/admin/doctorProfile" className="sidebar-link">Manage Doctor Profile</Nav.Link>
                            <Nav.Link href="/admin/makeAppointment" className="sidebar-link">Make Appointment</Nav.Link>
                            <Nav.Link href="/admin/viewAppointment" className="sidebar-link">View Appointments</Nav.Link>
                            <Nav.Link href="/admin/viewResults" className="sidebar-link">View Test Results</Nav.Link>
                        </Nav>
                    </Col>
                    <Col md={9}>
    { selectedItem ? null : <h2 className="dashboard-heading">Admin Dashboard</h2>}
                        {renderComponent()}
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default AdminDashboard;