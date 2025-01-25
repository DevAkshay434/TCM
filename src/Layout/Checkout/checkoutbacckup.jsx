import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/useAuth';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CheckoutForm from './CheckoutForm';
import CheckoutPreview from './CheckoutPreview';
import axios from 'axios';
import { toast } from 'react-toastify';
import { clearCart, removeFromCart } from '../../libs/CartUtils';
import { useCurrency } from '../../Context/useCurrency';
const calculateTotalPrice = (price, quantity) => {
  const numericPrice = parseFloat(price.replace(/₹|,/g, '').trim());
  const numericQuantity = parseFloat(quantity);
  return numericPrice * numericQuantity;
};
const Checkout = () => {
  const [orderId, setOrderId] = useState('');
  const Router = useNavigate();
  const { isLoggedIn, customerId } = useAuth();
  const [shippingCost, setShippingCost] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingZoneMap, setShippingZoneMap] = useState({});
  const { selectedCountry, conversionRate } = useCurrency(); // Get selected currency and conversion rate
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    postcode: '',
    country: '',
    email: '',
    phone: '',
    state: '',
  });
  const [productDetail, setProductDetail] = useState(null);

  useEffect(() => {
    const cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
    setProductDetail(cart);
    const calculateTotal = () => {
      return cart.reduce((total, item) => {
        return total + calculateTotalPrice(item.salePrice, item.quantity);
      }, 0);
    };


    setTotalPrice(calculateTotal())
    // Listener for cart updates
    const handleCartUpdate = () => {
      const updatedCart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
      setProductDetail(updatedCart);
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleRemove = (productId) => {
    removeFromCart(productId);
    const updatedCart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];

    if (updatedCart.length === 0) {
      toast.info("Your cart is empty. Redirecting to shop.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      Cookies.remove('cart');
      window.dispatchEvent(new Event('cartUpdated'));
      Router('/shop');
    } else {
      toast.info("Product removed from cart.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const initializeBillingInfo = () => {
    const detailsCookie = Cookies.get('userDetails');
    const parsedDetails = detailsCookie ? JSON.parse(detailsCookie) : {};

    setShippingInfo({
      firstName: parsedDetails.shipping?.first_name || '',
      lastName: parsedDetails.shipping?.last_name || '',
      address1: parsedDetails.shipping?.address_1 || '',
      address2: parsedDetails.shipping?.address_2 || '',
      city: parsedDetails.shipping?.city || '',
      postcode: parsedDetails.shipping?.postcode || '',
      country: parsedDetails.shipping?.country || '',
      email: parsedDetails.email || '',
      phone: parsedDetails.shipping?.phone || '',
      state: parsedDetails.shipping?.state || '',
    });
  };
  useEffect(() => {

    const fetchShippingZones = async () => {
      try {
        const consumerKey = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_KEY;
        const consumerSecret = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_SECRET;
        const authHeader = `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`;

        const response = await axios.get(`${process.env.REACT_APP_WOOCOMMERCE_API_URL}wp-json/wc/v3/shipping/zones`, {
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json',
          },
        });
        const zones = response.data;
        const map = zones.reduce((map, zone) => {
          map[zone.name] = zone.id; // Create a map of zone name to zone ID
          return map;
        }, {});
        setShippingZoneMap(map);

        // Now you can use shippingZoneMap in fetchShippingCost
      } catch (error) {
        console.error("Error fetching shipping zones", error);
      }
    };

    const fetchShippingCost = async () => {
      const country = shippingInfo.country;
      const shippingZoneName = shippingZoneMap[country];
      if (shippingZoneName) { // Replace with actual country check
        try {
          const consumerKey = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_KEY;
          const consumerSecret = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_SECRET;
          const authHeader = `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`;
          const response = await axios.get(`${process.env.REACT_APP_WOOCOMMERCE_API_URL}wp-json/wc/v3/shipping/zones/${shippingZoneName}/methods`, {
            headers: {
              'Authorization': authHeader,
              'Content-Type': 'application/json',
            },
          });

          const shippingMethod = response.data.find(method => method.enabled); // Adjust based on your method
          setShippingCost(shippingMethod.settings.cost.value );
        } catch (error) {
          console.error("Error fetching shipping rates", error);
        }
      } else if (shippingInfo.country === "India") {
        try {
          const consumerKey = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_KEY;
          const consumerSecret = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_SECRET;
          const authHeader = `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`;
          const response = await axios.get(`${process.env.REACT_APP_WOOCOMMERCE_API_URL}wp-json/wc/v3/shipping/zones/7/methods`, {
            headers: {
              'Authorization': authHeader,
              'Content-Type': 'application/json',
            },
          });

          const shippingMethod = response.data.find(method => method.enabled); // Adjust based on your method
          setShippingCost(shippingMethod.settings.cost.value );
        } catch (error) {
          console.error("Error fetching shipping rates", error);
        }// Default if outside India
      }
      else {
        setShippingCost(0); // Default if outside India
      }
    };
    fetchShippingZones()
    fetchShippingCost();
  }, [shippingInfo.country,shippingZoneMap]);


  useEffect(() => {
    initializeBillingInfo();

    const cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
    window.dispatchEvent(new Event('cartUpdated'));

    if (cart.length === 0) {
      toast.info("Please add something to your cart to proceed to checkout.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      Router('/shop');
      return;
    }

  }, [isLoggedIn, Router]);

  const handleChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };
  const finalTotal = totalPrice + parseFloat(shippingCost);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const cartItems = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
    try {

      const consumerKey = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_KEY;
      const consumerSecret = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_SECRET;
      const authHeader = `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`;

      // Create an order in WooCommerce
      const orderResponse = await axios.post(`${process.env.REACT_APP_WOOCOMMERCE_API_URL}wp-json/wc/v3/orders`, {
        payment_method: 'juspay', // Use HDFC payment method
        set_paid: false,
        customer_id: customerId,
        email: shippingInfo.email,
        shipping_total: `${shippingCost}`,
        total: `${finalTotal}`,
        billing: {
          first_name: shippingInfo.firstName,
          email: shippingInfo.email,
          last_name: shippingInfo.lastName,
          address_1: shippingInfo.address1,
          address_2: shippingInfo.address2,
          city: shippingInfo.city,
          state: shippingInfo.state,
          postcode: shippingInfo.postcode,
          country: shippingInfo.country,
          phone: shippingInfo.phone,
        },
        shipping: {
          first_name: shippingInfo.firstName,
          last_name: shippingInfo.lastName,
          email: shippingInfo.email,
          address_1: shippingInfo.address1,
          address_2: shippingInfo.address2,
          city: shippingInfo.city,
          state: shippingInfo.state,
          postcode: shippingInfo.postcode,
          country: shippingInfo.country,
          phone: shippingInfo.phone,
        },
        line_items: cartItems.map(item => ({
          product_id: item.productId,
          name: item.name,
          total: item.total,
          quantity: item.quantity,
        })),
        shipping_lines: [{
          method_id: 'flat_rate', // Set to the appropriate shipping method ID
          method_title: 'Flat Rate Shipping', // Set this to your shipping method's name
          total: `${shippingCost}`,
        }],
      }, {
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
      });

      if (orderResponse.status === 201) {
        const order = orderResponse.data;
        setOrderId(order.id)
        fetchUpdatedUserDetails();
        toast.info("Redirecting to Payment Page Please Wait...", {
          position: "top-center",
          autoClose: 1000,
        });
        clearCart();

        // Call the function to initiate payment
        initatePayment(order.id, order.total,finalTotal, shippingInfo);
      } else {
        toast.error("Error creating order", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error creating order or redirecting to payment:', error);
      toast.error('Something went wrong. Please try again.', {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };
  

  const initatePayment = async (orderId, shippingInfo, finalTotal, customerId) => {
    const returnUrl = `https://tcmcricket.com/api/order-success/${orderId}`;
    const id = customerId || "guest";
    // Convert the order total from INR to the selected currency
    //const convertedOrderTotal = conversionRate[selectedCountry] ? finalTotal * conversionRate[selectedCountry] : finalTotal;
    try {

      // Send request to backend Express server
      const response = await axios.post('https://tcmcricket.com/api/initiatePayment', {
        order_id: `${orderId}`,
        // amount: `${convertedOrderTotal}`,  // Use the converted amount here
        amount: `${finalTotal}`,  // Use the converted amount here
        currency: `INR`,
        customer_id: `guest`,
        customer_email: shippingInfo.email,
        customer_phone: shippingInfo.phone,
        payment_page_client_id: `${process.env.REACT_APP_HDFC_PAYMENT_PAGE_CLIENT_ID}`,
        action: 'paymentPage', 
        return_url: returnUrl, // Adjust this URL as needed
        description: 'Complete your payment',
        first_name: shippingInfo.firstName,
        last_name: shippingInfo.lastName,
        payment_filter: {
          allowDefaultOptions: false,
          options: [
            { paymentMethodType: 'NB', enable: true },
            { paymentMethodType: 'UPI', enable: true },
            { paymentMethodType: 'CARD', enable: true },
            { paymentMethodType: 'WALLET', enable: true },
          ],
        },
        "options.create_mandate": "OPTIONAL",
        "mandate.max_amount": "4000.00",
        "mandate.start_date": "1699368604",
        "mandate.end_date": "1763971322",
        "mandate.frequency": "MONTHLY",
        "metadata.expiryInMins": "15",
        "metadata.JUSPAY:gatewayReferenceId": "payu_test",
        "source_object": "PAYMENT_LINK",
        udf1: 'udf1-dummy',
        udf2: 'udf2-dummy',
        send_mail: true,
        send_sms: true,
      });
      // Redirect the user to the payment page
      console.log('resp', response);


      if (response.data.paymentLink) {
        window.location.href = response.data.paymentLink;
      
      } else {
        console.error('No payment link received');
      }
      Router(`/order-success/${orderId}`);
  // await updateWooCommerceOrderPayment(orderId, response.data.id); // Pass WooCommerce Order ID
    } catch (error) {
      console.error('Error initiating payment:', error || error.message);
    }
  };
 
  
  const fetchUpdatedUserDetails = async () => {
    if (!customerId) {
      console.error('Customer ID is missing');
      return;
    }

    try {
      const consumerKey = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_KEY;
      const consumerSecret = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_SECRET;
      const authHeader = `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`;

      const response = await axios.get(`${process.env.REACT_APP_WOOCOMMERCE_API_URL}/wp-json/wc/v3/customers/${customerId}`, {
        headers: {
          'Authorization': authHeader,
          'Content-Type': 'application/json',
        },
      });

      const userData = response.data;
      Cookies.set('userDetails', JSON.stringify(userData), { expires: 6, secure: true, sameSite: 'strict' });
    } catch (error) {
      console.error('Error fetching updated user details:', error);
    }
  };
  return (
    <div className="container mx-auto">
      <div className="grid sm:px-10 lg:grid-cols-2 md:px-8 px-4 xl:px-14 lg:px-10 2xl:px-10 border-t-[1px]">
        <div className="px-4 pt-8 my-3">
          <div className="sticky top-0">
            <p className="text-2xl font-semibold mb-4">Order Summary</p>
            <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
            <CheckoutPreview productDetail={productDetail} handleRemove={handleRemove} />
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-2xl font-semibold mb-4">Shipping Details</p>
          <p className="text-gray-400">Complete your order by providing the details.</p>
          <CheckoutForm finalTotal={finalTotal} shippingCost={shippingCost} handleSubmit={handleSubmit} handleChange={handleChange} orderId={orderId} shippingInfo={shippingInfo} totalPrice={totalPrice} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;


