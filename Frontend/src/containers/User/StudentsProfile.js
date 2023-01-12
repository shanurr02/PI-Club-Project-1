import React, { useState, useEffect } from 'react';
import {CreatePost} from '../../actions/user';
import { Button, Form,Alert,Container,Table,Modal,Row,Col} from "react-bootstrap";
import './style.css';
import {GetDesignations,ChangeMember,GetAllProfile} from '../../actions/admin';
import SpinnerComponent from '../Spinner';

const data = [{}, {}, {}, {}, {}, {}]


function AllStudents(props) {

  const [show, setShow] = useState(false);
  const [allProfile, setAllProfile] = useState([]);
  const [allDesignation, setAllDesignation] = useState([]);
  const [updateMember, setUpdateMember] = useState([]);
  const [loading, setloading] = useState(true);

  const [newDesignation, setNewDesignation] = useState('');
  

  const [searchName,setSearchName]=useState('');


  useEffect(()=>{
    GetAllProfile().then((res)=>{
      if(res){
        setAllProfile(res);
      }
    })
    GetDesignations().then((data)=>{
      setAllDesignation(data)
    })
    setloading(false);
  },[])


  const handleMember=()=>{
    ChangeMember({designation:newDesignation},updateMember._id).then(()=>{
      setShow(false);
    });
  }

    return (
        <div className='page'>
          <Modal  show={show} onHide={()=>setShow(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Make Member of Club</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3" controlId="Title">
                  <Form.Label>Designation</Form.Label>
                  <Form.Select aria-label="Default select example" onChange={(e)=>setNewDesignation(e.target.value)}>
                  <option>Select Designation</option>
                    {
                      allDesignation.map((row)=>(
                         <option  value={row.name} >{row.name}</option>
                      ))
                    }
                  </Form.Select>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button  className='btn1' stylw={{background:'blue'}} onClick={()=>setShow(false)}>Close</Button>
              <Button variant="primary" className='btn1' onClick={()=>handleMember()}>Save </Button>
            </Modal.Footer>
          </Modal>
          { loading ?
           <SpinnerComponent/>
          : 
            <Container style={{paddingTop:'50px',paddingBottom:'50px'}}>
                <div  style={{boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px'}}>
                <Row className='p-4'>
                  <Col lg={6} xs={12} className='my-2'>
                     <h3>All Students of Club ( {allProfile.length} )</h3>
                  </Col>
                  <Col lg={6} xs={12}  className='my-2'>
                     <Form.Group className="mb-3" controlId="Title">
                          <Form.Control type="text" placeholder="Search Students" onChange={(e)=>setSearchName(e.target.value)} 
                       value={searchName} name='searchName'/>
                      </Form.Group>
                  </Col>
                </Row>
                <Table  bordered  responsive>
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Branch(Semester)</th>
                      <th>Skills</th>
                      <th>Resume</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                      {
                         allProfile.filter((val)=>{
                          if(searchName==" "){
                             return val;
                          }else if(val.fullName.toLowerCase().includes(searchName.toLowerCase())){
                            return val;
                          }
                      })
                      .map((row,index)=>(
                          <tr   key={index}  onClick={()=>{ 
                               if(!row.member && !row.designation){
                                 setUpdateMember(row);
                                 setShow(true);
                               }
                            }}
                           className={row.member && row.designation?'member-tr':'not-member-tr'}
                           >
                            <td>{index+1}</td>
                            <td>{row.fullName}</td>
                            <td>{row._userId.email}</td>
                            <td>
                                <p className='m-0'>{row.branch} ({row.semester})</p>
                            </td>
                            <td>{row.skills.join(" , ")}</td>
                            <td><Button className='btn1'>View</Button></td>
                            <td className='d-flex'>
                              <Button className='mx-2 btn1' style={{background:'red'}}>Delete</Button>
                            </td>
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

export default AllStudents;
