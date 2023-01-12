import axios from 'axios';
import {Token} from './auth';
// export const baseUrl='https://meraj-blog.herokuapp.com';
export const baseUrl='http://localhost:5000';


export const  GetUserProfile=()=> {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return axios.get(`${baseUrl}/api/common/getUserProfile`,config)
  .then((res) => {
      return res.data;
  })
  .catch((err) =>console.log(err));
};

export const  UpdateUserProfile=(data)=> {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return axios.put(`${baseUrl}/api/common/updateProfile`,data,config)
  .then((res) => {
      return true;
  })
  .catch((err) =>{
    console.log(err);
    return false;
  });
};

export const  GetGalleryImages=()=> {
  return axios.get(`${baseUrl}/api/common/getGalleryImages`)
  .then((res) => {
      return res.data;
  })
  .catch((err) =>console.log(err));
};

export const  GetSkills=()=> {
    return axios.get(`${baseUrl}/api/common/getSkills`)
    .then((res) => {
        return res.data;
    })
    .catch((err) =>console.log(err));
};

export const  GetHirings=()=> {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return axios.get(`${baseUrl}/api/common/getHirings`,config)
  .then((res) => {
      return res.data;
  })
  .catch((err) =>console.log(err));
};

export const  ApplyingHirings=(hiringId)=> {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return axios.put(`${baseUrl}/api/common/applyHirings/${hiringId}`,{},config)
  .then((res) => {
      return true;
  })
  .catch((err) =>{
    console.log(err);
    return false;
  });
};


export const  GetApplicantDetails=(hiringId)=> {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return axios.get(`${baseUrl}/api/common/getApplicantDetail/${hiringId}`,config)
  .then((res) => {
      return res.data;
  })
  .catch((err) =>{
    console.log(err);
    return false;
  });
};


export const  CreatePost=(post_data)=> {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return axios.post(`${baseUrl}/api/common/createPost`,post_data ,config)
  .then((res) => {
    console.log('post seccessfully');
  })
  .catch((err) =>console.log(err));
};

export const  AddGalleryImage=(post_data)=> {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return axios.post(`${baseUrl}/api/common/addGalleryImage`,post_data ,config)
  .then((res) => {
    console.log('post seccessfully');
  })
  .catch((err) =>console.log(err));
};