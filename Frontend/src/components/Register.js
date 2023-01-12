import React, { useState, useEffect } from 'react';
import {GetSkills} from '../actions/common';
import {register} from '../actions/auth';
import { Button, Form,Alert,Container,Row,Col} from "react-bootstrap";
import Select from 'react-select';
import './style.css';
import { connect } from 'react-redux';


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

function Register({register,auth,setauthLevel,authLevel}) {

    const {isSignup,authError} = auth;


  const [allSkills, setAllSkills] = useState([]);
  const [passwordCheck, setPasswordCheck] = useState(false);

  const [openAlert, setopenAlert] = useState(false);
  const [msg, setopenMsg] = useState('');

  useEffect(() => {
    if(isSignup){
        setopenAlert(true);
        setopenMsg('Register Successfully. Please Login to Continue');
        setTimeout(()=>{
           setauthLevel(!authLevel);
           setopenAlert(false);
           setopenMsg('');
        },3000)
    }
  }, [isSignup]);

  useEffect(() => {
    if(authError){
        setopenAlert(true);
        setopenMsg(authError);
        setTimeout(()=>{
           setopenAlert(false);
           setopenMsg('');
        },3000)
    }
  }, [authError]);

  
      
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
        email:'',
        fullName:'',
        password:'',
        repeat_password:'',
        branch:"Computer Engineering",
        semester:1,
    });

    const [skills, setskills] = useState([]);

    const {email,fullName,repeat_password,password,branch,semester}=formData;


    const onChange = e => setFormdata({ ...formData, [e.target.name]: e.target.value });

   
    const handleSubmit=(e)=>{
        if(repeat_password==password){
            let data={fullName,email,password,branch,semester:Number(semester),skills};
            // data.skills=skills;
            console.log("skills",data);
            e.preventDefault();
            register(data);
        }else{
            setPasswordCheck(!passwordCheck);
        }
    }

   
    return (
        <div>
            <Container fluid>
                {
                openAlert &&
                   <Alert onClose={() => setopenAlert(false)}  dismissible >{msg}</Alert>
                }
               <Form onSubmit={(e)=>handleSubmit(e)} style={{paddingBottom:'100px'}}>
                <Row>
                    <Col lg={6} xs={12}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" 
                        value={email}   onChange={e => onChange(e)} name='email' required/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" 
                        value={password}   onChange={e => onChange(e)} name='password' required/>
                        <Form.Text id="passwordHelpBlock" muted>
                          Your password must be greater than 8 characters.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Repeat Password</Form.Label>
                        <Form.Control type="password" placeholder="Repeat Password" 
                        value={repeat_password}   onChange={e => onChange(e)} name='repeat_password' required/>
                           {
                              passwordCheck ?
                              <Form.Text id="passwordHelpBlock" className='text-danger'>
                              Password didn't match
                            </Form.Text>:null
                            }
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Full Name" 
                        value={fullName}   onChange={e => onChange(e)} name='fullName' required/>
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
                    <Form.Group className="mb-3">
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
                    </Col>
                </Row>
                <Button  type='submit' className='login-btn my-4' >Join Now</Button>
            </Form>
            </Container>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});


export default connect(mapStateToProps, {register })(Register);
