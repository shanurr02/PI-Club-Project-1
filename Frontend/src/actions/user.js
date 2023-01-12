import React from 'react';
import axios from 'axios';
import {Token} from './auth';

// export const baseUrl='https://meraj-blog.herokuapp.com';
export const baseUrl='http://localhost:5000';


export const  GetAllBlogs=()=> {
  return axios.get(`${baseUrl}/api/posts/all`)
  .then((res) => {
     return res.data;
  })
  .catch((err) =>console.log(err));
};


export const  GetApprovedBlogs=()=> {
  return axios.get(`${baseUrl}/api/posts/approved`)
  .then((res) => {
     return res.data;
  })
  .catch((err) =>console.log(err));
};

export const  GetPost=()=> {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return axios.get(`${baseUrl}/api/posts/admin`,config)
  .then((res) => {
     return res.data;
  })
  .catch((err) =>console.log(err));
};

export const  GetUserPost=()=> {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return axios.get(`${baseUrl}/api/posts/user`,config)
  .then((res) => {
     return res.data;
  })
  .catch((err) =>console.log(err));
};

export const  CreatePost=(post_data)=> {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `auth-token ${Token()}`,
      },
    };
    return axios.post(`${baseUrl}/api/posts/create`,post_data ,config)
    .then((res) => {
      console.log('post seccessfully');
    })
    .catch((err) =>console.log(err));
};

export const  GetPostbyId=(id)=> {
  return  axios.get(`${baseUrl}/api/posts/blogs/${id}`)
   .then((res) => {
     return res.data;
   })
   .catch((err) =>console.log(err));
};

export const allUsers=()=>{
    const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `auth-token ${Token()}`,
        },
      };
    return axios.get(`${baseUrl}/api/posts/allusers`,config).
    then((res)=>{
        console.log(res.data);
        return res.data;
    }).catch((err)=>{
        console.log(err);
    })
}

export const  ChangeStatus=(id)=> {
  var data;
  const config = {
    headers: {
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return axios.put(`${baseUrl}/api/posts/changeStatus/${id}`,data,config)
  .then((res) => {
    console.log("Updated Successfully")
  })
  .catch((err) =>console.log(err));
};


export const  DeletePost=(id)=> {
  const config = {
    headers: {
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return axios.delete(`${baseUrl}/api/posts/delete/${id}`,config)
  .then((res) => {
    console.log("Deleted Successfully")
  })
  .catch((err) =>console.log(err));
};

