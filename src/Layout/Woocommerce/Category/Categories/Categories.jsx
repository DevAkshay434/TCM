import React, { useEffect, useState } from 'react';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/navigation';

const Categories = () => {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth > 992);
    useEffect(() => {
        const handleResize = () => {
          setIsSmallScreen(window.innerWidth > 992);
        };
    
        window.addEventListener("resize", handleResize);
    
       
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);
  return (
    <section className='category-layout p-6 px-8 lg:px-14'>
        <div className="container mx-auto">
        {isSmallScreen ? (
            <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* First column */}
        <div className="relative">
         
          <div className=" h-80 bg-gradient-to-r from-cyan-500 to-blue-500 inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col text-center">
            <h3 className="text-white text-xl font-semibold mb-3">Shop By Category 1</h3>
            <button className=' px-4 py-2 rounded-md hover:bg-green-500 text-white'>Discover More</button>
          </div>
        </div>

        {/* Second column */}

        <div className="relative">
         
          <div className=" h-80 bg-gradient-to-r from-cyan-500 to-blue-500 inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col text-center">
            <h3 className="text-white text-xl font-semibold mb-3">Shop By Category 2</h3>
            <button className='px-4 py-2 rounded-md hover:bg-green-500 text-white'>Discover More</button>
          </div>
        </div>
      </div>
     
</>
        ):(
            <>
            <Swiper
            slidesPerView={1}
            loop={true}
            spaceBetween={10}
            navigation={true}
            grabCursor={true}
            modules={[Navigation]}
            className="mySwiper"
          >
<SwiperSlide>
<div className=" h-40 bg-gradient-to-r from-cyan-500 to-blue-500 inset-0 bg-black bg-opacity-50 flex items-center justify-center flex-col text-center">
            <h3 className="text-white text-xl font-semibold mb-3">Shop By Category 2</h3>
            <button className='px-4 py-2 rounded-md hover:bg-green-500 text-white'>Discover More</button>
          </div>
</SwiperSlide>
          </Swiper>
          </>
        )}
      </div>
    </section>
  );
};

export default Categories;
