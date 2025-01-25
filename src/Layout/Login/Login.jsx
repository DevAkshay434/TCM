// Login.jsx (excerpt)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/useAuth';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn, customerId, shouldFetchUserDetails, setShouldFetchUserDetails, setUserDetails } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if(isLoggedIn) {
      navigate('/')
    }
    const fetchUserDetails = async () => {
      if (!customerId) {
        console.error('Customer ID is missing');
        return;
      }

      try {
        const consumerKey = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_KEY;
        const consumerSecret = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_SECRET;
        const authHeader = `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`;

        const response = await axios.get(`${process.env.REACT_APP_WOOCOMMERCE_API_URL}wp-json/wc/v3/customers/${customerId}`, {
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json',
          },
        });

        const userData = response.data;
        setUserDetails(userData);
        setShouldFetchUserDetails(false); // Set to false after fetching
        Cookies.set('userDetails', JSON.stringify(userData), { expires: 6, secure: true, sameSite: 'Lax' });
        navigate('/');
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchUserDetails();
        if (isLoggedIn && shouldFetchUserDetails && customerId) {
      fetchUserDetails();
    }
  }, [isLoggedIn, shouldFetchUserDetails,navigate, setShouldFetchUserDetails,setUserDetails,  customerId]); // Add fetchUserDetails to the dependencies


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await fetch(`${process.env.REACT_APP_WOOCOMMERCE_API_URL}/wp-json/jwt-auth/v1/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (response.ok && result.token) {
        login(result.token);
        toast.success('Login successful! Redirecting...',{
          position:"top-center", 
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setShouldFetchUserDetails(true); // Trigger fetching user details
     
      } else {
        const errorMessage = 'Invalid credentials. Please try again.';

        toast.error(errorMessage, {
          position:"top-center", 
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error('Error logging in:', error.response ? error.response.data : error.message);
      setMessage('Something went wrong. Please try again.');
    }
  };

  



  return (
    <section className='max-w-full h-screen flex flex-col items-center justify-center bg-gray-100'>
      <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-md my-10">
        <h2 className='font-semibold text-xl text-center'>Login</h2>
        <form className="flex my-2 flex-col justify-center" onSubmit={handleSubmit}>
          <label className="mb-2 text-lg" htmlFor="username">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 focus:outline-blue-400 border-2 border-solid rounded-md"
            id="username"
            placeholder="Email"
            required
          /><br />
          <label className="mb-2 text-lg" htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full focus:outline-blue-400 border-2 border-solid rounded-md p-2"
            id="password"
            placeholder="Password"
            required
          /><br />
          <button type="submit" className="bg-blues p-2 rounded-md hover:opacity-90 text-white font-normal text-sm md:text-base lg:text-lg 2xl:text-xl my-3">LOGIN</button>
        </form>
        {message && <p>{message}</p>}
        <p className='text-md'>Don't Have an Account <NavLink to="/register" className='text-blue-400'> Signup</NavLink></p>
      </div>
    </section>
  );
};

export default Login;
