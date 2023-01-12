import React, { useState, useEffect } from 'react';
// import {CreatePost} from '../../actions/user';
import {AddSkills,AddDesignation,
    DeleteSkill,DeleteDesignation,GetDesignations,DeleteGalleryImage
} from '../../actions/admin';
import {GetSkills,CreatePost,AddGalleryImage,GetGalleryImages} from '../../actions/common';
import {baseURL} from '../../config/config';

import { Button, Form,Alert,Container,Row,Col,Card} from "react-bootstrap";
import './style.css';
import { connect } from 'react-redux';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function AddBlogs({auth}) {

    const {authCategory,isAuthenticated} =auth;

    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState('');
    
    const [skill, setSkill] = useState('');
    const [designation, setDesignation] = useState('');
    
    const [allSkill, setAllSkill] = useState([]);
    const [allDesignation, setAllDesignation] = useState([]);
    const [allGalleryImages, setAllGalleryImages] = useState([]);


    useEffect(() => {
        GetSkills().then((data)=>{
        //    console.log(data);
           setAllSkill(data);
        })
        GetDesignations().then((data)=>{
            console.log(data);
            setAllDesignation(data);
        })
        GetGalleryImages().then((data)=>{
            setAllGalleryImages(data);
        })
    }, [])
      
    const [formData ,setFormdata]=useState({
        title:'',
        description:'',
        category:0
    });

    const {title,description,category}=formData;

    const onChange = e => setFormdata({ ...formData, [e.target.name]: e.target.value });

    const [image, setimage] = useState(null);
    const handleImageChange = (e) => {
      setimage(e.target.files[0]);
    };

    const handleSubmit=()=>{
        console.log("Number(category)" ,Number(category));
        let post_data = new FormData();
        if(title.length=='' ||  description.length==''){
            setShow(true);
            setMsg('All fields required');
        }else{
            post_data.append("title",title);
            post_data.append("description", description);
            post_data.append("category", Number(category));
            if(image){
                post_data.append("image", image);
                CreatePost(post_data);
                setShow(true);
                setMsg('Created successfully');
                setFormdata({
                    title:'',
                    description:'',
                    category:0
                })
                setimage(null);
            }else{
                setShow(true);
                setMsg('Image required for creating.');
            }
        }
      
    }

    const handleAddSkill=()=>{
        AddSkills({name:skill});
        setSkill('');
    }


    const handleAddDesignation=()=>{
        AddDesignation({name:designation});
        setDesignation('');
    }

    const handleDeleteSkill=(id)=>{
        DeleteSkill(id);
    }

    
    const handleDeleteDesignation=(id)=>{
        DeleteDesignation(id);
    }

    const handleAddGallery=()=>{
        let post_data = new FormData();
        if(image){
            post_data.append("image", image);
            AddGalleryImage(post_data);
        }
    }

    const deleteImage=(id)=>{
        DeleteGalleryImage(id);
    }

    return (
        <div className='page'>
            <Container style={{paddingTop:'50px'}}>
                <Row>
                    <Col lg={1} xs={12}></Col>
                    <Col lg={10} xs={12}>
                        <Card style={{background:'transparent'}}>
                            <Card.Body>
                                <div className='text-center'>
                                    <h3>Create</h3>
                                </div>
                                <hr/>
                                <Form style={{marginTop:'50px',paddingBottom:'50px'}}>
                                {
                                    show?
                                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>{msg}</Alert>:null
                                }
                                <Row>
                                    <Col lg={authCategory=='admin' || authCategory=='member' ?6:12} xs={12}>
                                        <Form.Group className="mb-3" controlId="Title">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Title" 
                                        value={title}   onChange={e => onChange(e)} name='title'/>
                                    </Form.Group>
                                    </Col>
                                    {
                                    isAuthenticated && (authCategory=='admin' ||   authCategory=='member' ) &&
                                    <Col lg={6} xs={12}>
                                        <Form.Group className="mb-3" >
                                            <Form.Label>Category</Form.Label>
                                            <Form.Select value={category} 
                                              onChange={e => onChange(e)} name='category'>
                                              <option value="0">Blogs</option>
                                              {/* <option value="1">Events</option> */}
                                              <option value="2">Projects</option>
                                              <option value="3">Achievement</option>
                                              <option value="4">Home Slider</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    }
                                </Row>
                          
                                <Form.Group className="mb-3" controlId="Description">
                                  <Form.Label>Description</Form.Label>
                                  <Form.Control type="text" placeholder="Description" as='textarea' 
                                  style={{ height: '150px' }} 
                                  value={description}    onChange={e => onChange(e)} name='description'/>
                                </Form.Group>
                            
                                <Form.Group controlId="formFile" className="mb-3">
                                  <Form.Label>Upload Image</Form.Label>
                                  <Form.Control type="file"  id="custom-file" custom accept="image/png, image/jpeg"
                                  onChange={handleImageChange} />
                                </Form.Group>
                                <Button className='btn1 mt-4' onClick={()=>handleSubmit()}>Create</Button>
                            </Form>
                          </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={1} xs={12}></Col>
                </Row>
               
                {
                     isAuthenticated && (authCategory=='admin' ||  authCategory=='member' ) &&
                    <>
                <hr style={{margin:'50px 0px'}}/>
                <section >
                    <Row>
                        {
                            authCategory=='admin' && 
                            <>
                            <Col lg={4} xs={12} className='mt-4'>
                               <Card>
                                <Card.Body>
                                <div>
                                    <h3 className='text-center'>Skills</h3>
                                </div>
                                <div>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Skill</Form.Label>
                                        <Form.Control type="text" placeholder="Enter skill" 
                                        value={skill}   onChange={e => setSkill(e.target.value)} name='skill'/>
                                    </Form.Group>
                                    <Button className='btn1' onClick={()=>handleAddSkill()}>Add</Button>
                                </div>
                                <hr/>
                                <div>
                                    {
                                        allSkill.map((row)=>(
                                            <div className='d-flex justify-content-between'>
                                                <p>{row.name}</p>
                                                <IconButton onClick={()=>handleDeleteSkill(row._id)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </div>
                                        ))
                                    }
                                </div>
                                </Card.Body>
                               </Card>
                            </Col>
                            <Col lg={4} xs={12} className='mt-4'>
                              <Card>
                                <Card.Body>
                                <div>
                                    <h3 className='text-center'>Designation</h3>
                                </div>
                                <div>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Designation</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Designation Name" 
                                        value={designation}   onChange={e => setDesignation(e.target.value)} 
                                        name='designation'/>
                                    </Form.Group>
                                    <Button className='btn1' onClick={()=>handleAddDesignation()}>Add</Button>
                                </div>
                                <hr/>
                                <div>
                                    {
                                        allDesignation.map((row)=>(
                                            <div className='d-flex justify-content-between'>
                                                <p>{row.name}</p>
                                                <IconButton onClick={()=>handleDeleteDesignation(row._id)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </div>
                                        ))
                                    }
                                </div>
                                </Card.Body>
                              </Card>
                            </Col>
                        </>
                        }
                            <Col lg={authCategory=='admin'?4:6} xs={12} className='mt-4'>
                                <Card>
                                    <Card.Body>
                                    <div>
                                         <h3 className='text-center'>Gallery</h3>
                                     </div>
                                     <div>
                                        <Form.Group controlId="formFile" className="mb-3">
                                          <Form.Label>Upload Image</Form.Label>
                                          <Form.Control type="file"  id="custom-file" custom accept="image/png, image/jpeg"
                                          onChange={handleImageChange} />
                                        </Form.Group>
                                        <Button className='btn1 mt-4' onClick={()=>handleAddGallery()}>Upload</Button>
                                     </div>
                                     <Row>
                                         {
                                             allGalleryImages.map((row)=>(
                                                 <Col lg={6} xs={6} className='mt-3'>
                                                     <Card>
                                                     <img  style={{width:'100%',height:'100px'}}
                                                         src={`${baseURL}/images/${row.image}`}></img>
                                                       <div className='text-center'>
                                                       <IconButton onClick={()=>deleteImage(row._id)}>
                                                           <DeleteIcon/>
                                                       </IconButton>
                                                     </div>
                                                    </Card>
                                                 </Col>
                                             ))
                                         }
                                     </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                    </Row>
                </section>
                </>
                }
                
            </Container>

        </div>
    )
}

// export default AddBlogs;
const mapStateToProps = (state) => ({
    auth: state.auth,
  });
  
  export default connect(mapStateToProps, {})(AddBlogs);