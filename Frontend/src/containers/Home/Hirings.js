import React ,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import {GetHirings,ApplyingHirings} from '../../actions/common';
import {DeleteHiring} from '../../actions/admin';
import {baseURL} from '../../config/config';

import './style.css';
import {Container,Col,Row,Card, Button} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import SpinnerComponent from '../Spinner';


const team = [
  {}, {}, {}, {}, {}, {}
]

function Hirings({auth}) {
    
  const {authCategory,isAuthenticated,authId} =auth;
  const [loading, setloading] = useState(true);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const [allHirings, setallHirings] = useState([]);

  useEffect(()=>{
    GetHirings().then((data)=>{
      setallHirings(data);
      setloading(false);
    })
  },[deleteSuccess])


  const handleDeleteHiring=(id)=>{
    DeleteHiring(id).then((res)=>{
      setDeleteSuccess(true);
    });
  }

  const handleApply=(hiringId)=>{
    ApplyingHirings(hiringId);
  }

  return (
  <div className='page'>
     { loading ?
         <SpinnerComponent/>
      :
    <section>
    <Container style={{paddingTop:'50px'}}>
      <div className='text-center'>
         <h1>Latest <span className='color-text'>Hirings</span></h1>
      </div>
      <div>
      <Row className='my-4'>
          {
              allHirings.map((row) => (
                  <Col lg={4} xs={12} className='px-4'>
                          <Card className='card-box my-4 pb-3'>
                            <Row>
                              <Col lg={5} xs={4}>
                                <div className='p-4' style={{height:'100%'}}>
                                <Card.Img style={{width:'80px',height:'80px',borderRadius:'100%'}} 
                                   src={`${baseURL}/images/${row.image}`}/>
                                </div>
                              </Col>
                              <Col lg={7} xs={6}>
                                  <div className='py-2'>
                                      <p className='blog-text4 m-0 mb-1'>{row.company}</p>
                                      <hr className='m-0'/>
                                      <p className='card-title my-1'>{row.role}</p>
                                      <p className='blog-text3 m-0'>Stipend : {row.stipend}</p>
                                      <p className='blog-text3 m-0'>Duration : {row.duration}</p>
                                  </div>
                              </Col>
                            </Row>
                            <hr className='m-0'/>
                            <div className='px-2 py-2'>
                              <p className='card-title'>
                                 <strong>Skills :</strong><span className='mx-2'>{row.skills}</span>
                              </p>
                              <hr/>
                              <div className='d-flex justify-content-between'>
                                {
                                   isAuthenticated &&
                                   <>
                                   {
                                     row.candidates.some((x)=>{
                                      return x._userId==authId;
                                     })?
                                     <Button className='btn1' disabled>Applied</Button>
                                     :
                                   <Button className='btn1' onClick={()=>handleApply(row._id)}>Apply</Button>
                                   }
                                    {
                                      (authCategory=='admin' ||   authCategory=='member' )&& 
                                      <NavLink to={`/applicants/${row._id}`}>
                                        <Button className='btn1' style={{background:'blue'}}>View</Button>
                                      </NavLink>
                                    }
                                    {
                                     authCategory=='admin'&&  <Button className='btn1' 
                                     style={{background:'red'}} onClick={()=>handleDeleteHiring(row._id)}>Delete</Button>
                                    }  
                                   </>
                                }
                              </div>
                            </div>
                        </Card>
                  </Col>
              ))
          }
        </Row>
      </div>
     </Container>
    </section>
    }
   </div>
  ) ;
}

// export default Hirings;

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Hirings);