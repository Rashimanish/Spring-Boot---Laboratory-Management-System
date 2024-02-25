import React from 'react';
import './component.css';
import { Container , Navbar } from 'react-bootstrap';


const Header = () => {
  console.log('Header component rendered');
  return (
    <header>
     <div className="header-container"> 
       <Container>
         <Navbar expand="lg">
           <Navbar.Brand href="#" className="navbar-brand">Medi Labs</Navbar.Brand> 
         </Navbar>
       </Container>
     </div>
    </header>
   );
};

export default Header;