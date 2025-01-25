import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {  NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/useAuth';
import parse from 'html-react-parser'
function Registration() {
  const {isLoggedIn} = useAuth();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
 useEffect(()=>{
  if(isLoggedIn) {
    navigate('/my-account')
  }
 },[isLoggedIn,navigate])
  const handleSubmits = async (e) => {
    e.preventDefault();

    // Reset the message
    setMessage('');

    const consumerKey =process.env.REACT_APP_WOOCOMMERCE_CONSUMER_KEY;
    const consumerSecret=process.env.REACT_APP_WOOCOMMERCE_CONSUMER_SECRET;
    const storeUrl =`${process.env.REACT_APP_WOOCOMMERCE_API_URL}wp-json/wc/v3/customers`;

    const auth = {
      username: consumerKey,
      password: consumerSecret,
    };
let first_name = firstName;
    const customerData = {
      email,
      username,
      first_name,
      password,
    };

    try {
      const response = await axios.post(storeUrl, customerData, {
        auth: auth,
      });

      if (response.status === 201) {
        setMessage('Customer added successfully!');
        setEmail('');
        setUsername('');
        setFirstName('');
        setPassword('');
        navigate('/login')
      } else {
        setMessage('Failed to add customer');
      }
    } catch (error) {
      setMessage(
        `Error: ${
          error.response?.data?.message || 'Something went wrong. Please try again.'
        }`
      );
    }
  };

  return (
    <section className='max-w-full h-screen flex flex-col items-center justify-center bg-gray-100'>
       <div className="max-w-lg w-full p-6 bg-white rounded-lg shadow-md my-10">
      <h2 className='font-semibold text-xl text-center'>Register</h2>
      <form className="flex mt-4 flex-col justify-center" onSubmit={handleSubmits}>
      <input
              className="w-full focus:outline-blue-400 border-2 border-solid rounded-md p-2"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              name="email"
              placeholder="Enter Your First Name"
              required
            /><br />
            <input
              className="w-full focus:outline-blue-400 border-2 border-solid rounded-md p-2"
              type="text"
              name="username"
              placeholder="Enter Your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            /><br />
            <input
              className="w-full focus:outline-blue-400 border-2 border-solid rounded-md p-2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              placeholder="Enter Your Email"
              required
            /><br />
 
        <input
          type="password"
          className="w-full focus:outline-blue-400 border-2 p-2 border-solid rounded-md"
          name="Enter Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        /><br />
        <button type="submit" className=" bg-blue-500 p-2 rounded-md hover:bg-blue-700 text-white font-normal text-sm md:text-base lg:text-lg 2xl:text-xl   my-3">REGISTER</button>
      </form>
      {message && <p>{parse(message)}</p>}
      <p>Have an Account <NavLink to='/login' className='text-blue-400'>Login</NavLink></p>
      </div>
    </section>
  );
}

export default Registration;
