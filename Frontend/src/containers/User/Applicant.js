import React, { useState, useEffect } from 'react';
import {GetApplicantDetails} from '../../actions/common';
import { Button, Form,Alert,Container,Table,Modal,Row,Col,Card} from "react-bootstrap";
import './style.css';
import { useParams } from 'react-router-dom';
import SpinnerComponent from '../Spinner';

const data = [{}, {}, {}, {}, {}, {}]


function AllApplicants() {
 
  const hiringId=useParams();

  const [loading, setloading] = useState(true);

  const [details,setDetails]=useState([]);
  const [allApplicants,setAllApplicant]=useState([]);


  const [searchName,setSearchName]=useState('');


  useEffect(()=>{
    GetApplicantDetails(hiringId.id).then((data)=>{
      if(data){
        setDetails(data);
        setAllApplicant(data.candidates); 
        setloading(false); 
      }
    })
  },[])
     

    return (
        <div className='page'>
        { loading ?
           <SpinnerComponent/>
          : 
            <Container style={{paddingTop:'50px',paddingBottom:'50px'}}>
                <div  style={{boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                <Card className='my-4 pb-3'>
                            <Row>
                              <Col lg={2} xs={4}>
                                <div className='p-4' style={{height:'100%'}}>
                                <Card.Img 
                                  style={{width:'80px',height:'80px',borderRadius:'100%'}} 
                                    src='https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_960_720.jpg'
                                  />
                                </div>
                              </Col>
                              <Col lg={10} xs={6}>
                                  <div className='py-2'>
                                      <p className='blog-text4 m-0 mb-1'>{details.company}</p>
                                      <hr className='m-0'/>
                                      <p className='card-title my-1'>{details.role}</p>
                                      <p className='blog-text3 m-0'>Stipend : {details.stipend}</p>
                                      <p className='blog-text3 m-0'>Duration : {details.duration}</p>
                                  </div>
                              </Col>
                            </Row>
                            <hr className='m-0'/>
                            <div className='px-4 py-2'>
                              <p className='card-title'>
                                <strong>Skills : </strong><span className='mx-3'>{details.skills}</span></p>
                            </div>
                        </Card>
                <Row className='p-4'>
                  <Col lg={6} xs={12} className='my-2'>
                     <h3>Students Applied</h3>
                  </Col>
                  <Col lg={6} xs={12}  className='my-2'>
                     <Form.Group className="mb-3" controlId="Title">
                          <Form.Control type="text" placeholder="Search Students"  onChange={(e)=>setSearchName(e.target.value)}
                        name='searchName' value={searchName} />
                      </Form.Group>
                  </Col>
                </Row>
                
                <Table  bordered  responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Branch/Semester</th>
                      <th>Skills</th>
                      <th>Resume</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                      allApplicants.filter((val)=>{
                        if(searchName==" "){
                           return val;
                        }else if(val._profileId.fullName.toLowerCase().includes(searchName.toLowerCase())){
                          return val;
                        }
                      })
                      .map((row,index)=>(
                          <tr>
                            <td>{index+1}</td>
                            <td>{row._profileId.fullName}</td>
                            <td>{row._userId.email}</td>
                            <td>
                              {row._profileId.branch} ( {row._profileId.semester} )
                            </td>
                            <td>{row._profileId.skills.join(" , ")}</td>
                            <td><Button className='btn1'>View</Button></td>
                          </tr>
                          ))
                        }
                  </tbody>
                </Table>
                </div>
            </Container>
          }
        </div>
    )
}

export default AllApplicants;
