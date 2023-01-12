import React, { useState, useEffect } from 'react';
import {CreatePost} from '../../actions/user';
import { Button, Form,Alert,Container,Row,Col} from "react-bootstrap";
import './style.css';

function AddBlogs(props) {

    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState('');
      
    const [formData ,setFormdata]=useState({
        title:'',
        description:'',
    });

    const {title,description}=formData;

    const onChange = e => setFormdata({ ...formData, [e.target.name]: e.target.value });

    const [image, setimage] = useState(null);
    const handleImageChange = (e) => {
      setimage(e.target.files[0]);
    };

    const handleSubmit=()=>{
        let post_data = new FormData();
        if(title.length=='' ||  description.length==''){
            setShow(true);
            setMsg('All fields required');
        }else{
            post_data.append("title",title);
            post_data.append("description", description);
            if(image){
                post_data.append("image", image);
                CreatePost(post_data);
                setShow(true);
                setMsg('Blog created successfully');
                props.view(false);
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
                            <h3>Add Member</h3>
                        </div>
                        <Form style={{marginTop:'50px',paddingBottom:'100px'}}>
                            {
                                show?
                                <Alert variant="danger" onClose={() => setShow(false)} dismissible>{msg}</Alert>:null
                            }

                            <Row>
                                <Col lg={6} xs={12}>
                                <Form.Group className="mb-3" controlId="Title">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Full Name" 
                                    value={title}   onChange={e => onChange(e)} name='title'/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="Title">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Full Name" 
                                    value={title}   onChange={e => onChange(e)} name='title'/>
                                </Form.Group>
                                   
                                </Col>
                                <Col lg={6} xs={12}>
                                <Form.Group className="mb-3" controlId="Title">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Full Name" 
                                    value={title}   onChange={e => onChange(e)} name='title'/>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="Title">
                                    <Form.Label>Designation</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                      <option>Open this select menu</option>
                                      <option value="1">Blogs</option>
                                      <option value="2">Projects</option>
                                      <option value="3">Achievement</option>
                                    </Form.Select>
                                </Form.Group>
                               
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={6} xs={12}>
                                <Form.Group className="mb-3" controlId="Title">
                                    <Form.Label>Branch</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                      <option>Open this select menu</option>
                                      <option value="1">Blogs</option>
                                      <option value="2">Projects</option>
                                      <option value="3">Achievement</option>
                                    </Form.Select>
                                </Form.Group>
                                </Col>
                                <Col lg={6} xs={12}>
                                <Form.Group className="mb-3" controlId="Title">
                                    <Form.Label>Semester</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                      <option>Open this select menu</option>
                                      <option value="1">1st Semester</option>
                                      <option value="1">2nd Semester</option>
                                      <option value="1">3rd Semester</option>
                                      <option value="1">4th Semester</option>
                                      <option value="1">5th Semester</option>
                                      <option value="1">6th Semester</option>
                                      <option value="1">7th Semester</option>
                                      <option value="1">8th Semester</option>
                                    </Form.Select>
                                </Form.Group>
                                </Col>
                            </Row>
                           
                            <Form.Group controlId="formFile" className="mb-3">
                              <Form.Label>Upload Profile Picture</Form.Label>
                              <Form.Control type="file"  id="custom-file" custom accept="image/png, image/jpeg"
                              onChange={handleImageChange} />
                            </Form.Group>
                         
                            <Button variant="primary" onClick={()=>handleSubmit()}>Create</Button>
                        </Form>
                    </Col>
                    <Col lg={1} xs={12}></Col>
                </Row>
            </Container>
        </div>
    )
}

export default AddBlogs;
