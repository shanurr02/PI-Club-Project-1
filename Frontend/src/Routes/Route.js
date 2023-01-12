import React ,{useEffect,useState}from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from 'react-redux';

import PrivateRoute from './PrivateRoute';

// import Signup from '../components/Signup';
import join from '../components/Login';

import AboutUs from '../containers/Home/AboutUs';
import ContactUs from '../containers/Home/ContactUs';

import Hirings  from '../containers/Home/Hirings';
import Applicants from '../containers/User/Applicant';

import Achievements  from '../containers/Home/Achievements';
import Projects from '../containers/Home/Projects';

import AllBlogs from '../containers/Home/Blogs';
import BlogDetails from '../containers/Home/BlogDetails';

import Profile from '../containers/User/Profile';
import Create from '../containers/User/Create';
import AddHirings from '../containers/User/AddHirings';

import AddMember from '../containers/User/AddMember';
import AllStudents from '../containers/User/StudentsProfile';
import Settings from "../containers/User/Settings";

import ChangePassword from "../components/ChangePassword";

function AllRoute({auth}) {

    const {authCategory,isAuthenticated} =auth;

    return (
        <div>
           <Switch>
               <Route path="/join"   component={join} />
               <Route path="/change-password"   component={ChangePassword} />

               <Route path="/about"   component={AboutUs} />
               <Route path="/contact"   component={ContactUs} />

               <Route path="/hirings"   component={Hirings} />

               <Route path="/achievements"   component={Achievements} />
               <Route path="/projects"   component={Projects} />
               <Route path="/blogs"   component={AllBlogs} />
               <Route path="/details"   component={BlogDetails} />

                <PrivateRoute path="/profile"   component={Profile} />
                <PrivateRoute path="/create"   component={Create} />
                
                {
                    (authCategory=='admin' || authCategory=='member') &&
                    <PrivateRoute path="/applicants/:id"   component={Applicants} />
                }
                {
                    authCategory=='admin' &&
                    <>
                        <PrivateRoute path="/add-hirings"   component={AddHirings} />
                        <PrivateRoute path="/all-students"   component={AllStudents} />
                        <PrivateRoute path="/settings"   component={Settings} />
                    </>
                }
           </Switch>
        </div>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, {})(AllRoute);
