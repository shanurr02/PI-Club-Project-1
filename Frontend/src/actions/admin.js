import axios from 'axios';
import {Token} from './auth';

export const baseUrl='http://localhost:5000';

export const  GetContactMessage=()=> {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return axios.get(`${baseUrl}/api/admin/getContactMessage`,config)
  .then((res) => {
      return res.data;
  })
  .catch((err) =>console.log(err));
};

export const  DeleteContactMessage=(id)=> {
  const config = {
    headers: {
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return axios.delete(`${baseUrl}/api/admin/deleteContactMessage/${id}`,config)
  .then((res) => {
    console.log("Deleted Successfully")
  })
  .catch((err) =>console.log(err));
};

export const  AddSkills=(data)=> {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `auth-token ${Token()}`,
      },
    };
    return axios.post(`${baseUrl}/api/admin/addSkills`,data,config)
    .then((res) => {
      console.log('post seccessfully');
    })
    .catch((err) =>console.log(err));
};

export const  GetDesignations=()=> {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return axios.get(`${baseUrl}/api/admin/getDesignations`,config)
  .then((res) => {
      return res.data;
  })
  .catch((err) =>console.log(err));
};

export const  AddDesignation=(data)=> {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `auth-token ${Token()}`,
      },
    };
    return axios.post(`${baseUrl}/api/admin/addDesignation`,data,config)
    .then((res) => {
      console.log('post seccessfully');
    })
    .catch((err) =>console.log(err));
};

export const  DeleteSkill=(id)=> {
    const config = {
      headers: {
        'Authorization': `auth-token ${Token()}`,
      },
    };
    return axios.delete(`${baseUrl}/api/admin/deleteSkill/${id}`,config)
    .then((res) => {
      console.log("Deleted Successfully")
    })
    .catch((err) =>console.log(err));
};
  
export const  DeleteDesignation=(id)=> {
    const config = {
      headers: {
        'Authorization': `auth-token ${Token()}`,
      },
    };
    return axios.delete(`${baseUrl}/api/admin/deleteDesignation/${id}`,config)
    .then((res) => {
      console.log("Deleted Successfully")
    })
    .catch((err) =>console.log(err));
};

export const  AddHirings=(data)=> {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `auth-token ${Token()}`,
      },
    };
    return axios.post(`${baseUrl}/api/admin/addHirings`,data ,config)
    .then((res) => {
      console.log('post seccessfully');
    })
    .catch((err) =>console.log(err));
};
  
export const  DeleteHiring=(id)=> {
    const config = {
      headers: {
        'Authorization': `auth-token ${Token()}`,
      },
    };
    return axios.delete(`${baseUrl}/api/admin/deleteHiring/${id}`,config)
    .then((res) => {
      console.log("Deleted Successfully")
    })
    .catch((err) =>console.log(err));
};

export const  DeletePost=(id)=> {
  const config = {
    headers: {
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return axios.delete(`${baseUrl}/api/admin/deletePost/${id}`,config)
  .then((res) => {
    console.log("Deleted Successfully");
    return true;
  })
  .catch((err) =>{
    return false;
    console.log(err);
  });
};

export const  DeleteGalleryImage=(id)=> {
  const config = {
    headers: {
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return axios.delete(`${baseUrl}/api/admin/deleteGalleryImage/${id}`,config)
  .then((res) => {
    console.log("Deleted Successfully")
  })
  .catch((err) =>console.log(err));
};


export const  GetAllProfile=()=> {
  const config = {
    headers: {
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return axios.get(`${baseUrl}/api/admin/getAllProfile`,config)
  .then((res) => {
      return res.data;
  })
  .catch((err) =>console.log(err));
};

export const  ChangeMember=(data,profileId)=> {
  const config = {
    headers: {
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return axios.patch(`${baseUrl}/api/admin/makeMember/${profileId}`,data,config)
  .then((res) => {
    console.log("Updated Successfully")
  })
  .catch((err) =>console.log(err));
};

export const  RemoveMember=(profileId)=> {
  const config = {
    headers: {
      'Authorization': `auth-token ${Token()}`,
    },
  };
  return axios.patch(`${baseUrl}/api/admin/removeMember/${profileId}`,{},config)
  .then((res) => {
    console.log("Removed Successfully")
  })
  .catch((err) =>console.log(err));
};