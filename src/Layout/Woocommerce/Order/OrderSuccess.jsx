import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import FormatCurrency from '../../../Component/Currency/FormatCurrency';
import Loader from '../../../libs/Loader';

const OrderSuccess = ( ) => {
  const { orderId } = useParams(); 
  const [orderDetails, setOrderDetails] = useState(null);
  const [statusid, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentVerified, setPaymentVerified] = useState(null); // New state for payment verification

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true); // Start loading state
      try {
        const consumerKey = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_KEY;
        const consumerSecret = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_SECRET;
        const authHeader = `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`;
  
        const [orderDetailsResponse, paymentVerificationResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_WOOCOMMERCE_API_URL}wp-json/wc/v3/orders/${orderId}`, {
            headers: {
              'Authorization': authHeader,
              'Content-Type': 'application/json',
            },
          }),
          axios.post('https://tcmcricket.com/api/verifyPayment', { order_id: orderId }),
        ]); 
  
        setOrderDetails(orderDetailsResponse.data);
  
        const { paymentSuccess, transaction_id: transactionId, statusid  } = paymentVerificationResponse.data;
        if (paymentSuccess && transactionId) {
          await updateWooCommerceOrderPayment(orderId, transactionId);
          setStatus(statusid);
          setPaymentVerified(true);
        } else {
          setPaymentVerified(false);
          console.warn('Payment verification failed:', paymentVerificationResponse.data);
        }
      } catch (error) {
        console.error('Error fetching order details or verifying payment:', error);
        setPaymentVerified(false);
      } finally {
        setLoading(false); // Stop loading state
      }
    };
  
    fetchOrderDetails();
  }, [orderId]);
  const updateWooCommerceOrderPayment = async (orderId, paymentId) => {
    try {
      const consumerKey = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_KEY;
      const consumerSecret = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_SECRET;
      const authHeader = `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`;
  
      const paymentUpdateResponse = await axios.put(
        `${process.env.REACT_APP_WOOCOMMERCE_API_URL}wp-json/wc/v3/orders/${orderId}`,
        {
          set_paid: true,
          payment_method: 'hdfc',
          transaction_id: paymentId,
        },
        {
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (paymentUpdateResponse.status === 200) {
        console.log('WooCommerce order payment status updated successfully');
      } else {
        console.error('Error updating WooCommerce order payment status');
      }
    } catch (error) {
      console.error('Error updating WooCommerce order payment status:', error);
    }
  };
  

  if (!orderDetails) {
    return <div className='container mx-auto md:px-8 xl:px-14 px-4 lg:px-10 2xl:px-10 text-3xl flex justify-center items-center'>No order details found.</div>;
  }
if(loading) {
  return <Loader />
}
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  console.log('Payment Verified Status:', paymentVerified);

  return (
    <section className="bg-white py-8 antialiased md:py-16">
      <div className="container mx-auto px-8 xl:px-20 lg:px-10 2xl:px-20">
        <h2 className="text-xl xl:text-3xl text-center font-semibold text-gray-900 sm:text-2xl mb-2">
          {paymentVerified === true ? ' Thanks for your order!' : 'Order Not Completed'}
        </h2>
        <p className="text-gray-500 text-center text-base mb-6 md:mb-8">
          {paymentVerified === true 
            ?    <>
            Your order Id{' '}
            <span className="text-blues hover:underline cursor-pointer">#{orderDetails.id}</span>{' '}
            will be processed within 24 hours during working days.
          </>
            : 'Your payment verification failed or is still pending. Please try again later.'
          }
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="mb-4">
            <dl className="flex items-center border-b py-2 justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 ">Order Id</dt>
              <dd className="font-medium text-gray-900 ">{orderDetails.id}</dd>
            </dl>
            <dl className="flex items-center border-b py-2 justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 ">Date</dt>
              <dd className="font-medium text-gray-900 ">{formatDate(orderDetails.date_created)}</dd>
            </dl>
            <dl className="flex items-center border-b py-2 justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 ">Payment Method</dt>
              <dd className="font-medium text-gray-900 ">{orderDetails.payment_method}</dd>
            </dl>
            <dl className="flex items-center py-2 justify-between gap-4">
              <dt className="font-normal mb-1 sm:mb-0 text-gray-500 ">Email</dt>
              <dd className="font-medium text-gray-900 ">{orderDetails.billing.email}</dd>
            </dl>
            <div className="flex items-center space-x-4 pt-4">
          <NavLink to={`/order-tracking/${orderId}`} state={{ orderDetails: orderDetails }} className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5  focus:outline-none bg-blues">Track your order</NavLink>
          <NavLink to="/shop" className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Return to shopping</NavLink>
      </div>
          </div>
          <div className="border-[1px] px-6 rounded-xl bg-gray-50 py-4">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            {orderDetails.line_items.map((el, index) => (
              <div className="grid grid-cols-7 w-full pb-2 pt-6 border-b border-gray-300" key={index}>
                <div className="col-span-7 min-[500px]:col-span-2 md:col-span-1">
                  <img 
                    src={el.image.src} 
                    alt={el.name} 
                    className="w-full rounded-xl object-cover" 
                  />
                </div>
                <div className="col-span-7 min-[500px]:col-span-5 md:col-span-6 min-[500px]:pl-5 max-sm:mt-5 flex flex-col justify-center">
                  <div className="flex min-[500px]:items-center justify-between">
                    <div>
                      <NavLink to={`/product/${el.name}`}>
                        <h5 className="font-normal hover:underline text-xl leading-9 text-black ">
                          {el.name}
                        </h5>
                      </NavLink>
                    </div>
                    <div>
                      <p className="font-normal text-lg leading-8 text-gray-500">
                        x<span className="text-black ">{el.quantity}</span>
                      </p>
                    </div>
                    <h5 className="text-lg text-blues sm:text-right ">
                      <FormatCurrency amountInINR={el.total}/>
                    </h5>
                  </div>
                </div>
              </div>
            ))}
            <div className='py-4'>
              <div className='flex text-base md:px-16 justify-between'>
                <p>SubTotal</p>
                <p><FormatCurrency amountInINR={(orderDetails.total - orderDetails.shipping_total).toFixed(2)}/></p>
              </div>
              <div className='flex mt-4 text-base md:px-16 justify-between'>
                <p>Shipping Price</p>
                <p><FormatCurrency amountInINR={orderDetails.shipping_total}/></p>
              </div>
            </div>
            <hr className="border-b-gray-300 border-[1px]"/>
            <div className='flex py-2 md:px-16 justify-between'>
              <p className='font-semibold text-base'>Total </p>
              <p className='font-semibold text-base'><FormatCurrency amountInINR={orderDetails.total}/></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSuccess;
