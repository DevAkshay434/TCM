import React from 'react'

const ProductList = () => {
  return (
    <>
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
                            <FormatCurrency amountInINR={TrimSymbol(price)} />
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

        
    </>
                
  )
}

export default ProductList
