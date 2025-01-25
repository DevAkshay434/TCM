import { useQuery } from '@apollo/client';
import React, { lazy, useCallback, Suspense, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GET_PRODUCT } from '../../../../Queries/Queries';
import { TrimSymbol } from '../../../../Component/Currency/TrimSymbol';
import { toast } from 'react-toastify';
import { addToWishlist, addToCart } from '../../../../libs/CartUtils'
const Icons = lazy(() => import('../../../../Component/Icons'));
const QuickView = lazy(() => import('../QuickView/QuickView'));
const FormatCurrency = lazy(() => import('../../../../Component/Currency/FormatCurrency'));
const SkeletonProductCard = () => (
  <div className="flex cursor-pointer flex-col gap-4 bg-gray-200 animate-pulse">
    <div className="h-40 bg-gray-300" />
    <div className="h-6 bg-gray-300" />
    <div className="h-4 bg-gray-300" />
    <div className="flex gap-2">
      <div className="h-8 bg-gray-300 w-1/3" />
      <div className="h-8 bg-gray-300 w-1/3" />
    </div>
  </div>
);
const Product = ({ pages }) => {
  const { loading, error, data } = useQuery(GET_PRODUCT, {
    fetchPolicy: 'cache-and-network', // First load from cache if available
    nextFetchPolicy: 'cache-only',
  });
  const [activeProduct, setActiveProduct] = useState(null);
  const product = data?.products?.edges || [];
  const handleAddToWishlist = useCallback((product) => {
    const wishlistMessage = addToWishlist(product);
    toast.success(wishlistMessage, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }, []);
  const handleAddToCart = useCallback((product) => {
    if (product) {
      const cartMessage = addToCart(product);
      toast.success(cartMessage, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, []);

  if (loading) {
    return (
      <section className='product-card' style={{ backgroundColor: '#F2F6F8' }}>
        <div className="container mx-auto py-6 px-4 md:px-8 xl:px-14 lg:px-10 2xl:px-10">
          <h2 className='text-3xl/[40px] lg:text-4xl/[40px] xl:text-[45px]/[50px] 2xl:text-[53px]/[60px] font-normal text-center'>{pages.title}</h2>
          <div className=" grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-10 my-5 xl:my-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <SkeletonProductCard key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (error) {
    return null;
  }

  return (
    <section className="product-card 2xl:py-[50px] xl:py-8 lg:py-6 py-4" style={{ backgroundColor: '#F2F6F8' }}>
      <div className="container mx-auto md:px-8 px-4 2xl:px-10 lg:px-10 xl:px-14">
        {pages?.title?.length > 0 && (
          <div className="text-center">
            <h3 className="text-sm xl:text-base mb-2">EXPLORE STYLES</h3>
            <h2 className="text-3xl/[40px] lg:text-4xl/[40px] xl:text-[45px]/[50px] 2xl:text-[53px]/[60px] font-normal text-center">
              {pages.title}
            </h2>
          </div>
        )}


        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-10 my-5 xl:my-6">
          {product.slice(0, 8).map((el, index) => {
            const { name, uri, price, slug, averageRating, featuredImage } = el.node;
            const imageUrl = featuredImage?.node?.sourceUrl || '';
            const alt = featuredImage?.node?.altText || '';
            const roundedRating = Math.round(averageRating);
            const duration = 1000 + (index % 4) * 200;
            const delay = Math.min(100 + (index % 4) * 200, 500);

            return (

                <div
                  key={index}
                  className="flex cursor-pointer flex-col gap-4"
                  data-aos="fade-up"
                  data-aos-once="true"
                  data-aos-anchor-placement="top-center"
                  data-aos-delay={delay}
                  data-aos-offset="10"
                  data-aos-duration={duration}
                >
                  <div className="relative group">
              <NavLink to={uri} >

                    <img src={imageUrl} className="group-hover:brightness-90 transition-all duration-200 ease-in z-10" alt={alt} height="900" width="900" />
                    </NavLink>
                    <div className="absolute bottom-[-3%] bg-white left-0 right-0 bg-opacity-100 lg:pt-[15px] lg:pb-[10px] py-[5px] flex justify-center gap-10 lg:gap-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-50 items-center lg:items-start ">
                      <button onClick={(e) => {
                        e.stopPropagation();
                        setActiveProduct(slug);
                      }} className="flex transform transition-transform duration-500 hover:scale-[1.1]">
                        <Suspense fallback={<></>}>
                          <Icons icons="faEye" color="black" Class="h-[15px] w-[15px] lg:h-[20px] lg:w-[20px] hover:text-blues" />
                        </Suspense>
                      </button>

                      <button onClick={(e) =>{e.stopPropagation();
handleAddToCart(el.node)
                      } } className="transform transition-transform duration-500 hover:scale-[1.1]">
                        <Suspense fallback={<></>}>
                          <Icons icons="faShoppingCart" color="black" Class="h-[15px] w-[15px] lg:h-[20px] lg:w-[20px] hover:text-blues" />
                        </Suspense>
                      </button>
                    </div>
                    <div className="absolute top-[6px] right-[6px]">
                      <button onClick={(e) =>{ e.stopPropagation();
                                               handleAddToWishlist(el.node)}} className="flex bg-white rounded-full p-[5px] lg:p-[10px]">
                      <Suspense fallback={<></>}>
                        <Icons icons="faHeart" color='black' Class="h-[15px] w-[15px] lg:h-[20px] lg:w-[20px] hover:text-blues " />
                      </Suspense>
                    </button>
                  </div>
                </div>
                <NavLink to={uri} >

                <div>
                  <p className="text-xs md:text-sm font-normal hover:text-blues lg:text-base xl:text-lg 2xl:text-2xl">
                    {name}
                  </p>
                  <p className="font-normal text-base text-blues">
                    <Suspense fallback={<></>}>
                      <FormatCurrency amountInINR={TrimSymbol(price)} />
                    </Suspense>
                  </p>
                  <div className="flex items-center">
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
                </div>
                </NavLink>

              </div>

        );
          })}

      </div>
      <div className="flex justify-center mb-[3px]">
        <NavLink className="py-[6px] rounded-lg w-32 block h-9 text-center bg-blues text-white" to="/shop">
          View More
        </NavLink>

      </div>
    </div>
     
  
      {
    activeProduct ? (
      <>
        <div
          className="fixed inset-0 z-50 flex justify-center items-center overflow-x-hidden overflow-y-hidden transition-opacity duration-500 ease-out opacity-100"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl transform transition-transform duration-500 ease-out scale-100">
            {/* Content */}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white">
              {/* Header */}
              <div className="flex items-center justify-between py-3 px-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-2xl font-normal">Product Overview</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-55 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setActiveProduct(null)}
                >
                  <span className="text-black">×</span>
                </button>
              </div>
              {/* Body */}
              <div className="relative p-3 flex-auto overflow-hidden">
                <Suspense fallback={<></>}>
                  <QuickView
                    uri={activeProduct}
                    handleAddToCart={handleAddToCart}
                    setActiveProduct={setActiveProduct}
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    ) : null
  }

    </section >
  );
};

export default Product;
