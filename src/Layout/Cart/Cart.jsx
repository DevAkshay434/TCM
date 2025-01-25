import React, { lazy, Suspense, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie'
import Loader from '../../libs/Loader'
const CartItem = lazy(()=> import ('./CartItem'));
const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
      const cart =Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
      setCartItems(cart);
    
    }, []);
    const handleIncrement = (index) => {
      const updatedCart = [...cartItems];
      updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
      setCartItems(updatedCart);
      Cookies.set('cart', JSON.stringify(updatedCart));
    };
    const handleDecrement = (index) => {
      const updatedCart = [...cartItems];
      if ((updatedCart[index].quantity || 1) > 1) {
        updatedCart[index].quantity = (updatedCart[index].quantity || 1) - 1;
        setCartItems(updatedCart);
        Cookies.set('cart', JSON.stringify(updatedCart));
      }
    };
    const handleRemoveItem = (index) => {
      const updatedCart = cartItems.filter((_, i) => i !== index);
      setCartItems(updatedCart);
      if (updatedCart.length > 0) {
        Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7,secure: true, sameSite: 'Strict'  });
      } else {
        Cookies.remove('cart');
      }
      window.dispatchEvent(new Event('cartUpdated'));
    };
    const handleQuantityChange = (index, quantity) => {
      const updatedCart = [...cartItems];
      updatedCart[index].quantity = quantity;
      setCartItems(updatedCart);
      Cookies.set('cart', JSON.stringify(updatedCart));
    }
    const calculateTotalPrice = (price, quantity) => {
        const parsedPrice = parseFloat(price.replace(/₹|,/g, '').trim()); // Remove ₹ symbol and commas
        return parsedPrice * (quantity || 1); // Multiply parsed price by quantity
      };
    const getSubtotal = () => {
      return cartItems.reduce((sum, item) => sum + calculateTotalPrice(item.salePrice, item.quantity || 1), 0);
    };
  return (
    <Suspense fallback={<Loader/>}>

    <section className='cart-page py-8 lg:py-10'>
      <div className="container mx-auto px-8 lg:px-16">
      
        {cartItems.length > 0 ? (
            <CartItem
            calculateTotalPrice={calculateTotalPrice} 
             cartItems={cartItems}
             handleDecrement={handleDecrement}
             handleIncrement={handleIncrement}
             handleQuantityChange={handleQuantityChange}
             handleRemoveItem={handleRemoveItem}
             getSubtotal={getSubtotal}/>
   
            
    ):(
        <div className="text-center my-10 flex flex-col justify-center">
        <h3 className='my-4 font-medium text-black text-lg xl:text-2xl'>
            {cartItems.length > 0 ? '' : 'Your cart is currently empty....'}
        </h3>
            <NavLink to='/' className='bg-blues text-sm xl:text-base 2xl:text-lg 2xl:h-10 2xl:w-40 xl:w-40 block text-center h-[34px] w-32 pt-[6px] text-white rounded-md mx-auto'>RETURN TO SHOP</NavLink>
    </div>
    
        )}

      </div>
    </section>
 </Suspense>

  )
}

export default Cart
