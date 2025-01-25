import React, { useState , useEffect, useRef} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export default function Carousel({ product }) {
  const prevRef = useRef(null);
    const nextRef = useRef(null);
    const swiperRef = useRef(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (index) => {
    setActiveIndex(index);
    setIsModalOpen(true);
  };
  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
        swiperRef.current.params.navigation.prevEl = prevRef.current;
        swiperRef.current.params.navigation.nextEl = nextRef.current;
        swiperRef.current.navigation.init();
        swiperRef.current.navigation.update();
    }
}, []);

const handlePrevClick = () => {
    if (swiperRef.current) {
        swiperRef.current.slidePrev();
    }
};

const handleNextClick = () => {
    if (swiperRef.current) {
        swiperRef.current.slideNext();
    }
};
  const closeModal = () => {
    setIsModalOpen(false);
  };
 
  return (
    <>
      <Swiper
        style={{
          '--swiper-navigation-color': '#007798',
          '--swiper-pagination-color': '#007798',
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 md:h-[382px] h-[250px] w-full"
      >
        <SwiperSlide onClick={() => handleImageClick(0)}>
          <img
            src={product.featuredImage.node.sourceUrl}
            alt={product.featuredImage.node.altText}
            loading="lazy"
            className="md:h-[320px] md:w-[278px] h-[200px] w-[200px] mx-auto cursor-zoom-in"
          />
        </SwiperSlide>
        {product?.galleryImages?.edges?.length > 0 &&
          product.galleryImages.edges.map((image, index) => (
            <SwiperSlide key={index} onClick={() => handleImageClick(index + 1)}>
              <img
                src={image.node.sourceUrl}
                loading="lazy"
                className="md:h-[320px] md:w-[278px] h-[200px] w-[200px] mx-auto cursor-zoom-in"
                alt={image.node.altText}
              />
            </SwiperSlide>
          ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={5}
        slidesPerView={3}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper w-56 mx-auto"
      >
        <SwiperSlide>
          <img
            src={product.featuredImage.node.sourceUrl}
            alt={product.featuredImage.node.altText}
            loading="lazy"
            className={`h-20 mx-auto border-2 transition duration-300 ease-in-out ${activeIndex === 0 ? 'border-blues' : 'border-transparent hover:border-blues'}`}
          />
        </SwiperSlide>
        {product?.galleryImages?.edges?.length > 0 &&
          product.galleryImages.edges.map((image, index) => (
            <SwiperSlide className="cursor-pointer" key={index}>
              <img
                src={image.node.sourceUrl}
                loading="lazy"
                className={`h-20 mx-auto border-2 transition duration-300 ease-in-out ${activeIndex === index + 1 ? 'border-blues' : 'border-transparent hover:border-blues'}`}
                alt={image.node.altText}
              />
            </SwiperSlide>
          ))}
      </Swiper>

      {isModalOpen && (
           <div className={`fixed inset-0 flex items-center justify-center bg-white z-50 transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0'}`}>
          <div className="relative transition-transform duration-300 transform scale-100 max-w-full max-h-full">
            <button onClick={closeModal} className="absolute bottom-10 left-[45%]  rounded-full hover:scale-105 transition-all ease-in text-blues border-[0.4px] z-[99] w-12 h-12 md:w-16 md:h-16  bg-white text-base lg:text-2xl flex items-center justify-center">✖</button>
            <Swiper
              initialSlide={activeIndex}
              spaceBetween={50}
              navigation={false}
              modules={[ Navigation]}
              className="zoomedSwiper"
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
              <SwiperSlide>
                <img
                onClick={closeModal}
                  src={product.featuredImage.node.sourceUrl}
                  alt={product.featuredImage.node.altText}
                  loading="lazy"
                  className="max-w-full  mx-auto max-h-screen object-contain transform scale-125 transition-transform duration-300 cursor-zoom-out"
                />
              </SwiperSlide>
              {product?.galleryImages?.edges?.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                  onClick={closeModal}
                    src={image.node.sourceUrl}
                    loading="lazy"
                    className="max-w-full  mx-auto max-h-screen object-contain transform scale-125 transition-transform duration-300 cursor-zoom-out"
                    alt={image.node.altText}
                  />
                </SwiperSlide>
              ))}
               <button className="absolute bottom-10 left-[32.5%] md:left-[37%] xl:left-[40.5%] lg:left-[44.5%] z-10 text-blues bg-white border-[0.5px] hover:scale-105 transition-all ease-in  rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"     disabled={activeIndex === 0}  onClick={handlePrevClick} >
                ❮
              </button>
              <button className="absolute bottom-10  border-[0.5px]  hover:scale-105 transition-all ease-in  right-[30%] md:right-[37%] lg:right-[38.5%] xl:right-[45.5%] z-10 text-blues bg-white flex rounded-full w-10 h-10 md:w-12 md:h-12 items-center justify-center"     disabled={activeIndex === product.galleryImages.edges.length}  onClick={handleNextClick} >
                ❯
              </button>
            </Swiper>
           
          </div>
        </div>
      )}


    </>
  );
}
