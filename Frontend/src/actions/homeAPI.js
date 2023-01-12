import axios from 'axios';

export const baseUrl='http://localhost:5000';

export const SendContactMessage=(data)=>{
    return axios.post(`${baseUrl}/api/home/sendMessage`,data)
    .then((res)=>{
        return true;
    }).catch((err)=>{
      return false;
    })
} 

export const  GetHomeSlider=()=> {
    return axios.get(`${baseUrl}/api/home/getHomeSlider`)
    .then((res) => {
        return res.data;
    })
    .catch((err) =>console.log(err));
};

export const  GetBlogs=()=> {
  return axios.get(`${baseUrl}/api/home/getBlogs`)
  .then((res) => {
      return res.data;
  })
  .catch((err) =>console.log(err));
};

export const  GetEvents=()=> {
  return axios.get(`${baseUrl}/api/home/getEvents`)
  .then((res) => {
      return res.data;
  })
  .catch((err) =>console.log(err));
};

export const  GetProjects=()=> {
  return axios.get(`${baseUrl}/api/home/getProjects`)
  .then((res) => {
      return res.data;
  })
  .catch((err) =>console.log(err));
};

export const  GetAchievements=()=> {
  return axios.get(`${baseUrl}/api/home/getAchievements`)
  .then((res) => {
      return res.data;
  })
  .catch((err) =>console.log(err));
};

export const  GetLatestBlogs=()=> {
    return axios.get(`${baseUrl}/api/home/getLatestBlogs`)
    .then((res) => {
        return res.data;
    })
    .catch((err) =>console.log(err));
};

export const  GetBlogDetail=(blogId)=> {
    return axios.get(`${baseUrl}/api/home/getBlogDetail/${blogId}`)
    .then((res) => {
        return res.data;
    })
    .catch((err) =>console.log(err));
};
  
export const  GetGalleryImage=()=> {
    return axios.get(`${baseUrl}/api/home/getGallery`)
    .then((res) => {
        console.log("action",res.data);
        return res.data;
    })
    .catch((err) =>console.log(err));
};
  
export const  GetTeamMember=()=> {
    return axios.get(`${baseUrl}/api/home/getTeamMember`)
    .then((res) => {
        console.log("action",res.data);
        return res.data;
    })
    .catch((err) =>console.log(err));
};