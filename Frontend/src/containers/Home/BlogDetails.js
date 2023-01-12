import React, { useState, useEffect } from 'react';
import {GetBlogDetail} from '../../actions/homeAPI';
import { baseURL } from '../../config/config';
import './style.css';
import { NavLink,useLocation } from 'react-router-dom';
import moment from 'moment';

import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import SpinnerComponent from '../Spinner';


const data=[
    {image:'https://cdn.pixabay.com/photo/2021/12/03/21/56/lamps-6843881_960_720.jpg'},
    {image:'https://cdn.pixabay.com/photo/2021/11/23/13/32/forest-6818683_960_720.jpg'}
]

function EventDetails() {

   
    const location = useLocation();

    // console.log("location",location.state);
    const [loading, setloading] = useState(true);

    const [blog, setAllBlog] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        GetBlogDetail(location.state.blogId).then((data) => {
            if (data) {
                setAllBlog(data.blog);
                setUser(data.user);
                setloading(false);
            }
        });
    }, []);

    return (
        <div className='blog-box' style={{marginTop:'50px'}}>
            { loading ?
             <SpinnerComponent/>
            :
            <div>
                <Container>
                    <Row>
                        <Col lg={8} className='my-4'>
                            <div >
                                <section id="section-1">
                                    <div>
                                        <img style={{ width: '100%' }} 
                                        src={`${baseURL}/images/${blog.image}`}></img>
                                    </div>
                                    <div style={{marginTop:'50px'}}>
                                        <div>
                                            <h4 className='blog-text0'>{blog.title}</h4>
                                        </div>
                                        <div className='d-flex'>
                                            <div style={{width:'50%'}} className='d-flex'>
                                                <InsertInvitationIcon className='blog--icon' />
                                                <p className='mx-2 blog-text3'>{moment(blog.Date).startOf('hour').fromNow()}</p>
                                            </div>
                                        </div>
                                    </div>
                                   <hr className='my-4'/>
                                </section>
                                <section style={{marginTop: '20px' }} id="section-2">
                                    <Card style={{background:'transparent'}}>
                                        <Card.Body>
                                            <div>
                                                <p className='blog-text2'>
                                                  {blog.description}
                                                </p>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </section>
                            </div>
                        </Col>
                        <Col lg={4} xs={12}>
                            <div style={{ height: '100vh', position: 'sticky', width: '100%', top: 80 }}>
                            <section  style={{ marginTop: '20px' }} id="section-3">
                                    <Card>
                                        <div style={{ width: '100%', height: '150px',background:'#00acee' }}></div>
                                        <Card.Body className='p-4'>
                                            <div className='text-center'>
                                                <img style={{ width: '100px', height: '100px', borderRadius: '100%',
                                                 marginTop: '-100px' }} 
                                                 src={`${baseURL}/images/${user.image}`}></img>
                                                <h4 className='blog-text0 mt-4'>{user.fullName}</h4>
                                                <h4 className='blog-text1'>{user.branch}</h4>
                                            </div>
                                            <hr/>
                                            <div className='my-4'>
                                                <h5 className='blog-text1'>About</h5>
                                                <p className='my-4 blog-text2'>{user.about}</p>
                                            </div>
                                            <hr/>
                                            <div>
                                                <div className='my-4'>
                                                {user.linkedinURL &&   <a className='mx-2' href={`${user.linkedinURL}`}><TwitterIcon style={{ color: '#333' }} /></a>}
                                                {user.twitterURL  &&  <a className='mx-2'  href={`${user.twitterURL}`}><LinkedInIcon style={{ color: '#333' }} /></a>}
                                                </div>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </section>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            }
        </div>
    )
}

export default EventDetails;
