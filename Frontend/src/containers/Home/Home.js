import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import {GetGalleryImage,GetLatestBlogs} from '../../actions/homeAPI';
import {baseURL} from '../../config/config';

import HeaderCarousel from './components/HeaderCarousel';

import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';


import Img4 from '../../assets/img4.jpg';
import SpinnerComponent from '../Spinner';

import moment from 'moment';

import aboutImg from '../../assets/about3.svg';

import serImg1 from '../../assets/service1.svg';
import serImg2 from '../../assets/service2.svg';
import serImg3 from '../../assets/service3.svg';
import serImg4 from '../../assets/service4.svg';
import serImg5 from '../../assets/service5.svg';
import serImg6 from '../../assets/service6.svg';

const about=[
    {
        image:serImg3,
        title:'Industrial Outreach',
        text:'To foster proper Industrial outreach by effective student coordination from the Training Placement Office.'
    },
    {
        image:serImg1,
        title:'Techspire',
        text:'To provide a common platform for solving real-world problems and work on interdisciplinary projects in emerging domains of technology.'
    },
    {
        image:aboutImg,
        title:'Professional Development',
        text:'To inculcate soft skills in students through various activities in order to make them ready for the corporate world.'
    }
]


const services=[
    {
        image:serImg1,
        title:'Techspire',
    },
    {
        image:serImg2,
        title:'Mentorship Program',
    },
    {
        image:serImg3,
        title:'Industrial Outreach',
    },
    {
        image:serImg4,
        title:'Soft Skills Development',
    },
    {
        image:serImg5,
        title:'Social media and News letter',
    },
    {
        image:serImg6,
        title:'Competitive Fest',
    }
]


const settings = {
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    autoplay: true,
    dots: true,
    infinite: true,
  }

