import { useQuery } from '@apollo/client';
import React, { lazy, useState, useEffect, useCallback, Suspense } from 'react';
import { NavLink } from 'react-router-dom';
import { GET_PRODUCT, FILTER_PRODUCT } from '../../../../Queries/Queries';
import { TrimSymbol } from '../../../../Component/Currency/TrimSymbol';
import FormatCurrency from '../../../../Component/Currency/FormatCurrency';
import { addToCart, addToWishlist } from '../../../../libs/CartUtils';
import { toast } from 'react-toastify';
import Icons from '../../../../Component/Icons';
const QuickView = lazy(() => import('../QuickView/QuickView'));
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
const Product = ({ sortOrder, pages,minPrice, maxPrice, selectedCategory }) => {
  const { loading, error, data } = useQuery(
    selectedCategory ? FILTER_PRODUCT : GET_PRODUCT, 
    {
      variables: selectedCategory ? { id: selectedCategory } : {},
      skip: !selectedCategory && !GET_PRODUCT, // Don't skip if it's fetching all products
      fetchPolicy: 'cache-first',
      nextFetchPolicy: 'cache-and-network',
    }
  );
  const [sortedProducts, setSortedProducts] = useState([]);

  useEffect(() => {
    if (data) {
      let products = selectedCategory
        ? data?.productCategory?.contentNodes?.edges || []
        : data?.products?.edges || [];

      // Filter by price
      products = products.filter(product => {
        const price = TrimSymbol(product.node.price);
        return price >= minPrice && price <= maxPrice;
      });

      // Sort products based on sortOrder
      if (sortOrder) {
        products = products.sort((a, b) => {
          const nameA = a.node.name.toUpperCase();
          const nameB = b.node.name.toUpperCase();
          const priceA = TrimSymbol(a.node.price);
          const priceB = TrimSymbol(b.node.price);

          if (sortOrder === 'Sort by A-Z') return nameA < nameB ? -1 : 1;
          if (sortOrder === 'Sort by Z-A') return nameA > nameB ? -1 : 1;
          if (sortOrder === 'Sort by price: low to high') return priceA - priceB;
          if (sortOrder === 'Sort by price: high to low') return priceB - priceA;
          return 0;
        });
      }

      setSortedProducts(products);
    }
  }, [data, minPrice, maxPrice, sortOrder, selectedCategory]);
     
   
    
  const handleAddToWishlist = useCallback((sortedProducts) => {
    const wishlistMessage = addToWishlist(sortedProducts);
    toast.success(wishlistMessage,  {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }, []);
  const handleAddToCart = useCallback((sortedProducts) => {
    if (sortedProducts) {
      const cartMessage = addToCart(sortedProducts);
      toast.success(cartMessage,  {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, []);
  const [visibleCount, setVisibleCount] = useState(8);
const [activeProduct, setActiveProduct]= useState(null);
  useEffect(() => {
    setVisibleCount(8);
  }, []);

  if (loading) {
      return(
        <div className="container mx-auto py-6 px-4 md:px-8 xl:px-14 lg:px-10 2xl:px-10">
            <h2 className='text-3xl/[40px] lg:text-4xl/[40px] xl:text-[45px]/[50px] 2xl:text-[53px]/[60px] font-normal text-center'>
            {data?.productCategory?.name}</h2>
            <div className=" grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-10 my-5 xl:my-10">
                {Array.from({ length: 10 }).map((_, index) => (
                     <SkeletonProductCard key={index} />
                ))}
            </div>
        </div>
      )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-10 text-red-500">
        Failed to load products. Please try again later.
      </div>
    );
  }
  

  const totalProducts = sortedProducts.length;

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-10 my-5 xl:my-6">
        {sortedProducts.slice(0, visibleCount).map((el, index) => {
          const { name, uri, price, averageRating, featuredImage , slug} = el.node;
          const imageUrl = featuredImage?.node?.sourceUrl || '';
          const alt = featuredImage?.node?.altText || '';
          const roundedRating = Math.round(averageRating);
          const duration = 1000 + (index % 4) * 200;
          const delay = Math.min(100 + (index % 4) * 200, 500);
          return (

              <div className="flex cursor-pointer flex-col gap-4"
              key={index}
               data-aos="fade-up"
               data-aos-once="true"
               data-aos-anchor-placement="top-center"
               data-aos-delay={delay}
               data-aos-duration={duration}>
                <div className="relative group">
            <NavLink to={uri} >

                  <img
                    src={imageUrl}
                    className="group-hover:brightness-90 transition-all duration-200 ease-in z-10"
                    alt={alt}
                  />
                  </NavLink>
                  <div className="absolute bottom-[-3%] bg-white left-0 right-0 bg-opacity-100 lg:pt-[15px] lg:pb-[10px] py-[5px] flex justify-center gap-10 lg:gap-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-50 items-center lg:items-start">
                    <button onClick={()=> setActiveProduct(slug)} className="flex transform transition-transform duration-500 hover:scale-[1.1]">
                      <Icons
                        icons="faEye"
                        color="black"
                        Class="h-[15px] w-[15px] lg:h-[20px] lg:w-[20px] hover:text-blues"
                      />
                    </button>

                    <button onClick={()=> handleAddToCart(el.node)} className="transform transition-transform duration-500 hover:scale-[1.1]">
                      <Icons
                        icons="faShoppingCart"
                        color="black"
                        Class="h-[15px] w-[15px] lg:h-[20px] lg:w-[20px] hover:text-blues"
                      />
                    </button>
                  </div>
                  <div className="absolute top-[6px] right-[6px]">
                    <button onClick={()=> handleAddToWishlist(el.node)} className="flex bg-white rounded-full p-[5px] lg:p-[10px]">
                      <Icons
                        icons="faHeart"
                        color="black"
                        Class="h-[15px] w-[15px] lg:h-[20px] lg:w-[20px] hover:text-blues"
                      />
                    </button>
                  </div>
                </div>
                <NavLink to={uri} >

                <div>
                  <p className="text-xs md:text-sm font-normal hover:text-blues lg:text-base xl:text-lg 2xl:text-2xl">
                    {name}
                  </p>
                  <p className="font-normal text-base text-blues">
                    <FormatCurrency amountInINR={TrimSymbol(price)} />
                  </p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, starIndex) => (
                      <span
                        key={starIndex}
                        className={`star text-2xl ${
                          starIndex < roundedRating
                            ? 'text-yellows'
                            : 'text-rating'
                        }`}
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

      {visibleCount < totalProducts && (
        <div className="flex justify-center mb-[3px] ">
          <button
            className="py-[6px] rounded-lg w-32 h-9 text-center bg-blues text-white hover:bg-blues-dark transition-colors duration-300"
            onClick={handleViewMore}
            aria-label="View more products"
          >
            View More
          </button>
        </div>
      )}
      {activeProduct ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-normal">
                    Product Overview
                  </h3>
                  <button
              className="p-1 ml-auto bg-transparent border-0 text-black opacity-55 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              onClick={() => setActiveProduct(null)}
            >
              <span className="text-black">×</span>
            </button>
                </div>
                {/*body*/}
                <div className="relative p-3 flex-auto overflow-hidden">
                  <Suspense fallback={<></>}>
                  <QuickView uri={activeProduct} handleAddToCart={handleAddToCart} setActiveProduct={setActiveProduct}/>
                  </Suspense>
                </div>
                {/*footer*/}
                
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Product;

