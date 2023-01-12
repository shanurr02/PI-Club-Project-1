import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import '../style.css';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

import {GetHomeSlider} from '../../../actions/homeAPI';
import {baseURL} from '../../../config/config';
import SpinnerComponent from '../../Spinner';


const settings = {
  className: "center",
  centerMode: true,
  infinite: true,
  slidesToShow: 3,
  speed: 500,
  autoplay: true,
  dots: true,
  infinite: true,
  responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
};


function HeaderCarousel() {

  const [loading, setloading] = useState(true);


  const blogs=[
    'https://cdn.pixabay.com/photo/2022/01/15/02/07/windows-6938478_960_720.jpg',
    'https://cdn.pixabay.com/photo/2022/01/10/15/29/wind-mills-6928590_960_720.jpg',
    'https://cdn.pixabay.com/photo/2021/12/24/17/14/nature-6891549_960_720.jpg',
    'https://cdn.pixabay.com/photo/2021/10/07/15/12/wine-6688901_960_720.jpg'
  ]

  const [allSlider,setAllSlider]=useState([]);
   
  useEffect(()=>{
    GetHomeSlider().then((data)=>{
          console.log("Home Slider",data);
          if(data){
            setAllSlider(data);
            setloading(false);
          }
      })
  },[]);

 
  
    return (
        <div className='carouselContainer'>
           { loading ?
           <SpinnerComponent/>:
             <Container className='py-4' fluid>
                <div>
                    <Slider {...settings}>
                        {
                            allSlider.map((row)=>(
                            <div class="bg-container p-4">
                              <img  src={`${baseURL}/images/${row.image}`} 
                                id='imageID' alt="Notebook" style={{width:'100%',height:'40vh'}}/>
                              <div class="bg-content">
                                <section   style={{height:'110px',overflow:'hidden'}}>
                                  <div className='pt-2 pb-4' style={{width:'100%'}}>
                                    <p>{row.description}</p>
                                  </div>
                                </section>
                              </div>
                            </div>
                           ))
                        }
                    </Slider>
                </div>
            </Container>
          }
        </div>
    )
}

export default HeaderCarousel;

{/* <div className='p-4 '>
<img    src={row}
// src={`${baseUrl}/images/${row.image}`}
    style={{ height: '40vh', width: '100%' }}
/>
</div> */}
