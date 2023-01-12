import React ,{useState,useEffect} from 'react';
import {Container,Col,Row,Form,Button,Alert} from 'react-bootstrap';
import { connect } from 'react-redux';
import {SendContactMessage} from '../../actions/homeAPI';

import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';

const position = [27.9135, 78.0782]

const Address=[
  {Icon:"Hello",heading:'Address',text:'Training and Placement Office , ZHCET , AMU , Aligarh , UP'},
  {Icon:"Hello",heading:'EMAIL:',text:'ma@gmail.com'},
]


function ContactUs() {


  const [openAlert, setopenAlert] = useState(false);
  const [msg, setopenMsg] = useState('');

  useEffect(() => {
    if(openAlert){
        setTimeout(() => {
          setopenAlert(false);
          setopenMsg('');
        }, 2000);
    }
  }, [openAlert])

  const [formData, setFormData] = useState({
    email:'',
    name:'',
    message:''
  });

  const {email,name,message}=formData;

  const onChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  }

  const handleSubmit=(e)=>{
        e.preventDefault();
        let data={email,name,message};
        console.log(data);
        SendContactMessage(data).then((res)=>{
              if(res){
                setopenAlert(true);
                setopenMsg("Message send successfully.");
                setFormData({
                  email:'',
                  name:'',
                  message:''    
                })
              }
        });
  }

  return (
  <div className='page'>
     <Container style={{paddingTop:'50px'}}>
       <div className='text-center'>
         <h1>Contact Us</h1>
       </div>
         <div style={{marginTop:'50px'}}>
           <Row>
             <Col lg={8} xs={12} className='mt-3'>
                  <div className='p-4' >
                    {
                      openAlert && <Alert onClose={() => setopenAlert(false)}  dismissible>{msg}</Alert>
                    }
                    <Form onSubmit={(e)=>handleSubmit(e)}>
                      <Row>
                        <Col lg={6} xs={12}>
                           <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                             <Form.Label>Email address</Form.Label>
                             <Form.Control type="email" placeholder="name@example.com" 
                            name='email' value={email} onChange={(e)=>onChange(e)} required/>
                           </Form.Group>
                        </Col>
                        <Col lg={6} xs={12}>
                          <Form.Group className="mb-3">
                             <Form.Label>Name</Form.Label>
                             <Form.Control type="text" placeholder="Enter Name" 
                             name='name' value={name} onChange={(e)=>onChange(e)} required/>
                           </Form.Group>
                        </Col>
                      </Row>
                      {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                       <Form.Label>Subject</Form.Label>
                       <Form.Control type="email" placeholder="Subject" />
                      </Form.Group> */}
                      <Form.Group className="mb-3" >
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" rows={3} 
                        name='message' value={message} onChange={(e)=>onChange(e)} required/>
                      </Form.Group>
                      <Button className='btn1 mt-4' type='submit'>Send</Button>
                    </Form>
                </div>
             </Col>
             <Col lg={4} xs={12} className='mt-3'>
              <div className='p-4' >
                 <div>
                   <h4>Quick Contact</h4>
                 </div>
                 <hr/>
                 <div>
                   <p>If you have any questions simply use the following contact details.</p>
                 </div>
                 <hr/>
                 {
                   Address.map((row)=>(
                    <Row>
                      <Col lg={4} xs={4}>
  
                      </Col>
                      <Col lg={8} xs={8}>
                        <h6>{row.heading}</h6>
                        <p>{row.text}</p>
                      </Col>
                    </Row>
                   ))
                 }
              </div>
             </Col>
           </Row>
         </div>
     </Container>
     <section style={{marginTop:'100px'}}>
       <Container>
          <MapContainer center={position} zoom={30} scrollWheelZoom={false} style={{height:'70vh'}}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>,
       </Container>
     </section>

  </div>);
}

export default ContactUs;
