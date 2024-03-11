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
            // Add cases for other components
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
                        <Nav defaultActiveKey="/admin/viewUser" className="flex-column">
                            <Nav.Link href="/admin/viewUser">View User</Nav.Link>
                            <Nav.Link href="/admin/addUser">Add User</Nav.Link>
                            <Nav.Link href="/admin/addTest">Create test</Nav.Link>
                            <Nav.Link href="/admin/doctorProfile">Manage Doctor Profile</Nav.Link>
                            <Nav.Link href="/admin/makeAppointment">Make Appointment</Nav.Link>
                            <Nav.Link href="/admin/viewAppointment">View Appointment</Nav.Link>

                            {/* Add other Nav links as needed */}
                        </Nav>
                    </Col>
                    <Col md={9}>
                        <h2>Admin Dashboard</h2>
                        {renderComponent()}
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default AdminDashboard;