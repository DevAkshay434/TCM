import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import FormatCurrency from '../../../Component/Currency/FormatCurrency';

const OrderDetails = () => {
  const location = useLocation();
  const { orderDetails } = location.state || {};

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

  if (!orderDetails) {
    return <p>No order details available.</p>;
  }

  return (
    <section className='container py-8 mx-auto px-8  xl:px-14 lg:px-10 2xl:px-10'>
        <h1 className='text-center text-3xl font-semibold pb-10'>Your Order Details :</h1>
         <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 py-2 border-y border-gray-100 lg:text-center">
            <div className="flex lg:block items-center  justify-between box group">
                <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">Purchase Date</p>
                <h6 className="font-semibold font-manrope text-base lg:text-2xl  leading-9 text-black">{formatDate(orderDetails.date_created)}</h6>
            </div>
            <div className="flex lg:block items-center  justify-between  box group">
                <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">Order ID</p>
                <h6 className="font-semibold font-manrope text-base lg:text-2xl leading-9 text-black">{orderDetails.id}</h6>
            </div>
            <div className="flex lg:block items-center  justify-between  box group">
                <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">Status </p>
                <p className='font-semibold font-manrope text-base lg:text-2xl  leading-9 text-black'>{orderDetails.status}</p>
            </div>
            <div className=" flex lg:block items-center  justify-between  box group">
                <p className="font-normal text-base leading-7 text-gray-500 mb-3 transition-all duration-500 group-hover:text-gray-700">Total</p>
                <h6 className="font-semibold font-manrope text-base lg:text-2xl  leading-9 text-black">  <FormatCurrency amountInINR={orderDetails.total}/>
                </h6>
            </div>
        </div>
        {orderDetails.line_items.map((el, index) => (
  <div className="grid grid-cols-7 w-full pt-2 lg:pt-6 border-b border-gray-100" key={index}>
    <div className="col-span-7 min-[500px]:col-span-2 md:col-span-1">
      <img 
        src={el.image.src} 
        alt={el.name} 
        className="w-full rounded-xl object-cover" 
      />
    </div>
    <div className="col-span-7 min-[500px]:col-span-5 md:col-span-6 min-[500px]:pl-5 max-sm:mt-5 flex flex-col justify-center">
      <div className="flex pb-4 items-center justify-between">
        <div>
            <NavLink to={`/product/${el.name}`}>
          <h5 className="font-semibold text-xl leading-9 text-black lg:mb-6">
            {el.name}
          </h5>
          </NavLink>
          <p className="font-normal text-lg leading-8 text-gray-500">
            Quantity: <span className="text-black font-semibold">{el.quantity}</span>
          </p>
        </div>

        <h5 className=" font-semibold text-xl lg:text-2xl  text-blues sm:text-right mt-3">
        <FormatCurrency amountInINR={el.total}/>
        </h5>
      </div>
    </div>
  </div>
))}

    <h2 className='text-center text-2xl font-semibold pt-6'>Shipping & Billing Address</h2>   
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 pt-6 lg:pt-10">
        <div>
            <h4 className='text-xl text-center py-4'>Shipping Information</h4>
            <table className="w-full text-center text-base border-[1px] text-gray-500 cursor-pointer p-4">
            <tbody>
              <tr className="border-b ">
                <th scope="row" className="py-2 px-4 font-medium text-gray-900">Name</th>
                <td className="py-2 px-4 ">{orderDetails.shipping.first_name} {orderDetails.shipping.last_name}</td>
              </tr>
              <tr className="border-b">
                <th scope="row" className="py-2 px-4 font-medium text-gray-900">Address</th>
                <td className="py-2 px-4 text-center">{orderDetails.shipping.address_1}, {orderDetails.shipping.address_2}</td>
              </tr>
              <tr className="border-b">
                <th scope="row" className="py-2 px-4 font-medium text-gray-900">City</th>
                <td className="py-2 px-4">{orderDetails.shipping.city}</td>
              </tr>
              <tr className="border-b">
                <th scope="row" className="py-2 px-4 font-medium text-gray-900">State</th>
                <td className="py-2 px-4">{orderDetails.shipping.state}</td>
              </tr>
              <tr className="border-b">
                <th scope="row" className="py-2 px-4 font-medium text-gray-900">Postcode</th>
                <td className="py-2 px-4 " >{orderDetails.shipping.postcode}</td>
              </tr>
              <tr className="border-b">
                <th scope="row" className="py-2 px-4 font-medium text-gray-900">Country</th>
                <td className="py-2 px-4 ">{orderDetails.shipping.country}</td>
              </tr>
              <tr className="border-b">
                <th scope="row" className="py-2 px-4 font-medium text-gray-900">Phone</th>
                <td className="py-2 px-4">{orderDetails.shipping.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
            <h4 className='text-xl text-center py-4'>Billing Information</h4>
            <table className="w-full text-center text-base border-[1px] text-gray-500 cursor-pointer p-4">
            <tbody>
              <tr className="border-b ">
                <th scope="row" className="py-2 px-4 font-medium text-gray-900">Name</th>
                <td className="py-2 px-4 ">{orderDetails.billing.first_name} {orderDetails.billing.last_name}</td>
              </tr>
              <tr className="border-b">
                <th scope="row" className="py-2 px-4 font-medium text-gray-900">Address</th>
                <td className="py-2 px-4 text-center">{orderDetails.billing.address_1}, {orderDetails.billing.address_2}</td>
              </tr>
              <tr className="border-b">
                <th scope="row" className="py-2 px-4 font-medium text-gray-900">City</th>
                <td className="py-2 px-4">{orderDetails.billing.city}</td>
              </tr>
              <tr className="border-b">
                <th scope="row" className="py-2 px-4 font-medium text-gray-900">State</th>
                <td className="py-2 px-4">{orderDetails.billing.state}</td>
              </tr>
              <tr className="border-b">
                <th scope="row" className="py-2 px-4 font-medium text-gray-900">Postcode</th>
                <td className="py-2 px-4 " >{orderDetails.billing.postcode}</td>
              </tr>
              <tr className="border-b">
                <th scope="row" className="py-2 px-4 font-medium text-gray-900">Country</th>
                <td className="py-2 px-4 ">{orderDetails.billing.country}</td>
              </tr>
              <tr className="border-b">
                <th scope="row" className="py-2 px-4 font-medium text-gray-900">Phone</th>
                <td className="py-2 px-4">{orderDetails.billing.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
    </section>
  );
};

export default OrderDetails;
