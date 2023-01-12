import React from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';
import { learnMore, About} from './FooterRoute';
import {Container, Row, Col} from 'react-bootstrap';
import AppleIcon from '@mui/icons-material/Apple';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';


function Footer() {
    return (
        <div >
            <section className='footer-container'>
            <Container className='my-4' style={{paddingBottom:'50px'}}>
                <Row>
                    <Col xs={12} lg={4} className='mt-4'>
                        <div className='px-4'>
                            <div style={{ marginTop: '50px' }}>
                                <p className='footer-text1'>Follow us on</p>
                                <div className='my-2'>
                                    <a href='https://www.facebook.com/PI-Club-101819262432486'><FacebookIcon style={{ color: '#fff',height:'30px',width:'30px' }} /></a>
                                    <a className='mx-2' href='https://www.instagram.com/piclubzhcet/'><InstagramIcon style={{ color: '#fff',height:'30px',width:'30px' }} /></a>
                                    <a className='mx-2' href='https://www.linkedin.com/company/76647957/admin/'><LinkedInIcon style={{ color: '#fff',height:'30px',width:'30px' }} /></a>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} lg={4} className='mt-4'>
                        <div>
                            {
                                About.map((row) => (
                                    <NavLink to={`${row.route}`} style={{color:'white',textDecoration:'none'}}>
                                        <p className='footer-text2'>{row.name}</p>
                                    </NavLink>
                                ))
                            }
                        </div>
                    </Col>
                      <Col xs={12} lg={4} className='mt-4'>
                        <div>
                            <p className='footer-text1'>Address</p>
                            <p className='footer-text2'>Training and Placement Office , ZHCET , AMU</p>
                            <p className='footer-text2'>Aligarh , UP</p>
                        </div>
                    </Col>
                </Row>
            </Container>
            <section className='copyright-box p-4 text-center'>
                <p className='m-0'>copyright@PI-CLUB</p>
            </section>
            </section>
        </div>
    )
}

export default Footer;
