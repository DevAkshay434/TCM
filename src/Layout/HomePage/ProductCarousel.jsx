import React, { lazy, Suspense, useCallback, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination} from 'swiper/modules';
import 'swiper/css/pagination';
import { NavLink } from 'react-router-dom';
import { GET_PRODUCT } from '../../Queries/Queries';
import { TrimSymbol } from '../../Component/Currency/TrimSymbol';
import { addToWishlist, addToCart } from '../../libs/CartUtils';
import { toast } from 'react-toastify';
const Icons = lazy(()=> import('../../Component/Icons'));
const FormatCurrency = lazy(()=> import('../../Component/Currency/FormatCurrency'));

function ProductCarousel() {
  const swiperRef = useRef(null);
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    fetchPolicy:'cache-and-network',
    nextFetchPolicy: 'cache-only',
  });
  const product = data?.products?.edges || [];
  const handleAddToWishlist = useCallback((product) => {
    const wishlistMessage = addToWishlist(product);
    toast.success(wishlistMessage);
  }, []);
  const handleAddToCart = useCallback((product) => {
    if (product) {
      const cartMessage = addToCart(product);
      toast.success(cartMessage);
    }
  }, []);
  if (loading) {
    return null;
  }

  if (error) {
    return null;
  }

  const handleSlideNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext(); // Ensure swiperRef is not null
    }
  };
  return (
    <Swiper
    onSwiper={(swiper)=> {swiperRef.current = swiper}}
      loop={true}
      grabCursor={true}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper h-[283px] sm:h-[265px] lg:h-[380px]  2xl:h-[550px] w-3/4 " 
    >
      {product.slice(0, 4).map((el, index) => {
        const { name, uri, featuredImage, salePrice, averageRating } = el.node;
        const imageUrl = featuredImage?.node?.sourceUrl || '';
        const roundedRating = Math.round(averageRating);
        return (
          <SwiperSlide className="relative h-full poduct-slide" key={index}>
         

            <div  className="relative">
              <div className="flex flex-col items-center justify-center">
                <div className='group'>
                <NavLink className='z-50' to={`${uri}`}>
                <img
                  src={`${imageUrl}`}
                  alt={el.node.featuredImage.node.altText}
                  className="object-cover mx-auto xl:w-60 transform transition-transform duration-500 ease-in group-hover:scale-[1.2] w-1/2 2xl:h-[350px]"
                  height="630"
                  width="630"
                />
                </NavLink>
              <div className="absolute bottom-[24%] left-0 right-0  bg-opacity-60 p-4 flex justify-center gap-2 items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <button onClick={()=> handleAddToWishlist(el.node)} className="flex transform transition-transform duration-500 hover:translate-y-[-10px] bg-gray-100  justify-center item-center  p-3 rounded-full z-50">
                <Suspense fallback={<></>}>
                <Icons icons='faHeart' color="black" Class="h-5 w-5"/>
                </Suspense>
                </button>
                <button onClick={()=> handleAddToCart(el.node)} className="transform transition-transform duration-500 hover:translate-y-[-10px] -mt-3 p-3 flex justify-center item-center rounded-full bg-gray-100">
                <Suspense fallback={<></>}>
                 <Icons icons='faShoppingCart' color="black" Class="h-5 w-5"/>
                 </Suspense>
                </button>
              
                <button onClick={handleSlideNext} className="transform transition-transform duration-500 hover:translate-y-[-10px]   flex justify-center item-center bg-gray-100 p-3 rounded-full">
                <Suspense fallback={<></>}>
                <Icons icons='faAngleRight' color="black" Class="h-5 w-5"/>
                </Suspense>
                </button>
              </div>
              </div>
              <NavLink className='z-50' to={`${uri}`}>
            <div className="text-center mt-2 z-50">
              <p className=" text-xs md:text-sm font-normal hover:text-blues lg:text-base xl:text-lg 2xl:text-2xl transition-all duration-100 ease-linear">{name}</p>
              <span className="text-xs md:text-sm font-normal lg:text-base xl:text-lg 2xl:text-xl text-blues">
              <Suspense fallback={<></>}>
                <FormatCurrency amountInINR={TrimSymbol(salePrice)} />
                </Suspense>
              </span>
            </div>
            <div className="flex justify-center items-center">
                  {/* Render stars based on average rating */}
                  {[...Array(5)].map((_, starIndex) => (
                    <span
                      key={starIndex}
                      className={`star text-2xl ${starIndex < roundedRating ? 'text-yellows' : 'text-rating'}`}
                    >
                      &#9733;
                    </span>
                  ))}
    </div>
    </NavLink>

    </div>
    
    </div>
            
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default ProductCarousel;
