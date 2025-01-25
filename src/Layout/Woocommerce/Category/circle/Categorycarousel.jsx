import { useQuery } from '@apollo/client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { NavLink } from 'react-router-dom';
import { GET_COLLECTION } from '../../../../Queries/Queries';

const Categorycarousel = ({ pages }) => {
    const { loading, error, data } = useQuery(GET_COLLECTION
        ,{
            fetchPolicy: 'cache-first',
        nextFetchPolicy: 'cache-and-network'
        }
    );

    if (loading) {
        // Render skeleton loader while loading data
        return (
            <section className='shop-categories'>
                <div className="container mx-auto py-6 px-4 md:px-8 xl:px-14 lg:px-10 2xl:px-10">
                    <h2 className='text-3xl/[40px] lg:text-4xl/[40px] xl:text-[45px]/[50px] 2xl:text-[53px]/[60px] font-normal text-center'>{pages.title}</h2>

                    <div className="flex space-x-4 overflow-x-auto mt-4">
                    <Swiper
                    loop={false}
                 breakpoints={{
                    375:{
                        slidesPerView:3.5,
                        spaceBetween: 10,
                    },
                    567:{
                        slidesPerView:5,
                        spaceBetween: 10,
                    },
                    768:{
                        slidesPerView:6,
                        spaceBetween: 10,
                    },
                    1024:{
                        slidesPerView:7,
                        spaceBetween: 10,
                    },
                    1280:{
                        slidesPerView:8,
                        spaceBetween: 10,
                    },
                    1400:{
                        slidesPerView:9,
                        spaceBetween: 10,
                    },
                 }}
                    grabCursor={true}
                        autoplay={{
                            delay: 1000,
                            disableOnInteraction: false,
                          }}
                     
                    modules={[Autoplay]}
                    className="mySwiper"
                >
                        {Array.from({ length: 10 }).map((_, index) => (
                             <SwiperSlide key={index} >
                            <div  className='bg-gray-200 rounded-full w-24 h-24 animate-pulse'></div>
                            </SwiperSlide>
                        ))}
                        </Swiper>
                    </div>
                </div>
            </section>
        );
    }
    if (error) {
        return null;
    }
    if (error) {
        return null;
    }

    const category = data?.productCategories?.edges || [];

    return (
        <section className='shop-categories'>
            <div className="container mx-auto py-6  px-4 md:px-8 xl:px-14 lg:px-10 2xl:px-10  ">
                <h2 className='text-3xl/[40px] lg:text-4xl/[40px] xl:text-[45px]/[50px] 2xl:text-[53px]/[60px] font-normal text-center'>{pages.title}</h2>
                <Swiper
                 breakpoints={{
                    375:{
                        slidesPerView:3.5,
                        spaceBetween: 10,
                    },
                    567:{
                        slidesPerView:5,
                        spaceBetween: 10,
                    },
                    768:{
                        slidesPerView:6,
                        spaceBetween: 10,
                    },
                    1024:{
                        slidesPerView:7,
                        spaceBetween: 10,
                    },
                    1280:{
                        slidesPerView:8,
                        spaceBetween: 10,
                    },
                    1400:{
                        slidesPerView:9,
                        spaceBetween: 10,
                    },
                 }}
                    grabCursor={true}
                        autoplay={{
                            delay: 1000,
                            disableOnInteraction: false,
                          }}
                     loop={true}
                    modules={[Autoplay]}
                    className="mySwiper"
                >
                    {category.slice(1, 17).map((el, index) => (
                        <SwiperSlide key={index} >
                            <NavLink to={`${el.node.uri}`} className='flex flex-col items-center justify-end gap-2  py-[20px]' data-aos="zoom-in"
                            data-aos-offset='-100'   data-aos-easing='ease-in-sine'
                        data-aos-once="true">
                                <img src={el.node.image.sourceUrl} alt={el.node.name} className=' swiper-lazy rounded-full w-auto h-24 lg:h-28 xl:h-30 2xl:h-36 2xl:mb-2 mb-1'  height="500" width="500" loading="lazy"/>
                                <p className='text-sm md:text-base  text-center 2xl:text-xl font-normal'>{el.node.name}</p>
                            </NavLink>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}

export default Categorycarousel;
