import React from 'react'
import axios from 'axios';

const Order = () => {

    const [completedOrders, setCompletedOrders] = useState([]);

    useEffect(() => {
      const getOrders = async () => {
        try {
          const orders = await fetchCompletedOrders();
          setCompletedOrders(orders);
        } catch (error) {
          
          console.error('Failed to fetch completed orders:', error);
        }
      };
    
      getOrders();
    }, []);
    
const fetchCompletedOrders = async () => {
  try {
    const consumerKey = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_KEY;
    const consumerSecret = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_SECRET;
    const authHeader = `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`;

    // Fetch orders with status 'completed'
    const response = await axios.get(`${process.env.REACT_APP_WOOCOMMERCE_API_URL}wp-json/wc/v3/orders`, {
      params: { status: ['completed', 'processing'] }, 
      headers: {
        'Authorization': authHeader,
      },
    });

    console.log('Completed Orders:', response.data);
    return response.data; 

  } catch (error) {
    console.error('Error fetching completed orders:', error);
    throw error; 
  }
};

return (
  <div>
    <h1>Completed Orders</h1>
    <ul>
      {completedOrders.map(order => (
        <li key={order.id}>
          Order ID: {order.id} - Total: {order.total} - Status: {order.status}
        </li>
      ))}
    </ul>
  </div>
);
};
export default Order