function Home({auth}) {
 
    const {authCategory,isAuthenticated} =auth;

    const [loading, setloading] = useState(true);

    const [latestBlogs, setlatestBlogs] = useState([]);
    const [galleryImages, setgalleryImages] = useState([]);


    useEffect(()=>{
        GetGalleryImage().then((res)=>{
            if(res){
                setgalleryImages(res);
            }
        })
        GetLatestBlogs().then((data)=>{
            if(data){
                setlatestBlogs(data);
            }
        })
        setloading(false);
    },[])

    return (
        <div className='home-page'>
        { loading ?
         <SpinnerComponent/>
        :
        <section>
            <HeaderCarousel />
                        
            <section className='home-about' style={{marginTop:'50px',padding:'50px 0px'}}>
                <Container>
                    <div className='text-center'>
                        <h1 className='home-title'>Welcome To <span className='color-text'>PI-Club</span></h1>
                    </div>
                    <div className='text-center'>
                      <p className='mb-1 mt-4 blog-text1'> A student-run club under the umbrella of Training Placement office ZHCET.</p> 
                      <p className='mb-4 blog-text1'> Providing an Industry driven platform for Profile building for your dream companies.</p>
                    </div>
                    <div className='my-4'>
                        <Row className='my-4'>
                        {
                            about.map((row)=>(
                                <Col lg={4} xs={12} className='mt-3'>
                                    <div className='text-center'>
                                        <img src={row.image}
                                        // src='https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_960_720.jpg'
                                        style={{height:'100px',width:'100px',borderRadius:'100%'}}></img>
                                    </div>
                                    <div className='text-center my-4'>
                                        <h6>{row.title}</h6>
                                        <p>{row.text}</p>
                                    </div>
                                </Col>
                            ))
                        }
                        </Row>
                    </div>
                </Container>
            </section>

            <section className='home-join' style={{marginTop:'50px'}}>
                <div class="bg-container">
                  <img  src={Img4}
                   alt="Notebook" style={{width:'100%',height:'70vh'}}/>
                  <div class="bg-content" style={{width:'100%',height:'100%'}}>
                   <Container style={{paddingTop:'100px'}}>
                        <div className='text-center '>
                            <h1 className='home-title text-white' >Join PI-Club</h1>
                            <p className='mb-1 mt-4 blog-text1 text-white'>Join the most dynamic group of students of ZHCET and start </p>
                            <p className='mb-4 blog-text1 text-white'>preparing for placement for your dream companies.</p>
                            <NavLink to='/join'>
                                <Button className='btn1 mt-4' style={{padding:'10px 25px',width:'150px'}}>Join Us</Button>
                            </NavLink>
                        </div> 
                    </Container>
                  </div>
                </div>
            </section>

            <section className='home-services' style={{padding:'100px 0px',background:'#EFF9FF'}}>
                <Container>
                <div className='text-center'>
                    <h1 className='home-title'>Our Awesome Services</h1>
                </div>
                <div className='text-center' style={{padding:'20px 0px'}}>
                      <p className='mb-1 mt-4 blog-text1'>All the services aim to be Industry driven and provide platform for 
                      engineering students to make them Industry ready.</p>
                      <p className='mb-1 blog-text1'>Both technical and non technical activities gives you
                       a complete platform for their overall profile development.</p>
                       <p className='mb-4 blog-text1'>Take a look at our popular activities.</p>
                </div>
                <Row>
                {
                    services.map((row) => (
                        <Col lg={4} xs={12} >
                        <div className='text-center p-4 mt-4' style={{boxShadow:'rgba(0, 0, 0, 0.15) 0px 15px 25px, rgba(0, 0, 0, 0.05) 0px 5px 10px'}}>
                            <div>
                                <img src={row.image} style={{height:'100px',width:'100px',borderRadius:'100%'}}></img>
                            </div>
                            <div className='text-center my-4'>
                               <h6>{row.title}</h6>
                            </div>
                        </div>
                      
                    </Col>
                    ))
                }
                </Row>
                </Container>
            </section>
           
            <section className='home-gallery' style={{marginTop:'50px'}}>
                <Container>
                <div className='text-center'>
                    <h1 className='home-title'>Our Gallery</h1>
                </div>
                <div className='text-center'>
                      <p className='mb-1 mt-4 blog-text1'>We plan, we create, we innovate and we deliver! Some moments were captured by the camera and a lot remained. </p>
                      <p className='mb-4 blog-text1'>Take a look at what was caught on camera.</p>
                </div>
                <div>
                    <Row>
                        {
                            galleryImages.map((row)=>(
                                <Col lg={4} xs={6} className='mt-4'>
                                    <img  src={`${baseURL}/images/${row.image}`} style={{width:'100%',height:'250px'}}></img>
                                </Col>
                            ))
                        }
                    </Row>
                </div>
                </Container>
            </section>
 
            <section className='home-blogs' style={{marginTop:'50px'}}>
                <Container>
                <div className='text-center'>
                    <h1 className='home-title'>Latest Blog</h1>
                </div>
                <div>
                <Row className='my-4'>
                        {
                            latestBlogs.map((row) => (
                                <Col lg={4} xs={12} className='px-4'>
                                    <NavLink  to={`/blogs`} style={{ textDecoration: 'none' }} >
                                        <div>
                                        <Card className='card-box my-4'>
                                                <div className='py-2' style={{borderRadius:'5px',height:'50px',
                                                    background:'linear-gradient(180deg,rgba(0,0,0,.7) 0,transparent 95%)'}}>
                                                </div>
                                                <Card.Img variant="top" 
                                                style={{marginTop:-50,zIndex:-10,height:'200px',width:'100%'}} 
                                                src={`${baseURL}/images/${row.image}`} 
                                                />
                                                 <Card.Body className='pb-1'>
                                                    <div style={{height:'40px',overflow:'hidden'}}>
                                                       <Card.Title className='card-title' >{row.title}</Card.Title>
                                                    </div>
                                                    <hr className='my-2'/>
                                                    <p className='blog-text4'>{moment(row.Date).startOf('hour').fromNow()}</p>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    </NavLink>
                                </Col>
                            ))
                        }
                </Row>
                </div>
                </Container>
            </section>

            <section className='home-testimony' style={{padding:'50px 0px',background:'lightgray'}}>
                <div className='text-center'>
                    <h1 className='home-title'>Member Testimonial</h1>
                </div>
                   <Container style={{marginTop:'30px'}}>
                   <Row>
                        <Col lg={2} xs={12}></Col>
                        <Col lg={8} xs={12}>
                            <Slider {...settings}>
                            {
                                about.map((row)=>(
                                <div class="text-center p-4">
                                    <div className='div-center' style={{width:'100%'}}>
                                    <img  src='https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_960_720.jpg'
                                   style={{width:'100px',height:'100px',borderRadius:'100%'}}/>
                                    </div>
                                  <div className='my-4 text-center'>
                                    <q className='blog-text1'>
                                        Lorem ipsum dolor sit amet, an his etiam torquatos. Tollit soleat phaedrum te duo, eum cu recteque expetendis neglegentur. Cu mentitum maiestatis persequeris pro, pri ponderum tractatos ei.
                                    </q>
                                    <h4 className='blog-text0 mt-4 mb-0'>Meraj Ahmed</h4>
                                    <p className='blog-text1'>Student</p>
                                  </div>
                                </div>
                               ))
                            }
                            </Slider>
                        </Col>
                        <Col lg={2} xs={12}></Col> 
                    </Row>
                    </Container>
            </section>
        </section>
        }
    </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});
  
export default connect(mapStateToProps, {})(Home);