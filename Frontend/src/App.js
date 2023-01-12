import React, { Component,useEffect,useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'leaflet/dist/leaflet.css';

import Routes from './Routes/Route';
import Home from './containers/Home/Home';

import { Provider } from 'react-redux';
import store from './store';
import {loadUser} from './actions/auth';
import Layout from './Routes/Layout';

function App() {

  useEffect(() => {
    store.dispatch(loadUser());    
  }, []);


  return (
    <>
    <Provider store={store}>
      <Router>
          <Layout >
             <Route path="/"             component={Home} exact/>
             <Route component={Routes} />
            </Layout>
        </Router>
      </Provider>

    </>
  );
}
export default App;
