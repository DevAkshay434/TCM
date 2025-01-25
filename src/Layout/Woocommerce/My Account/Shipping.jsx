import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/useAuth';
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Shipping = () => {
    const { setShouldFetchUserDetails } = useAuth();
  const [user, setUserDetail] = useState('');
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    first_name: '',
    last_name: '',
    address_1: '',
    address_2: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
    phone: ''
  });

  useEffect(() => {
    const users = Cookies.get('userDetails') ? JSON.parse(Cookies.get('userDetails')) : {};
    setUserDetail(users);

    if (users.shipping) {
      setShippingAddress({
        first_name: users.shipping.first_name || '',
        last_name: users.shipping.last_name || '',
        address_1: users.shipping.address_1 || '',
        address_2: users.shipping.address_2 || '',
        city: users.shipping.city || '',
        state: users.shipping.state || '',
        postcode: users.shipping.postcode || '',
        country: users.shipping.country || '',
        phone: users.shipping.phone || '',
        email: users.email || '',
      });
    }
  }, []);

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault()
    setShouldFetchUserDetails(true);
    const consumerKey = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_KEY;
    const consumerSecret = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_SECRET;
    const authHeader = `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`;

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_WOOCOMMERCE_API_URL}wp-json/wc/v3/customers/${user.id}`,
        {
          shipping: shippingAddress,
          billing:shippingAddress,
        },
        {
          headers: {
            Authorization: authHeader,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        const updatedUser = {
          ...user,
          shipping: shippingAddress
        };

        setUserDetail(updatedUser);
        Cookies.set('userDetails', JSON.stringify(updatedUser));
        toast.success('Shipping address updated successfully!',{
          position:"top-center", 
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate('/my-account/address');
      }
    } catch (error) {
      console.error('Error updating shipping address', error.message);
      alert('Error updating shipping address' ,error.message);
    }
  };

  return (
    <div className="relative bg-white rounded-lg">
      <div className="text-center">
        <h3 className="mb-5 text-lg font-normal text-gray-500">Update your Shipping address</h3>
        <form>
            <div className="grid grid-cols-2 gap-3">
          <div className='relative'>
            <input
          type="text"
          name="first_name"
          value={shippingAddress.first_name}
          onChange={handleChange}
          className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="First Name"
        />
        <label htmlFor="address1" className="absolute left-3 -top-2.5 text-sm text-gray-600 bg-white px-1">
          First Name
        </label>
        </div>
        <div className='relative'>
            <input
          type="text"
          name="last_name"
          value={shippingAddress.last_name}
          onChange={handleChange}
          className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder=" Last Name"
        />
        <label htmlFor="address1" className="absolute left-3 -top-2.5 text-sm text-gray-600 bg-white px-1">
          Last Name
        </label>
        </div>
        </div>
        <div className="grid grid-cols-2 mt-3 gap-3">
          <div className='relative'>
            <input
          type="text"
          name="phone"
          value={shippingAddress.phone}
          onChange={handleChange}
          className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Phone"
        />
        <label htmlFor="address1" className="absolute left-3 -top-2.5 text-sm text-gray-600 bg-white px-1">
          Mobile Number
        </label>
        </div>
        <div className='relative'>
            <input
          type="text"
          name="email"
          value={shippingAddress.email}
          onChange={handleChange}
          className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Email"
        />
        <label htmlFor="address1" className="absolute left-3 -top-2.5 text-sm text-gray-600 bg-white px-1">
          Email
        </label>
        </div>
        </div>
        <div className="grid grid-cols-2 mt-3 gap-3">
          <div className='relative'>
            <input
          type="text"
          name="address_1"
          value={shippingAddress.address_1}
          onChange={handleChange}
          className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Apartment"
        />
        <label htmlFor="address1" className="absolute left-3 -top-2.5 text-sm text-gray-600 bg-white px-1">
        Apartment
        </label>
        </div>
        <div className='relative'>
            <input
          type="text"
          name="address_2"
          value={shippingAddress.address_2}
          onChange={handleChange}
          className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Address"
        />
        <label htmlFor="address1" className="absolute left-3 -top-2.5 text-sm text-gray-600 bg-white px-1">
          Address
        </label>
        </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 mt-4 gap-3">
          <div className='relative'>
            <input
          type="text"
          name="postcode"
          value={shippingAddress.postcode}
          onChange={handleChange}
          className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Postal Code"
        />
        <label htmlFor="address1" className="absolute left-3 -top-2.5 text-sm text-gray-600 bg-white px-1">
          Postal Code
        </label>
        </div>
        <div className='relative'>
            <input
          type="text"
          name="city"
          value={shippingAddress.city}
          onChange={handleChange}
          className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="City"
        />
        <label htmlFor="address1" className="absolute left-3 -top-2.5 text-sm text-gray-600 bg-white px-1">
          City
        </label>
        </div>
        <div className='relative'>
            <input
          type="text"
          name="country"
          value={shippingAddress.country}
          onChange={handleChange}
          className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Country"
        />
        <label htmlFor="address1" className="absolute left-3 -top-2.5 text-sm text-gray-600 bg-white px-1">
        Country
        </label>
        </div>
        </div>
        </form>
        <div className="flex justify-end h-full items-end mt-4">
          <button
            type="button"
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
            onClick={handleUpdate}
          >
            Update
          </button>
          <Link
            to="/my-account/address"
            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            No, cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
