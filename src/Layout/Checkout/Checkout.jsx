import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/useAuth';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CheckoutForm from './CheckoutForm';
import CheckoutPreview from './CheckoutPreview';
import axios from 'axios';
import { toast } from 'react-toastify';
import { clearCart, removeFromCart } from '../../libs/CartUtils';
//import { useCurrency } from '../../Context/useCurrency';
const calculateTotalPrice = (price, quantity) => {
  const numericPrice = parseFloat(price.replace(/₹|,/g, '').trim());
  const numericQuantity = parseFloat(quantity);
  return numericPrice * numericQuantity;
};
const handleOneTimeReload = () => {
  const hasReloaded = sessionStorage.getItem("checkout_reloaded");
  if (!hasReloaded) {
    sessionStorage.setItem("checkout_reloaded", "true");
    window.location.reload();
  }
};
const Checkout = () => {
  const [orderId, setOrderId] = useState('');
  const Router = useNavigate();
  const { isLoggedIn, customerId } = useAuth();
  const [shippingCost, setShippingCost] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingZoneMap, setShippingZoneMap] = useState({});
  //const { selectedCountry, conversionRate } = useCurrency(); // Get selected currency and conversion rate
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
  useEffect(() => {
    handleOneTimeReload();
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
          setShippingCost(shippingMethod.settings.cost.value);
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
          setShippingCost(shippingMethod.settings.cost.value);
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
  }, [shippingInfo.country, shippingZoneMap]);


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
    const requestData = {
      shippingInfo,
      cartItems,
      customerId: customerId || null,
    };

    try {
      const response = await axios.post('https://tcmcricket.com/api/create-order', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        const order = response.data;
        setOrderId(order.order_id);
        fetchUpdatedUserDetails();
        toast.info('Redirecting to Payment Page. Please wait...', {
          position: 'top-center',
          autoClose: 20000,
          hideProgressBar: true,
        });
        initiatePayment(order.order_id, shippingInfo);
        clearCart();
      } else {
        toast.error('Error creating order', {
          position: 'top-center',
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error('Error creating order:', error.response ? error.response.data : error.message);
      toast.error('Something went wrong. Please try again later.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };
  // Frontend: Initiate Payment
  const initiatePayment = async (orderId) => {
    const returnUrl = `https://tcmcricket.com/orders/order-success/${orderId}`; 

    try {
      const response = await axios.post('https://tcmcricket.com/api/initiatePayment', {
        order_id: `${orderId}`, 
        action: 'paymentPage',
        return_url: returnUrl,
        currency: 'INR',
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
        description: 'Complete your payment',
      });

      if (response.data.paymentLink) {
        window.location.href = response.data.paymentLink;
      } else {
        toast.error('Unable to initiate payment. Please try again later.');
      }
    } catch (error) {
      console.error('Error initiating payment:', error.message);
      toast.error('Error initiating payment. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
      });
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


