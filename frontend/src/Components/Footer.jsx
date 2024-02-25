import React from 'react';
import './component.css';


const Footer = () => {
  console.log('footer component rendered');
  return (
    
    <div className="footer">
      <div className='text-center p-3'>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <p>
          Rashmi Maneesha
        </p>
      </div>
      </div>
      
  );
  };
  
  export default Footer;