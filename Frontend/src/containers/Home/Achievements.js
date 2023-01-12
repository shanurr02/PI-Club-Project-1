import React ,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import {GetAchievements} from '../../actions/homeAPI';
import {DeletePost} from '../../actions/admin';
import {baseURL} from '../../config/config';

import './style.css';
import {Container,Col,Row,Card, Button,Modal} from 'react-bootstrap';
import SpinnerComponent from '../Spinner';

const team = [
  {}, {}, {}, {}, {}, {}
]

function Projects({auth}) {
    
  const {authCategory,isAuthenticated} =auth;

  const [loading, setloading] = useState(true);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const [show, setShow] = useState(false);
  const [details, setDetails] = useState([]);

  const [allAchievements, setallAchievements] = useState([]);

  useEffect(()=>{
      GetAchievements().then((data)=>{
          setallAchievements(data);
          setloading(false);
      })
  },[deleteSuccess])

  const handleDelete=(e,id)=>{
    e.stopPropagation();
    DeletePost(id).then((res)=>{
      setDeleteSuccess(true);
    });

  }


  return (
  <div className='page'>
     <Modal show={show} onHide={()=>setShow(false)}  size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{details.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={4} xs={12} className='mt-3'>
              <img  src={`${baseURL}/images/${details.image}`} style={{width:'100%',height:'100%'}}></img>
            </Col>
            <Col lg={8} xs={12} className='mt-3'>
               <p>{details.description}</p>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    { loading ?
        <SpinnerComponent/>
        :
    <section>
    <Container style={{paddingTop:'50px'}}>
      <div className='text-center'>
         <h1>Our <span className='color-text'>Achievements</span></h1>
      </div>
      <div>
      <div style={{paddingTop:'50px'}}>
          {
              allAchievements.map((row) => (
                          <div>
                          <Card className='card-box my-4' onClick={()=>{
                            setShow(true);
                            setDetails(row);
                            }}>
                            <Row>
                              <Col lg={4}>
                              <Card.Img variant="top"  style={{width:'100%',height:'100%'}} 
                                src={`${baseURL}/images/${row.image}`}/>
                              </Col>
                              <Col lg={8}>
                              <Card.Body className='pb-1'>
                                <p className='home-title m-0 text-center mb-2'>{row.title}</p>
                                <hr className='m-0'/>
                                <div className='py-2' >
                                  <div  style={{height:'60px',overflow:'hidden'}}>
                                    <Card.Title className='card-title'>{row.description}</Card.Title>
                                  </div>
                                </div>
                                {
                                  isAuthenticated && authCategory=='admin' &&
                                  <div className='text-center py-2'>
                                     <Button className='btn1' style={{background:'red'}}
                                     onClick={(e)=>handleDelete(e,row._id)}>Remove Achievements</Button>
                                  </div>
                                }
                            </Card.Body>
                              </Col>
                            </Row>
                        </Card>
                      </div>
              ))
          }
        </div>
      </div>
     </Container>
    </section>
    }
  </div>);
}

// export default Hirings;

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Projects);