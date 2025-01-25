import React, { lazy, Suspense, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'
import { useQuery } from '@apollo/client';
import { GET_NAVBAR } from '../../Queries/Queries';
const Navbar = lazy(()=> import ('./Navbar/Navbar'));
const CategoryNav = lazy(()=> import ('./CategoryNav'));
const DropCurrency = lazy(()=> import ('../../Component/Currency/DropCurrency'));
const Headers = () => {
    const {loading ,error , data} = useQuery(GET_NAVBAR,{
          fetchPolicy: 'cache-first',
        nextFetchPolicy: 'cache-and-network'
    });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  if (loading) {
    return null
  }
  if (error ) {
    return <p>Menu error : {error.message}</p>
  }
  const menuItems = data?.menu?.menuItems?.edges || [];
  const navbar = data?.menu?.navbar?.icons || [];
  const nav = data?.menu?.navbar || [];
  return (
    <header className="w-full header">
      <div className="bg-black">
      <div className="container  mx-auto md:px-8 px-4 xl:px-14 lg:px-10 2xl:px-10 py-1">
        <div className="flex py-[4px] text-white items-center justify-content-center gap-2">
          <div className="flex  items-center gap-3 lg:gap-8">
            {/* <div >
              <Suspense fallback={<></>}>
              <DropCurrency />
              </Suspense>
            </div> */}
            <div className='hidden md:block'>
              <p className='text-sm'>Shop At Best Prices</p>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex ml-auto items-center gap-4">
          {menuItems.slice(1,4).map((el,index)=>(
            <NavLink className='hover:text-yellow-500 text-sm' key={index} to={el.node.uri}> {el.node.label}</NavLink>
          
        ))
        }
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-auto -mt-[5px]">
            <button onClick={toggleMenu} className="text-2xl  focus:outline-none">
              &#8801;
            </button>
          </div>
        </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div  className={`md:hidden text-center bg-white text-black shadow-md p-4 mobile-menu ${isMenuOpen ? 'open' : ''}`}>
            <div className="flex flex-col items-center justify-center">
           {menuItems.slice(1,4).map((el,index)=>(
            <NavLink className='hover:text-yellow-500 text-sm mt-2' key={index} to={el.node.uri}> {el.node.label}</NavLink>
        ))
        }
            </div>

          </div>
        )}
        </div>
        <Suspense fallback={<></>}>
        <Navbar navbar={navbar} logo={nav}/>
              </Suspense>
        <hr className='border-t-[1px]  md:mx-8 mx-4 xl:mx-14 lg:mx-10 2xl:mx-10'/>
        <Suspense fallback={<></>}>
<CategoryNav navbar={navbar} nav={nav}/>
</Suspense>
    </header>
  );
};

export default Headers;
