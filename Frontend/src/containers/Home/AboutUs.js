import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {GetTeamMember} from '../../actions/homeAPI';
import {RemoveMember} from '../../actions/admin';
import { Container, Col, Row, Card ,Button} from 'react-bootstrap';
import logo from '../../assets/logo1.png';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import {baseURL} from '../../config/config';
import SpinnerComponent from '../Spinner';


const team = [
  {}, {}, {}, {}, {}, {}
]

function AboutUs({auth}) {

  const {authCategory,isAuthenticated} =auth;

  const [loading, setloading] = useState(true);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const [allMember, setallMember] = useState([]);

  useEffect(()=>{
    GetTeamMember().then((data)=>{
      setallMember(data);
      setloading(false);
    })
  },[deleteSuccess]);

  const handleRemoveMember=(profileId)=>{
    RemoveMember(profileId).then(()=>{
      setDeleteSuccess(true);
    });
  }

  return (
    <div className='page'>
      { loading ?
         <SpinnerComponent/>
        :
      <section>
         <section style={{ paddingTop: '100px' }}>
           <Container>
             <Row>
               <Col lg={4} xs={12} className='mt-4'>
                 <img src={logo} style={{ height: '350px', width: '100%' }}></img>
               </Col>
               <Col lg={8} xs={12} className='mt-4'>
                 <h2 className='text-center'>About <span className='text-primary'>PI-CLUB</span></h2>
                 <div>
                   <p className='p-4 blog-text1' style={{fontSize:'21px',textAlign:'justify'}}>
                   Profile Building and Innovation (PI) Club aims to serve as an outreach platform for
                   profile building, skill development, connection and networking, exposure to industry
                   norms, professional development, and to promote the spirit of the latest technological
                   advancements.
                   
                   The club plans to host activities such as networking events, professional
                   workshops, corporate visits, competitive events, real-world problem-based
                   multidisciplinary projects in emerging domain of technology.

                    {/* Profile Building and Innovation (PI) Club aims to serve as an outreach platform for
                    profile building, skill development, connection and networking, exposure to industry
                    norms, professional development, and to promote the spirit of the latest technological
                    advancements.
                    The club aims to organize events such as guest speakers, networking events, workshops
                    with professionals, company tours, competitive events, Real-world problem-based
                    interdisciplinary projects work in emerging domains of technology, etc. */}
                    {/* PI Club may restructure a few activities on the basis of the
                    availability of resources and feasibility. Each and every activity has been
                    conceptualized with a vision to familiarize students of ZHCET with industry norms
                    and aspects of the recruitment process, elevate the placement standards of our
                    college, and create a better perception of ZHCET as a national and international
                    institute of excellence. */}
                   </p>
                 </div>
               </Col>
             </Row>
           </Container>
         </section>
         <hr style={{ marginTop: '100px' }} />
         <section style={{ marginTop: '100px' }}>
           <Container>
             <div className='text-center'>
               <h2>Meet our Dedicate Team</h2>
               <p className='m-0 mt-4 blog-text1'>We work in a highly motivated environment. </p>
               <p className='mb-1 m-0 blog-text1'>Our dedicated team is committed to solving a real-life problem that actually makes a difference.</p>
             </div>
             <div className='mt-4'>
               <Row>
                 {
                   allMember.map((row) => (
                     <Col lg={4} xs={12} className='mt-4'>
                       <Card className='card-box'>
                         <div style={{ width: '100%', height: '150px',background:'#00acee' }}></div>
                         <Card.Body className='p-4'>
                           <div className='text-center'>
                             <img style={{
                               width: '120px', height: '120px', borderRadius: '100%',
                               marginTop: '-100px'
                             }}
                             src={`${baseURL}/images/${row.image}`}></img>
                             <h4 className='blog-text0 mt-4'>{row.fullName}</h4>
                             <h4 className='blog-text1'>{row.designation}</h4>
                             <h5 className='blog-text1'>( {row.branch} )</h5>
                           </div>
                           <hr />
                           <div className='my-4 text-center'>
                             <a className='mx-2' href='/'><TwitterIcon style={{ color: '#333' }} /></a>
                             <a className='mx-2' href='/'><LinkedInIcon style={{ color: '#333' }} /></a>
                           </div>
                           {
                               authCategory==='admin'? 
                               <div className='text-center py-2'>
                                  <Button className='btn1' style={{background:'red'}}
                                  onClick={()=>handleRemoveMember(row._id)}>Remove Member</Button>
                               </div>
                               :null
                           }
                         </Card.Body>
                       </Card>
                     </Col>
                   ))
                 }
               </Row>
             </div>
           </Container>
         </section>
      </section>
     }
    </div>);
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(AboutUs);
