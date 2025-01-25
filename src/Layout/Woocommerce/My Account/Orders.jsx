import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from 'axios';
import { useAuth } from "../../../Context/useAuth";

export default function Orders() {
  const [completedOrders, setCompletedOrders] = useState([]);
  const [error, setError] = useState(null);
const {customerId} = useAuth();
  useEffect(() => {
    const fetchCompletedOrders = async () => {
      try {
        const consumerKey = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_KEY;
        const consumerSecret = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_SECRET;
        const authHeader = `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`;
        const userId = customerId;
        // Fetch orders with status 'completed' and 'processing'
        const response = await axios.get(`${process.env.REACT_APP_WOOCOMMERCE_API_URL}wp-json/wc/v3/orders`, {
          params: {
            customer: userId,
            status: ["completed", "processing"]// Filter orders by customer ID
            // Optionally, you can add status filtering here if needed
          },
          headers: {
            'Authorization': authHeader,
          },}
        );
      
        setCompletedOrders(response.data); 
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 2xx
          console.error('Response error:', error.response.data);
        } else if (error.request) {
          // Request was made but no response was received
          console.error('Request error:', error.request);
        } else {
          // Something happened in setting up the request
          console.error('Axios error:', error.message);
        }
        setError('Failed to fetch orders. Please try again later.');
      }
    };

    fetchCompletedOrders();
  }, [customerId]);
  return (
    <section className="order-page">
      {error && <div className="error-message">{error}</div>}
      {completedOrders.length > 0 ? (
        <div>
          <h1 className="text-lg text-center mb-4">Your Orders</h1>
         
     
             

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm lg:text-base text-left rtl:text-right text-gray-500 ">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" class="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
        {completedOrders.map((order) => (

  order.line_items.map((el,idx)=>(
    <tr className="bg-white border-b " key={idx}>
                <th scope="row" className="px-6 py-4  font-medium text-gray-900 whitespace-nowrap ">
                    {el.name}
                </th>
                <td className="px-6 py-4">
                   {order.status}
                </td>
                <td className="px-6 py-4">
                    {el.quantity}
                </td>
                <td className="px-6 py-4">
                  {order.currency_symbol}{order.total}
                </td>
                <td className="px-6 py-4">
                    <NavLink to={`/order-tracking/${order.id}`}  state={{ orderDetails: order }}   className="font-medium text-blues hover:underline">Track Order</NavLink>
                </td>
            </tr>
  ))
            
                 ))}
            
        </tbody>
    </table>
</div>

       
     
        </div>
      ) : (
        <div className="flex items-center gap-3 my-4 p-2 h-16 bg-gray-100 border-t-blues border-2">
          <p className="text-lg lg:text-xl ms-2 py-3">No order has been made yet.</p>
          <Link className="p-2 text-base lg:text-lg text-white bg-blues" to="/shop">
            Browse Products
          </Link>
        </div>
      )}
    </section>
  );
}
