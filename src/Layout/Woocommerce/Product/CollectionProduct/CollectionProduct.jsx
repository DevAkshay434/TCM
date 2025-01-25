import { useQuery } from '@apollo/client';
import React, { lazy, useState, useCallback, useEffect, useMemo } from 'react'
import { COLLECTION_PRODUCT } from '../../../../Queries/Queries';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { addToCart, addToWishlist } from '../../../../libs/CartUtils';
import { TrimSymbol } from '../../../../Component/Currency/TrimSymbol';
import QuickView from '../QuickView/QuickView';
const Icons = lazy(() => import('../../../../Component/Icons'));
const SideBar = lazy(() => import('./SideBar'));
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
const CollectionProduct = () => {
  const { uri } = useParams();
  const uriString = useMemo(() => (!uri || String(uri)), [uri]);
  const [selectedCategory, setSelectedCategory] = useState('')
  const { loading, error, data } = useQuery(COLLECTION_PRODUCT, {
    variables: { id: uriString },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-and-network'
  });
  const [sortOrder, setSortOrder] = useState('');
  let product = data?.productCategory?.contentNodes?.edges || [];

  const totalProducts = product.length;
  const [visibleCount, setVisibleCount] = useState(8);
  const [activeProduct, setActiveProduct] = useState(null);
  const [maxValue, setMaxValue] = useState(20000);
  const [minValue, setMinValue] = useState(0);

  product = product.filter(product => {
    const price = TrimSymbol(product.node.price);
    return price >= minValue && price <= maxValue;
  });
  const handlePriceChange = (min, max) => {
    setMinValue(min, 10);
    setMaxValue(max, 10);
  };
  useEffect(() => {
    if (data?.productCategory?.name) {
      setSelectedCategory(data.productCategory.name);
    }
  }, [data])



  const handleAddToWishlist = useCallback((product) => {
    const wishlistMessage = addToWishlist(product);
    toast.success(wishlistMessage,
      {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
  }, []);
  const handleAddToCart = useCallback((product) => {
    if (product) {
      const cartMessage = addToCart(product);
      toast.success(cartMessage
        , {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  }, []);


  useEffect(() => {
    setVisibleCount(8);
  }, []);
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };






  if (loading) {
    return (
      <section className='product-category' >
        <div className="container mx-auto py-6 px-4 md:px-8 xl:px-14 lg:px-10 2xl:px-10">
          <h2 className='text-3xl/[40px] lg:text-4xl/[40px] xl:text-[45px]/[50px] 2xl:text-[53px]/[60px] font-normal text-center'>
            {data?.productCategory?.name}</h2>
          <div className=" grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-10 my-5 xl:my-10">
            {Array.from({ length: 10 }).map((_, index) => (
              <SkeletonProductCard key={index} />
            ))}
          </div>
        </div>
      </section>
    )
  }
  if (error) {
    return <p>{error.message}</p>
  }


  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };
  if (sortOrder) {
    product = product.sort((a, b) => {
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

  return (
    (product.length > 0 ? (
      <section className="product-category relative">
        <div className="container mx-auto py-6 md:px-8 px-4 xl:px-10 lg:px-10 2xl:px-10">
          <h1 className="text-4xl text-center mb-4" >{data?.productCategory?.name}</h1>
          <div className="grid grid-cols-12 gap-8">
            <div className="hidden lg:block lg:col-span-3 ">
              <div className="sticky top-4">
                <SideBar onPriceChange={handlePriceChange} selectedCategory={selectedCategory} />
              </div>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <div className="flex justify-between items-center mb-4">
                <p></p>
                <select value={sortOrder} onChange={handleSortChange} className='bg-transparent border-2 rounded-md p-2 focus:outline-none'>
                  <option >Select</option>
                  <option value="Sort by A-Z">Sort by A-Z</option>
                  <option value="Sort by Z-A">Sort by Z-A</option>
                  <option value="Sort by price: low to high">Sort by price: low to high</option>
                  <option value="Sort by price: high to low">Sort by price: high to low</option>
                </select>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-10 my-5 xl:my-6">
                {product.slice(0, visibleCount).map((el, index) => {
                  const { name, uri, price, averageRating, image, slug } = el.node;
                  const imageUrl = image.sourceUrl || '';
                  const alt = image?.node?.altText || '';
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
                      data-aos-duration={duration}
                    >

                      <div className="relative group">
                        <NavLink to={uri} >

                          <img
                            src={imageUrl}
                            className="group-hover:brightness-90 transition-all duration-200 ease-in z-10"
                            alt={alt}
                          />
                        </NavLink>
                        <div className="absolute bottom-[-3%] bg-white left-0 right-0 bg-opacity-100 lg:pt-[15px] lg:pb-[10px] py-[5px] flex justify-center gap-10 lg:gap-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-50 items-center lg:items-start">
                          <button onClick={() => setActiveProduct(slug)} className="flex transform transition-transform duration-500 hover:scale-[1.1]">
                            <Icons
                              icons="faEye"
                              color="black"
                              Class="h-[15px] w-[15px] lg:h-[20px] lg:w-[20px] hover:text-blues"
                            />
                          </button>

                          <button onClick={() => handleAddToCart(el.node)} className="transform transition-transform duration-500 hover:scale-[1.1]">
                            <Icons
                              icons="faShoppingCart"
                              color="black"
                              Class="h-[15px] w-[15px] lg:h-[20px] lg:w-[20px] hover:text-blues"
                            />
                          </button>
                        </div>
                        <div className="absolute top-[6px] right-[6px]">
                          <button onClick={() => handleAddToWishlist(el.node)} className="flex bg-white rounded-full p-[5px] lg:p-[10px]">
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
                            {/* <FormatCurrency amountInINR={TrimSymbol(price)} />
                             */}
                             {(price)}
                          </p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, starIndex) => (
                              <span
                                key={starIndex}
                                className={`star text-2xl ${starIndex < roundedRating
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
                <div className="flex justify-center mb-[3px]">
                  <button
                    className="py-[6px] rounded-lg w-32 h-9 text-center bg-blues text-white hover:bg-blues-dark transition-colors duration-300"
                    onClick={handleViewMore}
                    aria-label="View more products"
                  >
                    View More
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
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
                    <QuickView uri={activeProduct} handleAddToCart={handleAddToCart} setActiveProduct={setActiveProduct} />
                  </div>
                  {/*footer*/}

                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </section>
    ) : (

      <div>Please add the category</div>
    ))

  )
}

export default CollectionProduct
