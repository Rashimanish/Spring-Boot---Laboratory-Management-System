import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col , Nav } from 'react-bootstrap';
import Header from '../Components/Header';
import AddUser from '../Components/AddUser';
import ViewUser from '../Components/ViewUser';
import Footer from '../Components/Footer';
import TestForm from '../Components/TestForm';


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
            // Add cases for other components
            default:
                return null;
        }
    };
    return (
        <div>
            <Header />
            <Container fluid>
                <Row>
                    <Col md={3}>
                        <Nav defaultActiveKey="/admin/viewUser" className="flex-column">
                            <Nav.Link href="/admin/viewUser">View User</Nav.Link>
                            <Nav.Link href="/admin/addUser">Add User</Nav.Link>
                            <Nav.Link href="/admin/addTest">Create test</Nav.Link>
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