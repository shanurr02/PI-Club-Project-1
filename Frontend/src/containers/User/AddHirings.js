import React, { useState, useEffect } from 'react';
import {AddHirings} from '../../actions/admin';
import {GetSkills} from '../../actions/common';

import Select from 'react-select';

import { Button, Form,Alert,Container,Row,Col} from "react-bootstrap";
import './style.css';

function Hirings() {

    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState('');
    
    const [allSkills, setAllSkills] = useState([]);

      
    useEffect(() => {
        GetSkills().then((data)=>{
            if(data){
                setAllSkills(data.map((row)=>({
                        label:row.name,
                        value:row.name  
                    })
                ));      
            }
        });
    }, []);

    const [formData ,setFormdata]=useState({
        company:'',
        role:'',
        stipend:'',
        duration:'',
    });

    const [skills, setskills] = useState([]);

    const {company,role,stipend,duration}=formData;

    const onChange = e => setFormdata({ ...formData, [e.target.name]: e.target.value });

    const [image, setimage] = useState(null);
    const handleImageChange = (e) => {
      setimage(e.target.files[0]);
    };

    const handleSubmit=()=>{
        let post_data = new FormData();
        if(company.length=='' ||  role.length=='' ||  stipend.length=='' ||  duration.length==''){
            setShow(true);
            setMsg('All fields required');
        }else{
            post_data.append("company",company);
            post_data.append("role", role);
            post_data.append("stipend", stipend);
            post_data.append("duration", duration);
            post_data.append("skills", skills);
            // post_data.append("description", description);
            if(image){
                post_data.append("image", image);
                AddHirings(post_data);
                setShow(true);
                setMsg('Blog created successfully');
                setFormdata({
                    company:'',
                    role:'',
                    stipend:'',
                    duration:''
                })
                setimage(null)
            }else{
                setShow(true);
                setMsg('Image required for creating blogs.');
            }
        }
      
    }

    return (
        <div className='page'>
            <Container style={{paddingTop:'50px'}}>
                <Row>
                    <Col lg={1} xs={12}></Col>
                    <Col lg={10} xs={12}>
                        <div className='text-center'>
                            <h3>Add Hirings</h3>
                        </div>
                        <Form style={{paddingBottom:'100px'}}>
                            {
                                show?
                                <Alert variant="danger" onClose={() => setShow(false)} dismissible>{msg}</Alert>:null
                            }

                            <Row>
                                <Col lg={6} xs={12}>
                                    <Form.Group className="mb-3" >
                                    <Form.Label>Company Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Company Name" 
                                    value={company}   onChange={e => onChange(e)} name='company'/>
                                </Form.Group>
                                </Col>
                                <Col lg={6} xs={12}>
                                    <Form.Group className="mb-3" >
                                    <Form.Label>Role</Form.Label>
                                    <Form.Control type="text" placeholder="Role" 
                                    value={role}   onChange={e => onChange(e)} name='role'/>
                                </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={6} xs={12}>
                                    <Form.Group className="mb-3" >
                                    <Form.Label>Stipend</Form.Label>
                                    <Form.Control type="text" placeholder="Stipend" 
                                    value={stipend}   onChange={e => onChange(e)} name='stipend'/>
                                </Form.Group>
                                </Col>
                                <Col lg={6} xs={12}>
                                    <Form.Group className="mb-3" >
                                    <Form.Label>Duration</Form.Label>
                                    <Form.Control type="text" placeholder="Duration" 
                                    value={duration}   onChange={e => onChange(e)} name='duration'/>
                                </Form.Group>
                                </Col>
                            </Row>
                           
                            <Form.Group className="mb-3" controlId="Description">
                                <Form.Label>Skills</Form.Label>
                                <Select
                                      className="dropdown"
                                      placeholder="Select Option"
                                      value={allSkills.filter(obj => skills.includes(obj.value))} // set selected values
                                      options={allSkills} // set list of the data
                                      onChange={(e)=>setskills(Array.isArray(e) ? e.map(x => x.value) : [])} 
                                      isMulti
                                      isClearable
                                />
                              </Form.Group>
            
                            <Form.Group controlId="formFile" className="mb-3">
                              <Form.Label>Upload Company Logo</Form.Label>
                              <Form.Control type="file"  id="custom-file" custom accept="image/png, image/jpeg"
                              onChange={handleImageChange} />
                            </Form.Group>
                         
                            <Button className='btn1' onClick={()=>handleSubmit()}>Create</Button>
                        </Form>
                    </Col>
                    <Col lg={1} xs={12}></Col>
                </Row>
            </Container>
        </div>
    )
}

export default Hirings;
