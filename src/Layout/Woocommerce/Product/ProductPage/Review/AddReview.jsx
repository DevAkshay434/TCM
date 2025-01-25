import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../.../../../../../../Context/useAuth'

const AddReview = ({ product, user }) => {
  const [review, setReview] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0); 
  const [name, setName] = useState(user.first_name || '');
  const timeoutRef = useRef(null);
  const { isLoggedIn } = useAuth();
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    if (!review.trim()) {
      setMessage('Review comment is empty.');
      timeoutRef.current = setTimeout(() => {
        setMessage('');
      }, 2000);
      return;
    }
   
    const consumerKey = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_KEY;
    const consumerSecret = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_SECRET;
    const storeUrl = `${process.env.REACT_APP_WOOCOMMERCE_API_URL}wp-json/wc/v3/products/reviews`;
    const auth = {
      username: consumerKey,
      password: consumerSecret,
    };

    const userName = isLoggedIn ? user.first_name : name || 'guest';
    const userEmail = user.email || 'guest';
    const id = product.productId;

    const customerData = {
      review,
      rating,
      product_id: id,
      reviewer: userName,
      reviewer_email: userEmail,
    };
 
    try {
      const response = await axios.post(storeUrl, customerData, { auth });
      if (response.status === 201) {
       
        setMessage('Review added successfully!');
        setReview('');
        setName('');
        setRating(0);
    
        console.log('response',response.data)
        timeoutRef.current = setTimeout(() => {
          setMessage('');
        }, 2000);
      } else {
        setMessage('Failed to add review.');
      }
    } catch (error) {
      console.error("Error details:", error.response.data);
      setMessage(
        `Error: ${error.response?.data?.message || 'Something went wrong. Please try again.'}`
      );
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className='py-3 border-b'>
      <h3 className='font-normal text-xl xl:text-2xl 2xl:text-3xl mb-3 text-center'>Write a Review</h3>
      <form className='mx-auto text-center' onSubmit={handleSubmit}>
        <div className="flex flex-col pb-4">
          <h4>Rating</h4>
          <div>
            {[...Array(5)].map((_, starIndex) => {
              const currentStar = starIndex + 1;
              return (
                <span
                  key={starIndex}
                  onClick={() => setRating(currentStar)}
                  onMouseEnter={() => setHover(currentStar)}
                  onMouseLeave={() => setHover(0)}
                  className={`cursor-pointer text-4xl ${currentStar <= (hover || rating) ? 'text-yellows' : 'text-rating'}`}
                >
                  &#9733;
                </span>
              );
            })}
          </div>
        </div>
        <textarea 
          value={review} 
          onChange={(e) => setReview(e.target.value)} 
          name="Write a comment" 
          placeholder="Write a comment" 
          className='resize-none h-24 mb-2 w-3/4 px-3 outline-none p-1 focus:border-blues border-2'  
          required 
        />
        <br />
        {!isLoggedIn && 
          <input 
            type="text" 
            value={name}  
            onChange={(e) => setName(e.target.value)}  
            className='h-10 mb-4 w-3/4 outline-none p-1 px-3 focus:border-blues border-2' 
            placeholder='Enter Your Name'
          />
        }
        <br/>
    
        <button className='rounded-lg hover:bg-hoverblue text-lg text-white bg-blues p-1 h-10 w-1/3 ml-2' type="submit">Submit</button>
        {message && <p className='text-lg text-blues'>{message}</p>}
      </form>
    </div>
  );
};

export default AddReview;
