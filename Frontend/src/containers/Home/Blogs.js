import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {GetBlogs} from '../../actions/homeAPI';
import {DeletePost} from '../../actions/admin';
import moment from 'moment';

import {baseURL} from '../../config/config';

import { Button, Card, Container, Row, Col,Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import SpinnerComponent from '../Spinner';

const data = [{}, {}, {}, {}, {}, {}]

function Blogs({auth}) {

    const history=useHistory();

    const [loading, setloading] = useState(true);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    const {authCategory,isAuthenticated} =auth;

    const [allBlogs, setallBlogs] = useState([]);

    useEffect(()=>{
        GetBlogs().then((data)=>{
            setallBlogs(data);
            setloading(false);
        })
    },[deleteSuccess])

    const handleDelete=(e,id)=>{
        e.stopPropagation();
        DeletePost(id).then((res)=>{
            setDeleteSuccess(true);
        });
    }

    const handleNavigate=(blogId)=>{
        history.push('/details',{blogId:blogId})
    }

    return (
        <div  className='py-1 page'>
            <section className='category-event-box'>
                { loading ?
                 <SpinnerComponent/>
                :
                <Container>
                    <Row className='my-4'>
                        {
                            allBlogs.map((row) => (
                                <Col lg={4} xs={12} className='px-4'>
                                        <div>
                                        <Card className='card-box my-4' onClick={()=>handleNavigate(row._id)}>
                                                <div className='py-2' style={{borderRadius:'5px',height:'50px',
                                                    background:'linear-gradient(180deg,rgba(0,0,0,.7) 0,transparent 95%)'}}>
                                                </div>
                                                <Card.Img variant="top" style={{marginTop:-50,zIndex:-10,height:'200px',width:'100%'}} 
                                                   src={`${baseURL}/images/${row.image}`}/>
                                                <Card.Body className='pb-1'>
                                                    <div style={{height:'40px',overflow:'hidden'}}>
                                                       <Card.Title className='card-title' >{row.title}</Card.Title>
                                                    </div>
                                                    <hr className='my-2'/>
                                                    <p className='blog-text4'>{moment(row.Date).startOf('hour').fromNow()}</p>
                                                    {
                                                        authCategory=='admin' && isAuthenticated && 
                                                        <div className='text-center py-2'>
                                                           <Button className='btn1' style={{background:'red'}}
                                                           onClick={(e)=>handleDelete(e,row._id)}>Remove Blogs</Button>
                                                        </div>
                                                    }
                                                </Card.Body>
                                            </Card>
                                        </div>
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
                }
            </section>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
  export default connect(mapStateToProps, {})(Blogs);