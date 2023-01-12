import React, { useState, useEffect } from 'react';
import {CreatePost} from '../../actions/user';

import {GetHomeSlider} from '../../actions/homeAPI';
import {baseURL} from '../../config/config';
import {DeletePost,GetContactMessage,DeleteContactMessage} from '../../actions/admin';

import { Button, Form,Alert,Container,Table,Modal,Row,Col} from "react-bootstrap";
import './style.css';

const data = [{}, {}, {}, {}, {}, {}]


function Settings(props) {
  
  const [allSlider,setAllSlider]=useState([]);

  const [allMessage,setAllMessage]=useState([]);

  const [deleteSuccess, setDeleteSuccess] = useState(false);
   
  useEffect(()=>{
    GetHomeSlider().then((data)=>{
          console.log("Home Slider",data);
          if(data){
            setAllSlider(data);
          }
      })
      GetContactMessage().then((data)=>{
         if(data){
          setAllMessage(data);
         }
      })
  },[deleteSuccess]);

  const handleDelete=(id)=>{
    DeletePost(id).then((res)=>{
      setDeleteSuccess(true);
    });
  }

  const handleDeleteMessage=(id)=>{
    DeleteContactMessage(id).then(()=>{
      setDeleteSuccess(true);
    });
  }

    return (
        <div className='page'>
            <Container style={{paddingTop:'50px',paddingBottom:'50px'}} fluid>
                <div>
                <Row>
                    <Col lg={6} xs={12}>
                        <section style={{boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                            <div className='p-2'>
                               <h4>Home Slider</h4>
                            </div>
                            <Table  bordered  responsive>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Image</th>
                                  <th>Title</th>
                                  <th className='text-center'>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                  {
                                      allSlider.map((row,index)=>(
                                      <tr>
                                        <td>{index+1}</td>
                                        <td>
                                            <img style={{height:'100px',width:'100px'}} 
                                           src={`${baseURL}/images/${row.image}`}></img>
                                        </td>
                                        <td>{row.description}</td>
                                        <td className='d-flex'>
                                          <Button className='mx-2 btn1' style={{background:'red'}}
                                          onClick={()=>handleDelete(row._id)}>Delete</Button>
                                        </td>
                                      </tr>
                                      ))
                                    }
                              </tbody>
                            </Table>
                        </section>
                    </Col>
                    <Col lg={6} xs={12}>
                        <section style={{boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                            <div className='p-2'>
                               <h4>Contact Us Message</h4>
                            </div>
                            <Table  bordered  responsive>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>Email</th>
                                  <th>Name</th>
                                  <th>Message</th>
                                  <th className='text-center'>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                  {
                                      allMessage.map((row,index)=>(
                                      <tr>
                                        <td>{index+1}</td>
                                        <td>{row.email}</td>
                                        <td>{row.name}</td>
                                        <td>{row.message}</td>
                                        <td className='d-flex'>
                                          <Button className='mx-2 btn1' onClick={()=>handleDeleteMessage(row._id)}
                                          style={{background:'red'}}>Delete</Button>
                                        </td>
                                      </tr>
                                      ))
                                    }
                              </tbody>
                            </Table>
                        </section>
                    </Col>
                </Row>
               
                </div>
            </Container>
        </div>
    )
}

export default Settings;
