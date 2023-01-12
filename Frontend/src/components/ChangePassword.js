import React ,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import {Card,Container,Row,Col,Form,Button,Alert} from 'react-bootstrap';
import {ChangePassword} from '../actions/auth';

export const ChangePasswordComponent = (props) => {

    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirm_password] = useState('');
    
    const [passwordValid, setPasswordValid] = useState(false);
    const [openAlert, setopenAlert] = useState(false);
    const [msg, setopenMsg] = useState('');

    useEffect(() => {
      if(passwordValid || openAlert){
          setTimeout(() => {
            setPasswordValid(false);
            setopenAlert(false);
            setopenMsg('');
          }, 2000);
      }
    }, [passwordValid,openAlert])

    const handleSubmit=(e)=>{
          e.preventDefault();
          if(password===confirm_password){
               let data={email,password};
               console.log(data);
               ChangePassword(data).then((res)=>{
                   if(res){
                       setopenAlert(true);
                       setopenMsg('Password update successfully.');
                       setemail('');
                       setPassword('');
                       setConfirm_password('');
                   }else{

                   }
               })
          }else{
            setPasswordValid(true);
          }
    }

  return (
    <div style={{padding:'100px 0px'}}>
        <Container>
            <Row>
                <Col lg={6} xs={12}>
                   <Card className='p-4 card-container'>
                        <div className='mt-2'>
                            <h2 className='title'>Change Password</h2>
                        </div>
                        <div>
                        {
                        openAlert &&
                           <Alert onClose={() => setopenAlert(false)}  dismissible >{msg}</Alert>
                        }
                        <Form onSubmit={(e)=>handleSubmit(e)} className='mt-4' style={{paddingBottom:'100px'}}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Email" 
                                value={email}   onChange={e => setemail(e.target.value)} name='email' required/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" 
                                value={password}   onChange={e => setPassword(e.target.value)} name='password' required/>
                                <Form.Text id="passwordHelpBlock" muted>
                                  Your password must be greater than 8 characters.
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" 
                                 value={confirm_password}   onChange={e => setConfirm_password(e.target.value)} name='confirm_password' required/>
                                { passwordValid && <p className='text-danger'>Password didn't match</p>}
                            </Form.Group>
                            <Button className='mt-4 login-btn'type='submit' >Change Password</Button>
                       </Form>
                       <div>
                       </div>
                        </div>
                   </Card>
                </Col>
                <Col lg={6} xs={12}></Col>
            </Row>
        </Container>
    </div>
  )
}

export default connect(null, {})(ChangePasswordComponent)