import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderTracking = () => {
  const [orderId, setOrderId] = useState('');
  const [billingEmail, setBillingEmail] = useState('');
  const [error, setError] = useState('');
const navigate= useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
        const consumerKey = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_KEY;
        const consumerSecret = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_SECRET;
        const authHeader = `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`;
      const response = await fetch(`${process.env.REACT_APP_WOOCOMMERCE_API_URL}wp-json/wc/v3/orders/${orderId}`, {
        method: 'GET',
        headers: {
          'Authorization':authHeader, 
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Order not found or email mismatch');
      }

      const order = await response.json();
    
      
      if (order.billing.email !== billingEmail) {
        throw new Error('Email does not match the order');
      }
      navigate(`/order-tracking/${order.id}`, { state: { orderDetails: order } })
     
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };
  useEffect(() => {
  
    const verifyAndUpdateOrderPayment = async (orderId) => {
      try {
        const response = await axios.post('https://tcmcricket.com/api/verifyPayment', {
          order_id: orderId,
        });
        console.log('Response from verifyPayment API:', response);
        if (response.data.paymentSuccess && response.data.transaction_id) {
          const transactionId = response.data.transaction_id;
          await updateWooCommerceOrderPayment(orderId, transactionId);
  
        } else {
          console.warn('Payment verification failed:', response.data);
        }
        
      } catch (error) {
        console.error('Error verifying payment:', error);
      }
    };
   
    
    verifyAndUpdateOrderPayment(orderId);  // Call the payment verification function

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

  return (
    <section className='order-tracking py-10'>
      <div className="container text-center mx-auto md:px-8 px-4 xl:px-14 lg:px-10 2xl:px-10">
        <h1 className=' font-semibold text-3xl pb-2'>Track Your Order</h1>
        <p className='font-normal text-lg pb-8'>You can find your Order ID in the confirmation email we sent after you placed your order.</p>
        <form onSubmit={handleSubmit} className='grid grid-cols-1 justify-center  gap-8'>
          <div>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className='md:w-1/2 w-2/3 rounded-md border border-gray-200 bg-gray-50 p-2.5 text-sm shadow-sm outline-none focus:z-10 focus:border-blues focus:ring-blues'
              placeholder='Enter Your Order Id'
            />
          </div>
          <div>
            <input
              type="text"
              value={billingEmail}
              onChange={(e) => setBillingEmail(e.target.value)}
              className="md:w-1/2 w-2/3 rounded-md border border-gray-200 bg-gray-50 p-2.5 text-sm shadow-sm outline-none focus:z-10 focus:border-blues focus:ring-blues"
              placeholder='Enter Your Billing Email'
            />
          </div>
          <button type="submit" className='bg-blues hover:bg-hoverblue w-1/4 p-2 mx-auto text-white rounded-md'>Search Order</button>
        </form>

        {error && <p className="text-red-500 text-center">{error}</p>}
        
       
      </div>
    </section>
  );
};

export default OrderTracking;
