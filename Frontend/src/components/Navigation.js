import React, { useState, useEffect } from 'react';
import { Navbar, Button, Container, Nav,NavDropdown} from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import logo from '../assets/logo2.png';

const NavStyle={
    textDecoration: 'none', 
    fontWeight: 'bolder',
    color:'black'
}

const adminRoute=[
    {text:"Create",route:'/create'},
    {text:"Add Hirings",route:'/add-hirings'},
    {text:"All Students",route:'/all-students'},
    {text:"Settings",route:'/settings'},
]

function Navigation({ auth, logout }) {

    const { isAuthenticated, user, token, authCategory } = auth;

    const handleLogout = () => {
        logout();
    }


    const AdminNav = (
        <Nav className='ml-auto'>
            <NavDropdown title={<span style={{fontWeight:'bolder',color:'black'}}>Admin</span>} 
            id="basic-nav-dropdown">
            {
                adminRoute.map((row,index)=>(
                    <NavLink to={`${row.route}`} style={NavStyle}>
                        <NavDropdown.Item href={`#action/${index}`} style={{fontWeight:'bold'}}>
                          {row.text}
                        </NavDropdown.Item>
                    </NavLink>
                ))
            }
            </NavDropdown>
        </Nav>
    )

    const UserAuth = (
        <Nav>
            <Nav.Link href="#">
                <NavLink to={`/profile`} style={NavStyle}>Profile</NavLink>
            </Nav.Link >
            <Nav.Link href="#">
                <NavLink to={`/create`} style={NavStyle}>Create</NavLink>
            </Nav.Link >
        </Nav>
    )

    return (
        <div>
            <Navbar collapseOnSelect fixed='top' expand="lg" 
             style={{ background: '  #dfd9ff', color: 'white', 
             boxShadow: 'rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px'
              }}
            >
              <Container>
                   <NavLink to='/' style={{ textDecoration: 'none', fontWeight: 'bolder' }}>
                        <Navbar.Brand href="#home">
                            <img className='p-2' src={logo} 
                               style={{height:'100px',width:'100px',marginBottom:'-50px',background: '#dfd9ff', borderRadius:'50px'
                            }}></img>
                        </Navbar.Brand>
                    </NavLink>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Nav className='ml-auto' >
                        {/* <Nav > */}
                             <Nav.Link href="#">
                                <NavLink to={`/about`} style={NavStyle}>About Us</NavLink>
                            </Nav.Link >
                            { isAuthenticated &&
                                <Nav.Link href="#">
                                  <NavLink to={`/hirings`} style={NavStyle}>Hirings</NavLink>
                                </Nav.Link >
                            }
                            <Nav.Link  href="#">
                                <NavLink to={`/blogs`} style={NavStyle}>Blogs</NavLink>
                            </Nav.Link >
                            <Nav.Link href="#">
                                <NavLink to={`/achievements`} style={NavStyle}>Achievements</NavLink>
                            </Nav.Link >
                            <Nav.Link href="#">
                                <NavLink to={`/projects`} style={NavStyle}>Our Projects</NavLink>
                            </Nav.Link >
                            {
                                authCategory!='admin' &&
                                <Nav.Link href="#">
                                    <NavLink to={`/contact`} style={NavStyle}>Contact Us</NavLink>
                                </Nav.Link >
                            }
                            {
                            isAuthenticated ?
                            <>
                                {authCategory=='admin'?AdminNav:UserAuth}
                                <Nav.Link href="#" className='p-0 m-0'>
                                    <NavLink to='/'>
                                       <Button  className='mx-2 login-btn' onClick={() => handleLogout()}>Logout</Button>
                                    </NavLink>
                                </Nav.Link >
                            </>
                             :
                             <Nav.Link href="#" className='p-0 m-0'>
                              <NavLink to={`/join`} style={{ textDecoration: 'none' }}>
                                  <Button  className='mx-2 login-btn' >Join us</Button>
                              </NavLink>
                            </Nav.Link >
                            }     
                        </Nav>
                    </Navbar.Collapse>
              </Container>
            </Navbar>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navigation);
