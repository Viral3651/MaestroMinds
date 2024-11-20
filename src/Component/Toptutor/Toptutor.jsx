import React from 'react'
import "./Toptutor.css"
import { tutorscard } from '../../data'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GiPartyPopper } from "react-icons/gi";

const Toptutor = () => {
    const settings = {
        infinite: true,
        speed: 50,
        slidesToShow: 4,
        slidesToScroll: 1
      }
    return (
        
      <div className="top-tutors">
        <span className='top'><GiPartyPopper  size={35}/> Top Tutors of the Month <GiPartyPopper size={35}/></span>
      <div className="top-tutors-container">
      {/* <Slider slidesToShow={4} arrowsScroll={1}> */}
      <Slider {...settings}>
        {tutorscard.map((tutor) => (
          <div key={tutor.id} className="tutor-card">
            <div className="tutor-image-container">
              <img src={tutor.img} alt={tutor.user} className="tutor-image" />
            </div>
            <div className="tutor-info-container">
              <p className="tutor-name">{tutor.user}</p>
              <p className="tutor-description">{tutor.desc}</p>
            </div>
          </div>
        ))}
        </Slider>
       {/* </Slider> */}
      </div>
    </div>
    );
  };
  

export default Toptutor