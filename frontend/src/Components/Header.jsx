import React from 'react';
import './component.css';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        window.location.href = '/login'; 
    };

    return (
      <header>
      <Navbar className='header-container' bg="light" expand="lg">
          <Container >
              <Navbar.Brand as={Link} to="/">Medi Labs</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                      
                      <Button className="logout-button" variant="danger" onClick={handleLogout}>Logout</Button>
                  
              </Navbar.Collapse>
          </Container>
      </Navbar>
  </header>
    );
};

export default Header;



