import React, { useState, useEffect }  from 'react'
import { useAuth } from '../../../Context/useAuth';
import Cookies from 'js-cookie'
export default function Account () {
  const { isLoggedIn } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [whishlistItems, setWishlistItems] = useState([])
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const users = Cookies.get('userDetails') ? JSON.parse(Cookies.get('userDetails')) :[];
    setUserDetails(users);
    console.log('sup', users)
    const fetchCartItems = () => {
      const cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
      setCartItems(cart.length);
    };

    const fetchWishlist = () => {
      const wishlist = Cookies.get('wishlist') ? JSON.parse(Cookies.get('wishlist')) : [];
      setWishlistItems(wishlist.length);
    };
  
    const handleStorageChange = () => {
      fetchCartItems();
    };

    const handleWishlistChange = () => {
      fetchWishlist();
    };

    // Initial fetch
    fetchCartItems();
    fetchWishlist();
    window.addEventListener('cartUpdated', handleStorageChange);
    window.addEventListener('wishlistUpdated', handleWishlistChange);

    return () => {
      window.removeEventListener('cartUpdated', handleStorageChange);
      window.removeEventListener('wishlistUpdated', handleWishlistChange);
    };
  }, []);
  return (
    <div className=''>
    {isLoggedIn && userDetails ? (
      
      <>
      <h4 className='text-lg '>Hello, {userDetails.username}
      </h4>
      <h3 className="font-bold text-4xl my-2">Welcome to Your Profile</h3>
      <div className="flex flex-col lg:flex-row gap-4 w-full my-5">
                                
                                <div className='bg-black text-white hover:text-black hover:bg-blues transition-all duration-200 ease-in cursor-pointer w-[252px] h-[208px]  p-6'>
                                    <div className="w-[62px] h-[62px] rounded bg-white flex justify-center items-center"><span><svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32.4473 8.03086C32.482 8.37876 32.5 8.73144 32.5 9.08829C32.5 14.919 27.7564 19.6625 21.9258 19.6625C16.0951 19.6625 11.3516 14.919 11.3516 9.08829C11.3516 8.73144 11.3695 8.37876 11.4042 8.03086H8.98055L8.05537 0.628906H0.777344V2.74375H6.18839L8.56759 21.7774H34.1868L35.8039 8.03086H32.4473Z" fill="#007798"></path><path d="M9.09669 26.0074H6.06485C4.31566 26.0074 2.89258 27.4305 2.89258 29.1797C2.89258 30.9289 4.31566 32.352 6.06485 32.352H6.24672C6.12935 32.6829 6.06485 33.0386 6.06485 33.4094C6.06485 35.1586 7.48793 36.5816 9.23711 36.5816C11.4247 36.5816 12.9571 34.4091 12.2274 32.352H22.1081C21.377 34.413 22.9157 36.5816 25.0985 36.5816C26.8476 36.5816 28.2707 35.1586 28.2707 33.4094C28.2707 33.0386 28.2061 32.6829 28.0888 32.352H30.3856V30.2371H6.06485C5.48178 30.2371 5.00742 29.7628 5.00742 29.1797C5.00742 28.5966 5.48178 28.1223 6.06485 28.1223H33.4407L33.9384 23.8926H8.83233L9.09669 26.0074Z" fill="#007798"></path><path d="M21.9262 17.5477C26.5907 17.5477 30.3856 13.7528 30.3856 9.08829C30.3856 4.42378 26.5907 0.628906 21.9262 0.628906C17.2616 0.628906 13.4668 4.42378 13.4668 9.08829C13.4668 13.7528 17.2617 17.5477 21.9262 17.5477ZM20.8688 5.91602H22.9836V8.6503L24.7886 10.4554L23.2932 11.9508L20.8687 9.5262V5.91602H20.8688Z" fill="#007798"></path></svg></span></div>
                                    <h3 className='font-bold text-xl mt-5'>Your Cart</h3>
                                    <span className='text-4xl mt-1 font-bold'>{cartItems}</span>
                                </div>
                                <div className='bg-black text-white hover:text-black hover:bg-blues transition-all duration-200 ease-in cursor-pointer w-[252px] h-[208px]  p-6'>
                                    <div className="w-[62px] h-[62px] rounded bg-white flex justify-center items-center"><span><svg width="36" height="37" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32.4473 8.03086C32.482 8.37876 32.5 8.73144 32.5 9.08829C32.5 14.919 27.7564 19.6625 21.9258 19.6625C16.0951 19.6625 11.3516 14.919 11.3516 9.08829C11.3516 8.73144 11.3695 8.37876 11.4042 8.03086H8.98055L8.05537 0.628906H0.777344V2.74375H6.18839L8.56759 21.7774H34.1868L35.8039 8.03086H32.4473Z" fill="#007798"></path><path d="M9.09669 26.0074H6.06485C4.31566 26.0074 2.89258 27.4305 2.89258 29.1797C2.89258 30.9289 4.31566 32.352 6.06485 32.352H6.24672C6.12935 32.6829 6.06485 33.0386 6.06485 33.4094C6.06485 35.1586 7.48793 36.5816 9.23711 36.5816C11.4247 36.5816 12.9571 34.4091 12.2274 32.352H22.1081C21.377 34.413 22.9157 36.5816 25.0985 36.5816C26.8476 36.5816 28.2707 35.1586 28.2707 33.4094C28.2707 33.0386 28.2061 32.6829 28.0888 32.352H30.3856V30.2371H6.06485C5.48178 30.2371 5.00742 29.7628 5.00742 29.1797C5.00742 28.5966 5.48178 28.1223 6.06485 28.1223H33.4407L33.9384 23.8926H8.83233L9.09669 26.0074Z" fill="#007798"></path><path d="M21.9262 17.5477C26.5907 17.5477 30.3856 13.7528 30.3856 9.08829C30.3856 4.42378 26.5907 0.628906 21.9262 0.628906C17.2616 0.628906 13.4668 4.42378 13.4668 9.08829C13.4668 13.7528 17.2617 17.5477 21.9262 17.5477ZM20.8688 5.91602H22.9836V8.6503L24.7886 10.4554L23.2932 11.9508L20.8687 9.5262V5.91602H20.8688Z" fill="#007798"></path></svg></span></div>
                                    <h3 className='font-bold text-xl mt-5'>Your Wishlist</h3>
                                    <span className='text-4xl mt-1 font-bold'>{whishlistItems}</span>
                                </div>

                            </div>
      <div className="container md:px-2 w-100 py-3">
        <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex items-center user-profile">
        <div className="flex-shrink-0">
          <img
            className="w-20 h-20 rounded-full"
            src={userDetails.avatar_url}
            alt="Profile"
          />
        </div>
        <div className="flex-1 min-w-0 ms-4 py-0.5">
          <p className="text-sm font-medium text-black truncate ">
            {userDetails.first_name} {userDetails.last_name}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400 py-0.5">
          Phone: {userDetails.shipping?.phone}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400 py-0.5">
          {userDetails.email}
          </p>
        </div>
      </div>   
      <div className="flex items-center user-address w-65 px-3 mt-5 py-2" style={{backgroundColor:'#e3ebf7', borderRadius:20}}>
<div className="flex-shrink-0">
<img
  className="w-8 h-8 rounded-full"
  src="https://thecricketmohali.avaptech.in/wp-content/uploads/2024/09/pin.png"
  alt="profile"
  loading='lazy'
/>
</div>
<div className="flex-1 min-w-0 ms-4 py-0.5">
<p className="text-md text-gray-500 truncate dark:text-gray-400 py-0.5">
  {userDetails.shipping?.address_1},{userDetails.shipping?.address_2}
</p>
<p className="text-md text-gray-500 truncate dark:text-gray-400 py-0.5">
{userDetails.shipping?.city},{userDetails.shipping?.country}
</p>
</div>
</div> 
</div>

      </div>
 
      </>
    ):(
      <>

</>
    )}
  
</div>

  )
}