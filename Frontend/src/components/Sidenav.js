import React from 'react';
import './sidebar.css';

import { NavLink } from 'react-router-dom';

const data=[
    {text:"Create",route:'/create'},
    {text:"Add Hirings",route:'/add-hirings'},
    {text:"All Students",route:'/all-students'},
]

const NavStyle={
    textDecoration: 'none', fontWeight: 'bolder',color:'black'
}

function SideNav() {
    return (
        <div className='sidenav-container'>
            <div className='side-nav'>
           {
               data.map((row)=>(
                   <NavLink to={`${row.route}`}style={NavStyle}>
                        <div className='sideNav-Item'>
                            <p className='my-2' style={{whiteSpace:'nowrap'}}>{row.text}</p>
                        </div>
                   </NavLink>
               ))
            }
            </div>
        </div>
    )
}

export default SideNav
