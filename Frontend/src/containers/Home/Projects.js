import React ,{useState,useEffect} from 'react';
import { connect } from 'react-redux';
import {GetProjects} from '../../actions/homeAPI';
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
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState([]);

  const [loading, setloading] = useState(true);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const [allProjects, setallProjects] = useState([]);

  useEffect(()=>{
      GetProjects().then((data)=>{
          setallProjects(data);
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
         <h1>Our <span className='color-text'>Projects</span></h1>
      </div>
      <div>
      <Row className='my-4'>
          {
              allProjects.map((row) => (
                  <Col lg={4} xs={12} className='px-4'>
                          <div>
                          <Card className='card-box my-4' onClick={()=>{
                            setShow(true);
                            setDetails(row);
                            }}>
                            <div className='py-2' style={{borderRadius:'5px',height:'50px',
                                background:'linear-gradient(180deg,rgba(0,0,0,.7) 0,transparent 95%)'}}>
                            </div>
                            <Card.Img variant="top" style={{marginTop:-50,zIndex:-10,height:"200px",width:'100%'}} 
                            src={`${baseURL}/images/${row.image}`}/>
                            <Card.Body className='pb-1'>
                                <h4 className='m-0 text-center' style={{fontSize:'1.5rem',height:"9vh",overflow:'hidden'}}>{row.title}</h4>
                                <hr className='m-0 mt-3'/>
                                <div className='py-2' >
                                  <div  style={{height:'60px',overflow:'hidden'}}>
                                  <Card.Title className='card-title'>{row.description}</Card.Title>
                                  </div>
                                </div>
                                {
                                  isAuthenticated && authCategory=='admin' &&
                                  <div className='text-center py-2'>
                                     <Button className='btn1' style={{background:'red'}}
                                     onClick={(e)=>handleDelete(e,row._id)}>Remove Project</Button>
                                  </div>
                                }
                            </Card.Body>
                        </Card>
                      </div>
                  </Col>
              ))
          }
        </Row>
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