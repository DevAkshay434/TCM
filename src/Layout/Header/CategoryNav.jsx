import React, { useEffect, useState, lazy, Suspense } from 'react'
import { NavLink } from 'react-router-dom'
import Cookies from 'js-cookie'
const Dropdown = lazy(()=> import('./CatDropdown'))
const CategoryNav = ({navbar, nav}) => {
const [whishlistItems, setWishlistItems]= useState([])
  useEffect(() => {
    const fetchCartItems = () => {
      const wishlist = Cookies.get('wishlist') ? JSON.parse(Cookies.get('wishlist')) : [];
      setWishlistItems(wishlist.length);
    };

    fetchCartItems();

    const handleStorageChange = () => {
      fetchCartItems();
    };

    window.addEventListener('wishlistUpdated', handleStorageChange);
    return () => window.removeEventListener('wishlistUpdated', handleStorageChange);
  }, []);
  return (
    <div className=' container mx-auto'>
     <div className="flex py-[3px] 2xl:py-[5px] flex-wrap place-items-end justify-between md:px-8 px-4 xl:px-14 lg:px-10 2xl:px-10 w-full ">
        <div className='flex flex-wrap xl:gap-7  gap-5 items-center'>
        <div className="relative flex items-end justify-center border-r-[1px] border-r-gray-200 pr-20 ">
          <Suspense fallback={<></>}>
          <Dropdown/>
          </Suspense>
          </div>
            <div className='md:flex hidden items-center gap-8'>
              {nav.pageLinks.map((el,index)=> (
            <NavLink to={el.link.url} key={index} className="text-sm hover:text-blues font-normal">{el.link.title}</NavLink>

              ))}
   
            </div>
        </div>
        <div className='mr-2'>
            <NavLink to="/wishlist">
        {navbar.slice(1, 2).map((el, index) => (
              <div key={index}  className=' relative gap-3 inline-flex items-center'>
                 
                  <img src={el.icon.node.sourceUrl} className='h-5' alt={el.icon.node.altText} height="15" width="22"/>
                  <span className="sr-only">cart</span>
                  <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-normal text-white bg-blues border-2 border-white rounded-full -top-2 -end-2 ">
                    {whishlistItems}
                  </div>
                </div>
                
            ))}
       
        </NavLink>
        </div>
     </div>
     

    </div>
  )
}

export default CategoryNav
