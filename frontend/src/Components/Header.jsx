import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';

const Header = () => {
  return (
      <Navbar bg="dark" variant="dark">
          <Container>
              <Navbar.Brand href="/">Registration and Login System</Navbar.Brand>
              <Nav className="me-auto">
                  <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
          </Container>
      </Navbar>
  );
};

export default Header;