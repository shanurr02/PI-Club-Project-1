import React, { useState, useEffect } from 'react';
import {CreatePost} from '../../actions/user';
import {GetUserProfile,GetSkills,UpdateUserProfile} from '../../actions/common';
import { Button, Form,Alert,Container,Row,Col} from "react-bootstrap";
import './style.css';
import Select from 'react-select';
import {baseURL} from '../../config/config';



const allBranch=[
    'Computer Engineering',
    'Electronics Engineering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Chemical Engineering',
    'Petroleum  Engineering',
    'Food and Processing Engineering',
  ]
  

function ProfileComponent(props) {

    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState('');
    

    const [formData ,setFormdata]=useState({
        email:'',
        fullName:'',
        branch:"Computer Engineering",
        semester:1,
        linkedinURL:'',
        twitterURL:'',
        about:''
    });

    const [skills, setskills] = useState([]);

    
    const [profileData, setProfileData] = useState([]);
    const [allSkills, setAllSkills] = useState([]);

      
    useEffect(()=>{
        GetUserProfile().then((data)=>{
            console.log(data);
            setProfileData(data);
            setFormdata({
                email:data._userId.email,
                fullName:data.fullName,
                branch:data.branch,
                semester:data.semester,
                linkedinURL:data.linkedinURL?data.linkedinURL:"",
                twitterURL:data.twitterURL?data.twitterURL:"",
                about:data.about?data.about:"",
            })
            setskills(data.skills)
        });
        GetSkills().then((data)=>{
            if(data){
                setAllSkills(data.map((row)=>({
                        label:row.name,
                        value:row.name  
                    })
                ));      
            }
        });
    },[show])

  

    const {email,fullName,branch,semester, linkedinURL,twitterURL,about}=formData;

    const onChange = e => setFormdata({ ...formData, [e.target.name]: e.target.value });

   
    const [image, setimage] = useState(null);
    const handleImageChange = (e) => {
      setimage(e.target.files[0]);
    };

    const handleSubmit=()=>{
        let profile_data = new FormData();
        profile_data.append("fullName",fullName);
        profile_data.append("about",about);
        profile_data.append("branch",branch);
        profile_data.append("semester",Number(semester));
        profile_data.append("linkedinURL",linkedinURL);
        profile_data.append("twitterURL",twitterURL);
        profile_data.append("image",image);
        for(let i=0;i<skills.length;i++){
            profile_data.append("skills",skills[i]);
        }

        UpdateUserProfile(profile_data).then((res)=>{
             if(res){
                setShow(true);
                setMsg('Profile Update Successfully');
             }else{
                setShow(true);
                setMsg('OOPs something wrong');
             }
        });
    }

    return (
        <div className='page'>
            <Container style={{paddingTop:'50px'}}>
                <Row>
                    <Col lg={1} xs={12}>
                    </Col>
                    <Col lg={10} xs={12}>
                        <div style={{display:'flex',alignItems:'center'}}>
                            <div>
                            {profileData.image &&
                                <img   src={`${baseURL}/images/${profileData.image}`}
                                style={{height:'100px',width:'100px',borderRadius:'100%'}}></img>
                            }
                            </div>
                            <div className='mx-4'>
                               <h3>Profile</h3>
                               {profileData.designation && <h6>Member Designation : {profileData.designation}</h6>}
                            </div>     
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
                                        <Form.Control type="text" placeholder="Email" 
                                        value={email}   onChange={e => onChange(e)} name='email' disabled/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="Title">
                                        <Form.Label>Full Name</Form.Label>
                                        <Form.Control type="text" placeholder="Enter Full Name" 
                                        value={fullName}   onChange={e => onChange(e)} name='fullName'/>
                                    </Form.Group>
                                </Col>
                                <Col lg={6} xs={12}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Branch</Form.Label>
                                        <Form.Select  value={branch} name='branch'  onChange={e => onChange(e)} required>
                                         {
                                           allBranch.map((row,index)=>(
                                          <option value={row}>{row}</option>
                                           ))
                                         }
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Semester</Form.Label>
                                        <Form.Select value={semester} name={'semester'}   onChange={e => onChange(e)} required>
                                          <option value="1">1st Semester</option>
                                          <option value="2">2nd Semester</option>
                                          <option value="3">3rd Semester</option>
                                          <option value="4">4th Semester</option>
                                          <option value="5">5th Semester</option>
                                          <option value="6">6th Semester</option>
                                          <option value="7">7th Semester</option>
                                          <option value="8">8th Semester</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col lg={6} xs={12}>
                                    <Form.Group className="mb-3" controlId="Title">
                                        <Form.Label>LinkedIn URL</Form.Label>
                                        <Form.Control type="text" placeholder="LinkedIn URL" 
                                        value={linkedinURL}   onChange={e => onChange(e)} name='linkedinURL'/>
                                    </Form.Group>
                                </Col>
                                <Col lg={6} xs={12}>
                                    <Form.Group className="mb-3" controlId="Title">
                                        <Form.Label>Twitter URL</Form.Label>
                                        <Form.Control type="text" placeholder="Twitter URL" 
                                        value={twitterURL}   onChange={e => onChange(e)} name='twitterURL'/>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Skills</Form.Label>
                                <Select
                                  className="dropdown"
                                  placeholder="Select Option"
                                  defaultValue={skills}
                                  value={allSkills.filter(obj => skills.includes(obj.value))} // set selected values
                                  options={allSkills} // set list of the data
                                  onChange={(e)=>setskills(Array.isArray(e) ? e.map(x => x.value) : [])} 
                                  isMulti
                                  isClearable
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="Title">
                                <Form.Label>About</Form.Label>
                                <Form.Control type="text" placeholder="About" 
                                value={about}  as="textarea" rows={3}  onChange={e => onChange(e)} name='about'/>
                            </Form.Group>
                           
                            <Form.Group controlId="formFile" className="mb-3">
                              <Form.Label>Upload Profile Picture</Form.Label>
                              <Form.Control type="file"  id="custom-file" custom accept="image/png, image/jpeg"
                              onChange={handleImageChange} />
                            </Form.Group>
                         
                            <Button className='btn1' variant="primary" onClick={()=>handleSubmit()}>Update</Button>
                        </Form>
                    </Col>
                    <Col lg={1} xs={12}></Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProfileComponent;
