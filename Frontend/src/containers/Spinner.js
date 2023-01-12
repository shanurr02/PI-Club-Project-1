import React from 'react';
import {Spinner } from 'react-bootstrap';

function SpinnerComponent() {
  return (
    <div className='div-center' style={{height:'100vh',width:'100%'}}>
        <Spinner animation="border" variant="primary" />
    </div>
  );
}

export default SpinnerComponent;
