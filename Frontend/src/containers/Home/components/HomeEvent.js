import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Slider from "react-slick";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { GetAllBlogs ,baseUrl} from '../../../actions/user';


const data = [{}, {}, {}, {}, {}, {}]

export default function HomeComponent(props) {

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1.2,
                slidesToScroll: 1
              }
            }
          ]
    };


    const [blogs,setBlogs]=useState([]);
   
    useEffect(()=>{
        GetAllBlogs().then((data)=>{
            if(data){
                setBlogs(data);
            }
        })
    },[]);

    return (
        <div style={{ overflow: 'hidden',background:props.bgColor }} className='py-4'>
            <section className='home-section-container' >
                <Container fluid>
                    <Row>
                        <Col lg={2} xs={12}>
                            <div className='home-event-sidebox'>
                                <h4 className='home-title mt-4'>{props.category}</h4>
                                <div className='d-flex'>
                                    <NavLink to={`allblogs/${props.category}`}>
                                        <Button className='view-all-event-btnLeft'>View All</Button>
                                    </NavLink>
                                    <NavLink to={`allblogs/${props.category}`} className='view-all-event-box'>
                                        <Button className='view-all-event-btnRight'><ArrowForwardIcon/></Button>
                                    </NavLink>
                                </div>
                            </div>
                        </Col>
                        <Col lg={10} xs={12}>
                            <div>
                                <Slider {...settings}>
                                    {
                                        blogs.map((row) => (
                                            <NavLink to={`/details/${row._id}`} style={{textDecoration:'none'}}>
                                            <div className='px-4'>
                                            <Card className='home-event-card my-4'>
                                                <div className='py-2' style={{borderRadius:'5px',height:'50px',
                                                    background:'linear-gradient(180deg,rgba(0,0,0,.7) 0,transparent 95%)'}}>
                                                </div>
                                                <Card.Img variant="top" 
                                                style={{marginTop:-50,zIndex:-10}} 
                                                src={`${baseUrl}/images/${row.image}`}
                                                />
                                                <Card.Body className='pb-1'>
                                                    <Card.Title className='home-event-title'>{row.title}</Card.Title>
                                                    <hr/>
                                                    <div className='home-card-footer'>
                                                           <p className='home-event-price'>10 min ago</p>
                                                           <div className='home-event-mode px-2'>
                                                               <FiberManualRecordIcon style={{color:'#eb5757',height:'1rem',width:'1rem'}}/> 
                                                               {props.category}</div>
                                                        </div>
                                                </Card.Body>
                                            </Card>
                                            </div>
                                            </NavLink>
                                        ))
                                    }
                                </Slider>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    )
}
