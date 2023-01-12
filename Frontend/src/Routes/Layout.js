import React,{Fragment,useState} from 'react'
import { connect } from 'react-redux';
import NavBar from '../components/Navigation';
import Footer from '../components/Footer';
import SideNav from '../components/Sidenav';
import {Row,Col,Container} from 'react-bootstrap';

function Layout({auth,children}) {

    const {authCategory,isAuthenticated} =auth;

    return (
        <Fragment >
             <NavBar />
            <div style={{marginTop:'60px'}}>
               {children}         
            </div>
            <Footer/>
                 {/* <Row className='p-0 m-0'>
                    {
                    isAuthenticated && authCategory=='admin' &&
                     <Col lg={2} xs={12} className='p-0 m-0'>
                         <SideNav style={{marginTop:'100px'}}/>
                     </Col>
                    }
                    <Col lg={isAuthenticated && authCategory=='admin'?10:12} xs={12} className='p-0 m-0'>
                       <NavBar />
                       <div style={{marginTop:'60px'}}>
                          {children}         
                       </div>
                       {
                           authCategory!='admin' &&
                           <Footer/>
                       }
                    </Col>
                </Row> */}
        </Fragment>
    );
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});
  
export default connect(mapStateToProps, {})(Layout);
  