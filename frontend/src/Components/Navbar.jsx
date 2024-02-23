import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

function NavbarComponent() {
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Registration and Login System</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#register">Register</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
  }
  export default NavbarComponent;