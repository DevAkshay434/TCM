import React from 'react'
import { NavLink } from 'react-router-dom'
import FormatCurrency from '../../Component/Currency/FormatCurrency'
import { TrimSymbol } from '../../Component/Currency/TrimSymbol'

const CartItem = ({ cartItems, handleDecrement, handleIncrement, handleQuantityChange, handleRemoveItem, calculateTotalPrice, getSubtotal }) => {
    return (
        <section className=" relative">
            <div className="w-full max-w-7xl  lg-6 mx-auto">

                <h2 className="title font-manrope font-normal text-4xl leading-10 mb-8 text-center text-black">Shopping Cart
                </h2>
                <div className="hidden lg:grid grid-cols-2 py-6">
                    <div className="font-normal text-xl leading-8 text-gray-500">Product</div>
                    <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
                        {/* <span className="w-full max-w-[200px] text-center">Delivery Charge</span> */}
                        <span className="w-full max-w-[260px] text-center">Quantity</span>
                        <span className="w-full max-w-[200px] text-center">Total</span>
                    </p>
                </div>
                {cartItems.map((item, index) => (
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-4 border-t border-gray-200 py-6" key={index}>
                        <div
                            className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                            <div className="img-box">
                                <img
                                    src={`${item.featuredImage.node.sourceUrl}`}
                                    width="100"
                                    height="auto"
                                    alt="Product"
                                    className="object-cover"
                                />
                            </div>
                            <div className="pro-data w-full max-w-sm ">
                                <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">{item.name}
                                </h5>
                                {item.productCategories.edges.map((el, index) => (
                                    <p key={index}
                                        className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                                        {el.node.name}</p>
                                ))}
                                <div className='flex items-center text-center lg:text-normal gap-2 justify-center md:justify-start'>
                                <h6 className="font-medium text-base text-gray-500 line-through"><FormatCurrency amountInINR={TrimSymbol(item.price)} /></h6>
                                <h6 className="font-medium text-lg leading-8 text-blues  max-[550px]:text-center">
                                    <FormatCurrency amountInINR={TrimSymbol(item.salePrice)}/>
                                </h6>
                                </div>
                     <div className="flex justify-center lg:justify-start my-2 lg:my-0 lg:mt-3 items-center gap-4">
                  <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline ">
                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                    </svg>
                    Add to Favorites
                  </button>

                  <button 
                  onClick={() => handleRemoveItem(index)}
                  type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500">
                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                    Remove
                  </button>
                </div>
                            </div>
                            
                        </div>
                        <div
                            className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                            {/* <h6 className="font-manrope font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center">
                            <FormatCurrency amountInINR={TrimSymbol(0)}/> <span className="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap">(Delivery
                                    Charge)</span></h6> */}
                            <div className="flex items-center w-full mx-auto justify-center md:justify-start">
                                <button
                                    onClick={() => { handleDecrement(index) }}
                                    className="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
                                    <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                        xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                        fill="none">
                                        <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                                        <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                            strokeLinecap="round" />
                                        <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                            strokeLinecap="round" />
                                    </svg>
                                </button>
                                <input type="text"
                                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                    value={item.quantity }
                                    disabled
                                    className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                                />
                                <button
                                    onClick={() => { handleIncrement(index) }}
                                    className="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
                                    <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                        xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                        fill="none">
                                        <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeWidth="1.6"
                                            strokeLinecap="round" />
                                        <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                            strokeLinecap="round" />
                                        <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                            strokeLinecap="round" />
                                    </svg>
                                </button>
                            </div>
                            <h6
                                className="text-blues font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
                                    <FormatCurrency amountInINR={calculateTotalPrice(item.price, item.quantity)}/>
                               </h6>
                        </div>
                    </div>

                ))}
                <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
                    <div className="flex items-center justify-between w-full mb-6">
                        <p className="font-normal text-xl leading-8 text-gray-400">Sub Total</p>
                        <h6 className="font-semibold text-xl leading-8 text-gray-900">
                        <FormatCurrency amountInINR={getSubtotal()}/></h6>
                    </div>
                    <div className="flex items-center justify-between w-full pb-6 border-b border-gray-200">
                        <p className="font-normal text-xl leading-8 text-gray-400">Delivery Charge</p>
                        <h6 className="font-normal hover:underline cursor-pointer lg:text-xl leading-8 text-gray-900 text-end md:text-center text-base">Calculated at Checkout</h6>
                    </div>
                    {/* <div className="flex items-center justify-between w-full py-6">
                        <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">Total</p>
                        <h6 className="font-manrope font-medium text-2xl leading-9 text-blues">   <FormatCurrency 
                        amountInINR={(getSubtotal())}/></h6>
                    </div> */}
                </div>
                <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
                    <button
                        className="rounded-full py-4 w-full max-w-[280px]  flex items-center bg-indigo-50 justify-center transition-all duration-500 ">
                        <span className="px-2 font-semibold text-lg leading-8 text-blues ">Add Coupon Code</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                            <path d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998" stroke="#4F46E5" strokeWidth="1.6"
                                strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button
                        className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-blues font-semibold text-lg hover:bg-[#005f6b] text-white flex transition-all duration-500 ">
                    <NavLink to='/checkout'>
                    Continue
                        to Payment
                    </NavLink>
 
                        <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22"
                            fill="none">
                            <path d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998" stroke="white" strokeWidth="1.6"
                                strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default CartItem
