import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";
import {  Pagination } from "swiper/modules";
import "swiper/css/pagination";

const Box = ({pages}) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <section className='category box pt-6 pb-4 md:py-5 lg:py-10 xl:py-12  2xl:py-[70px]' >
      <div className="container md:px-8 px-4 xl:px-14 lg:px-10 2xl:px-10 mx-auto">
        {isSmallScreen ? (
          <Swiper
          style={{
            '--swiper-navigation-color': '#007798',
            '--swiper-pagination-color': '#007798',
          }}
            className="mySwiper h-28 "
            modules={[Pagination]}
            pagination={{ clickable: true }}
            loop={true}
            breakpoints={{
              375: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
             
              666: {
                slidesPerView:3 ,
                spaceBetween: 10,
              }            }}
          >
           {pages.categoryLink.map((el,index)=>(
            <SwiperSlide key={index}>
               <Link to={el.link.url} >
                   <div className='bg-white hover:shadow-lg border-blues border-[1px] rounded-lg  items-center h-20 2xl:h-28 flex gap-3 pl-4' 
                  >
      <img src={el.icon.node.sourceUrl} className='w-auto h-auto' alt={el.icon.node.altText} loading='lazy'/>
      <h4 className='text-sm md:text-base font-normal lg:text-lg xl:text-xl 2xl:text-2xl text-black'>{el.link.title}</h4>  
      </div>
      
              </Link>
            </SwiperSlide>
           ))}
            </Swiper>
        ):(
           <div className="grid grid-cols-2  gap-5 xl:gap-5 md:grid-cols-3 lg:grid-cols-5 w-full relative">
           {pages.categoryLink.map((el,index)=>(
                  
               <Link to={el.link.url} key={index}>
                   <div className='bg-white hover:shadow-xl border-[1px] border-blues rounded-lg  items-center  h-20 2xl:h-28 flex gap-3 pl-4' 
                  >
      <img src={el.icon.node.sourceUrl} className='w-auto h-auto' alt={el.icon.node.altText} loading='lazy'/>
      <h4 className='text-sm md:text-base font-normal lg:text-lg xl:text-xl 2xl:text-2xl text-black'>{el.link.title}</h4>  
      </div>
      
              </Link>
           ))}
        
          </div>
        )}
     
      </div>
    </section>
  )
}

export default Box
