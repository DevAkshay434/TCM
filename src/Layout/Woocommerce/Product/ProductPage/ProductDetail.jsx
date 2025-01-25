import React from 'react'
import parse from 'html-react-parser'
import { TrimSymbol } from '../../../../Component/Currency/TrimSymbol';
import FormatCurrency from '../../../../Component/Currency/FormatCurrency';
import { NavLink } from 'react-router-dom'
import Icons from '../../../../Component/Icons';
const ProductDetail = ({ product, decrement, buy, increment, cart, quantity, handleQuantityChange }) => {

  function getDiscountPercentage(regularPrice, price) {
    const discount = ((regularPrice - price) / regularPrice) * 100;
    return Math.round(discount); // Round to avoid decimals
  }
  return (
    <>
      <h2 className='text-black font-normal text-4xl'>{product.name}</h2>
      <div className="flex items-center gap-2">
      <div className='flex flex-col my-4 mb-3'>
        <span className="font-semibold text-base lg:text-lg xl:text-2xl   text-bl  "><FormatCurrency amountInINR={TrimSymbol(product.price)} /></span>
        <span className="font-normal text-sm md:text-base lg:text-lg 2xl:text-xl  text-gray-500 line-through"><FormatCurrency amountInINR={TrimSymbol(product.regularPrice)} /></span>
       
      </div>
      <div className="text-sm  md:text-base lg:text-lg  ">
        <span className="bg-[#d2ebf2] text-blues p-1 lg:p-2 font-semibold  text-base rounded-md w-12">Save  {getDiscountPercentage(TrimSymbol(product.regularPrice), TrimSymbol(product.price))}%</span>
    </div>
    </div>
      <div>
        {product.content &&
          product.content.length > 0 &&
          <p>{parse(product.content)}</p>
        }
      </div>
      <div >


        <div className="flex gap-2 items-center">
          <div className='flex border-2 h-10 lg:h-[45px] bg-rating justify-start rounded  items-center '>
            <div>
              <button

                className='text-base md:text-xl  text-blues font-bold border-blues border-1 h-8 w-8 md:h-9 md:w-10  block '
                onClick={decrement}
              >
                &#x2212;
              </button>
            </div>
            <div>
              <input
                className='w-12 h-8 text-lg items-center text-center text-blues'
                type="number"
                placeholder="1"
                style={{ lineHeight: '37px', }}
                value={quantity}
                onChange={handleQuantityChange}
                disabled
              />
            </div>
            <div>

              <button

                className='text-base md:text-xl border-blues font-bold border-1 text-blues  h-8 w-8 md:h-9 md:w-10 block '

                onClick={increment}
              >
                +
              </button>
            </div>
          </div>
          <button className="bg-blues hover:bg-hoverblue w-1/2 rounded-lg text-white font-medium text-lg p-2  my-4" onClick={cart}>
            <div className="flex justify-center items-center gap-4">
              <Icons icons='faShoppingCart' color="white" size="1x" />
              <span>Add To Cart</span>
            </div></button>

        </div>
        <div className='mx-auto md:mx-0'>
          <button className='w-3/4 hover:bg-hoverblue bg-blues p-2  mb-4 rounded-lg' >
            <NavLink onClick={buy} className="  text-white font-medium text-lg " to='/checkout'>Buy Now</NavLink>
          </button>

        </div>
      </div>
      <div className="border-b  border-t lg:w-3/4 py-4">
        <div className="grid grid-cols-3 gap-6  ">
          <div>
          <Icons  icons="faGlobe" Class="text-blues" size='2x'/>
          <p className="pt-2 font-medium text-base">World-Wide Shipping*</p>
          </div>
          <div>
          <Icons icons="faHandshake" Class="text-blues" size='2x'/>
          <p className="pt-2 font-medium text-base">Authentic Products</p>

          </div>
          <div>
          <Icons icons="faClock" Class="text-blues" size='2x'/>
          <p className="pt-2 font-medium text-base">24x7 Customer Support</p>

          </div>
        </div>
     
      </div>
      <div>
          <p className='text-base font-medium mt-3'>Learn More about us,click <NavLink to="https://www.instagram.com/thecricketmohali_" target="_blank" className="text-blues hover:underline">here</NavLink></p>
        </div>
    </>
  )
}

export default ProductDetail
