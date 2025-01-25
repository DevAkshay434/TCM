import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
const Carousel = ({ pages }) => {
  
    if (!pages.banner) {
      return <div>No banners available</div>;
    }
  
    return (
      <>
      <section className="carousel">
        <div className="container-fluid" style={{ position: 'relative' }}>
          <Swiper
            slidesPerView={1}
            loop={true}
            spaceBetween={10}
            navigation={true}
            grabCursor={true}
           
            modules={[Navigation]}
            className="mySwiper"
          >
            {pages.banner.map((el, index) => (
              <SwiperSlide key={index} >
                <img src={`${el.bannerImage.node.sourceUrl}`} 
                height="657" 
                width="2560" 
                alt="" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      </>
    );
  };
  

export default Carousel
