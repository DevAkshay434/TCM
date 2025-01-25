import React from 'react'
import { GET_PRODUCT } from '../../../../Queries/Queries';
import { useQuery } from '@apollo/client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import Card from '../../../../Component/Card';

const ProductCar = ({title,pages}) => {
    const {loading, error, data } = useQuery(GET_PRODUCT,
      {
       fetchPolicy: 'cache-first',
        nextFetchPolicy: 'cache-and-network'
      }
    );
  if(loading) {
      return null;
  }
  if(error) {
      return null;
  }
  const product = data.products?.edges ||[];
  return (
    <section className='product-carousel '>
       <div className="container mx-auto ">
       <div className='mb-5 lg:md-10'>
        {pages?.title ? (
          <h2 className='text-4xl text-center  font-semibold'>{pages.title}</h2>

        ): title? (
          <h2 className='text-4xl font-semibold'>{title}</h2>

        ): null}
        </div>
        <Swiper
            slidesPerView={2}
            breakpoints={{
              375: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              567: {
                slidesPerView: 3,
                spaceBetween:10,
              },
667 :{
  slidesPerView: 4,
  spaceBetween:10,
}
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            grabCursor={true}
            modules={[Navigation]}
            className="mySwiper"
          >
            {product.slice(1,5).map((el, index) => {
            const { name, uri, featuredImage, regularPrice,salePrice } = el.node;
            const imageUrl = featuredImage?.node?.sourceUrl || ''; // Null-checking image URL

            return (
                <SwiperSlide  key={index}  >
              <Card
                title={name} 
                url={uri} 
                Image={imageUrl} 
                Price={regularPrice}
                salePrice={salePrice}
                imgclass="w-5/6 h-full  mb-2 mx-auto lg:w-full lg:mx-0"
              />
              </SwiperSlide>
            );
          })}
          </Swiper>
        </div>
        </section>
  )
}

export default ProductCar
