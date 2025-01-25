import React, { useEffect, useState } from "react"
import Cookies from 'js-cookie'
import { Link } from "react-router-dom"
import FormatCurrency from '../../../Component/Currency/FormatCurrency'
import { TrimSymbol } from '../../../Component/Currency/TrimSymbol'
export default function Wishlist() {
  const [whishlistItems, setWishlistItems] = useState([])
  useEffect(() => {
    const fetchWishlist = () => {
      const wishlist = Cookies.get('wishlist') ? JSON.parse(Cookies.get('wishlist')) : [];
      setWishlistItems(wishlist);
    };

    fetchWishlist();

    const handleWishlistChange = () => {
      fetchWishlist();
    };

    window.addEventListener('wishlistUpdated', handleWishlistChange);
    return () => window.removeEventListener('wishlistUpdated', handleWishlistChange);
  }, []);
  const handleRemoveItem = (index) => {
    const updatedCart = whishlistItems.filter((_, i) => i !== index);
    setWishlistItems(updatedCart);
    if (updatedCart.length > 0) {
      Cookies.set('wishlist', JSON.stringify(updatedCart), { expires: 7 });
    } else {
      Cookies.remove('wishlist');
    }
    window.dispatchEvent(new Event('wishlistUpdated'));
  };
  return (
    <section className="order-page relative ">
      {whishlistItems.length > 0 ? (
        <div className="w-full max-w-7xl  lg-6 mx-auto">
          <h2 className="text-center text-2xl">Your Wishlist</h2>
         {whishlistItems.map((item, index) => (

            <div className="grid grid-cols-1  min-[550px]:gap-6 border-b-[1px] border-b-gray-100 py-6" key={index}>
              <div
                className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto justify-between">
                <div className="img-box">
                  <img
                    src={`${item.featuredImage.node.sourceUrl}`}
                    width="100"
                    height="auto"
                    alt="Product"
                    className="object-cover"
                  />
                </div>
                <div className="pro-data ">
                  <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">{item.name}
                  </h5>
                  </div>
                  <div>
                  {item.productCategories.edges.map((el, index) => (
                    <p key={index}
                      className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                      {el.node.name}</p>
                  ))}
                  </div>
                  <div>
                  <div className='flex items-center gap-2'>
                    <h6 className="font-medium text-base text-gray-500 line-through"><FormatCurrency amountInINR={TrimSymbol(item.price)} /></h6>
                    <h6 className="font-medium text-lg leading-8 text-blue-600  max-[550px]:text-center">
                      <FormatCurrency amountInINR={TrimSymbol(item.salePrice)} />
                    </h6>
                  </div>
                  </div>
                  <div className="flex justify-center lg:justify-start my-2 lg:my-0 lg:mt-3 items-center gap-4">
                   

                    <button
                      onClick={() => handleRemoveItem(index)}
                      type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                      <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                      </svg>
                      Remove
                    </button>
                    <button
                      
                      type="button" className="inline-flex items-center text-sm font-medium text-blues hover:underline ">
                     <p>Buy Now</p>
                    </button>
                  </div>

              </div>
            </div>
          ))}
        </div>

      ) : (
        <div className='flex items-center gap-3 my-4 p-2 h-16 bg-gray-100 border-t-blues border-2' >
          <p className='text-lg lg:text-xl ms-2 py-3'>No products is added to wishlist yet.</p>
          <Link className="  p-2 text-base lg:text-lg text-white  bg-blues" to='/shop'>
            Browse Products
          </Link>
        </div>
      )}

    </section>
  )
}
