// Navbar.jsx
import React, { useEffect, useState } from 'react';
import '../Header.css';
import Cookies from 'js-cookie';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../Context/useAuth';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_COLL, SEARCH_QUERY } from '../../../Queries/Queries';
import Icons from '../../../Component/Icons';

const Navbar = ({ navbar, logo }) => {
  const [show, setShow] = useState(false);
  const { isLoggedIn, userDetails } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchCollections, setSearchCollections] = useState([]);

  const [searchPages, { loading: searchLoading, data: searchData }] = useLazyQuery(SEARCH_QUERY, {
    variables: { search: searchTerm },
    skip: !searchTerm, // Skip query if searchTerm is empty
  });
  const [searchCollectionsQuery, { loading: Load, data: Data }] = useLazyQuery(SEARCH_COLL, {
    variables: { search: searchTerm },
    skip: !searchTerm, // Skip query if searchTerm is empty
  });
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSearchCollections([])
    if (value) {
      searchPages();
      searchCollectionsQuery();
    } else {
      setSearchResults([]);
      setSearchCollections([]) // Clear results if search term is empty
    }
  };
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        searchPages();
        searchCollectionsQuery();
      } else {
        setSearchResults([]);
        setSearchCollections([]);
      }
    }, 300); // 300ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, searchCollectionsQuery, searchPages]);

  useEffect(() => {
    if (searchData && searchData.products) {
      setSearchResults(searchData.products.edges);
    }
    if (Data && Data?.productCategories) {
      setSearchCollections(Data.productCategories.edges)
    }
  }, [searchData, Data]);

  useEffect(() => {
    const fetchCartItems = () => {
      const cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
      setCartItems(cart.length);
    };

    fetchCartItems();

    const handleStorageChange = () => {
      fetchCartItems();
    };

    window.addEventListener('cartUpdated', handleStorageChange);
    return () => window.removeEventListener('cartUpdated', handleStorageChange);
  }, []);
  const handleResultClick = (node) => {
    setSearchResults([]);
    setSearchTerm('');
    setSearchCollections([]);
  }

  return (
    <>
      <nav className='w-full bg-white text-black'>
        <div className="container mx-auto md:px-8 xl:px-14 px-4 lg:px-10 2xl:px-10">
          <div className="flex items-center justify-between lg:justify-noraml py-[10px] 2xl:py-[12px]">
            <div className="flex gap-8 lg:gap-24 md:justify-between 2xl:gap-32 lg:justify-normal lg:w-auto xl:gap-24 md:w-full items-center">
              <NavLink to="/" >

                {logo?.logo?.node?.sourceUrl ? (
                  <img className="md:w-72 md:h-8 w-44 h-6" src={logo.logo.node.sourceUrl} alt={logo.logo.node.altText} loading='lazy' />
                ) : (
                  <h3 className='font-bold text-2xl md:text-4xl 2xl:text-5xl navbar-logo'>The Cricket Mohali</h3>
                )}

              </NavLink>
              <div className="lg:flex relative hidden rounded-md border-blues border-2">
                <form className="relative flex items-center">
                  <input
                    className="w-44 md:w-80 lg:w-[22rem] xl:w-[33rem] rounded-md p-2 h-[30px] focus:ring-none focus:outline-none text-sm lg:text-sm font-normal"
                    type="text"
                    placeholder="Search Your Product"
                    value={searchTerm} // Bind searchTerm to input
                    onChange={handleSearchChange} // Handle input change
                  />
                  <button
                    type="button"
                    aria-label="Toggle search"
                    className="absolute w-20 h-[30px] rounded-r-md bg-blues text-white md:right-0 lg:right-[-2px] right-0 text-sm font-normal"
                    onClick={() => searchTerm && searchPages()} // Trigger search on button click
                  >
                    Search
                  </button>
                </form>

             
            {(searchResults?.length > 0 || searchCollections?.length > 0) && searchTerm?.length > 0 && (
              <div className="absolute  -right-24 top-[27px] w-[700px] transition-all duration-200 ease-in bg-white border z-50 overflow-y-scroll h-[300px] scroll-thin border-gray-300 mt-1">
                <div className="grid grid-cols-12">
                  <div className="col-span-4  border-r-gray-100 border-r-[2px]">
                    <div className="sticky top-0">
                      <div className="border-b-gray-100 border-b-[1px]">
                        <h3 className="text-lg pl-4 py-2 ">COLLECTION</h3>
                      </div>
                      {searchCollections.length > 0 && searchTerm?.length > 0 ? (
                        <>
                          {searchCollections.map((node, itx) => (
                            <NavLink key={itx} to={`/product-category/${node.node.slug}`} className="block p-2 hover:bg-gray-100"
                              onClick={() => handleResultClick(node)}>
                              <div className="flex items-center flex-row gap-4">

                                <p> {node.node.name}</p>
                              </div>

                            </NavLink>
                          ))}
                        </>

                      ) : (
                        <p>No Collection Found</p>
                      )
                      }


                    </div>
                  </div>
                  <div className="col-span-8">
                    <div className="border-b-gray-100 border-b-[1px]">
                      <h3 className="text-lg pl-4 py-2">PRODUCTS</h3>
                    </div>
                    {searchResults.length > 0 && searchTerm?.length > 0 ? (
                      <>
                        {searchResults.map(({ node }) => (
                          <>

                            <NavLink key={node.id} to={`/product/${node.slug}`} className="block p-2 hover:bg-gray-100"
                              onClick={() => handleResultClick(node)}>
                              <div className="flex items-center flex-row gap-4">
                                <img src={node.featuredImage.node.sourceUrl} className="w-20 h-20" alt={node.featuredImage.node.altText} title={node.featuredImage.node.title} />
                                <p> {node.name}</p>
                              </div>

                            </NavLink>
                          </>
                        ))}
                      </>) : (
                      <p>No Product Found</p>
                    )
                    }
                  </div>
                </div>
              </div>
            )}
             </div>
             </div>
            <div className="lg:flex hidden items-center gap-4 ml-auto">
              {navbar.slice(0, 1).map((el, index) => (
                <div className="flex items-center gap-2" key={index}>
                  <img src={el.icon.node.sourceUrl} className='h-6' alt={el.icon.node.altText} height="22" width="20" />
                  <div className='flex flex-col '>
                    <p className='text-sm font-normal text-gray-400'>Your Account</p>
                    {isLoggedIn && userDetails ? (
                      <NavLink to="/my-account" className='font-normal text-sm  
              2xl:text-base'>Hi: {userDetails.username}</NavLink>
                    ) : (
                      <NavLink to="/login" className="font-medium text-sm">Login</NavLink>
                    )}
                  </div>
                </div>
              ))}

              {navbar.slice(2, 5).map((el, index) => (
                <NavLink key={index} to="/cart" className='gap-3 inline-flex items-center'>
                  <div className="relative">

                    <img src={el.icon.node.sourceUrl} className='h-7' alt={el.icon.node.altText} height="22" width="26" />
                    <span className="sr-only">cart</span>
                    <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-normal text-white bg-blues border-2 border-white rounded-full -top-[6px] -end-[6px] ">{cartItems}</div>
                  </div>
                  <div>
                    <p className='text-sm font-normal text-gray-400'>Your Cart</p>
                  </div>
                </NavLink>
              ))}
            </div>

            <div className="lg:hidden flex items-center gap-2">
              <button onClick={() => setShow(!show)} className='text-2xl lg:text-4xl pl-auto focus:outline-none'>
                <Icons icons='faSearch' color='black' Class='h-10 w-10' />
              </button>
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-2xl lg:text-4xl focus:outline-none">
                &#8801;
              </button>
            </div>
          </div>
        </div>
      </nav>
      {show && (
        <div className="fixed inset-0 z-50  flex justify-center top-0 gap-4" style={{backgroundColor:'rgba(230, 230, 230, .6)'}}>
         <div>
          <form className="relative flex mt-2 justify-center w-full">
            <input
              className="w-60 border-[1px] lg:w-[22rem] rounded-md p-2 h-[30px] focus:ring-none focus:outline-none text-sm lg:text-sm font-normal"
              type="text"
              placeholder="Search Your Product"
              value={searchTerm} // Bind searchTerm to input
              onChange={handleSearchChange} // Handle input change
            />
            <button
              type="button"
              className="absolute w-20 h-[30px] rounded-r-md bg-blues text-white right-0 text-sm font-normal"
              onClick={() => searchTerm && searchPages()} // Trigger search on button click
            >
              Search
            </button>
          </form>
          {(searchResults?.length > 0 || searchCollections?.length > 0) && searchTerm?.length > 0 && (
              <div className="absolute  right-12 top-[34px] w-[300px] transition-all duration-200 ease-in bg-white border z-50 overflow-y-scroll h-[300px] scroll-thin border-gray-300 mt-1">
                <div className="grid">
                  
                  <div className="w-full  border-b-gray-100 border-r-[2px]">
                    <div className="border-b-gray-100 border-b-[1px]">
                      <h3 className="text-base pl-4 py-2">PRODUCTS</h3>
                    </div>
                    {searchResults.length > 0 && searchTerm?.length > 0 ? (
                      <>
                        {searchResults.map(({ node }) => (
                          <>

                            <NavLink key={node.id} to={`/product/${node.slug}`} className="block p-2 hover:bg-gray-100"
                              onClick={() => handleResultClick(node)}>
                              <div className="flex items-center flex-row gap-4">
                                <img src={node.featuredImage.node.sourceUrl} className="w-20 h-20" alt={node.featuredImage.node.altText} title={node.featuredImage.node.title} />
                                <p className='text-sm'> {node.name}</p>
                              </div>

                            </NavLink>
                          </>
                        ))}
                      </>) : (
                      <p className='text-sm'>No Product Found</p>
                    )
                    }
                  </div>
                  <div className="">
                    <div className="sticky top-0">
                      <div className="border-b-gray-100  border-b-[1px]">
                        <h3 className="text-base pl-4 py-2 ">COLLECTION</h3>
                      </div>
                      {searchCollections.length > 0 && searchTerm?.length > 0 ? (
                        <>
                          {searchCollections.map((node, itx) => (
                            <NavLink key={itx} to={`/product-category/${node.node.slug}`} className="block p-2 hover:bg-gray-100"
                              onClick={() => handleResultClick(node)}>
                              <div className="flex items-center flex-row gap-4">

                                <p className='text-sm'> {node.node.name}</p>
                              </div>

                            </NavLink>
                          ))}
                        </>

                      ) : (
                        <p className='text-sm'>No Collection Found</p>
                      )
                      }


                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
<div>
          <button className="text-2xl focus:outline-none mt-1"  onClick={() => setShow(!show)}>
            &times;
          </button>
          </div>
        </div>
      )}
      {/* Mobile Sidebar Menu */}
      <div className={`fixed top-0 right-0 w-64 h-full bg-white shadow-md z-50 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'transform translate-x-0' : 'transform translate-x-full'} z-50`}>
        <div className="p-4">
          <button className="text-2xl focus:outline-none mb-4" onClick={() => setIsMenuOpen(false)}>
            &times;
          </button>
          <h3 className="text-xl text-center mb-3">Shop With Us</h3>

          <div className="flex flex-row gap-3 justify-center items-center">
            {navbar.slice(0, 1).map((el, index) => (
              <div className="flex justify-center flex-col items-center gap-2" key={index}>
                <img src={el.icon.node.sourceUrl} className='h-6' alt={el.icon.node.altText} height='20' width='22' />
                <div className='flex flex-col '>
                  <p className='text-sm font-normal text-gray-400'>Your Account</p>
                  {isLoggedIn && userDetails ? (
                    <NavLink onClick={() => setIsMenuOpen(!isMenuOpen)} to="/my-account" className='font-normal text-sm  
              2xl:text-base'>Hi: {userDetails.username}</NavLink>
                  ) : (
                    <NavLink onClick={() => setIsMenuOpen(!isMenuOpen)} to="/login" className="font-medium text-sm">Login</NavLink>
                  )}
                </div>
              </div>
            ))
            }
            {navbar.slice(2, 5).map((el, index) => (
              <NavLink onClick={() => setIsMenuOpen(!isMenuOpen)} to="/cart" key={index} className='gap-3 flex my-4 justify-center flex-col items-center  '>
                <div className="relative">

                  <img src={el.icon.node.sourceUrl} className='h-7' alt={el.icon.node.altText} height='20' width='25' />
                  <span className="sr-only">cart</span>
                  <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-normal text-white bg-blues border-2 border-white rounded-full -top-[6px] -end-[6px] ">{cartItems}</div>
                </div>
                <div>
                  <p className='text-sm font-normal text-gray-400'>Your Cart</p>
                </div>
              </NavLink>
            ))}
          </div>


        </div>
      </div>
    </>
  );
};

export default Navbar;
