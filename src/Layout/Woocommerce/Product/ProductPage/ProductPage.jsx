import React, { useMemo, useState, useCallback } from 'react';
import Carousel from './Carousel';
import { SINGLE_PRODUCT } from '../../../../Queries/Queries';
import Loader from '../../../../libs/Loader';
import { useQuery } from '@apollo/client';
import ProductDetail from './ProductDetail';
import { Link, useParams } from 'react-router-dom';
import Product from './Product';
import ProductCar from '../ProductCarousel/ProductCar';
import { addToCart, clearCart } from '../../../../libs/CartUtils';
import {toast} from 'react-toastify'
const ProductPage = () => {
  const { uri } = useParams();
  const uriString = useMemo(() => String(uri || ''), [uri]); // Ensure URI is a string
  const  { loading, error, data } = useQuery(SINGLE_PRODUCT, {
    variables : {id: uriString},
fetchPolicy: 'cache-first',
        nextFetchPolicy: 'cache-and-network'
    }); 
  
  const [message, setMessage] = useState('');
  const [quantity, setQuantity] = useState(1);

 
 
  const product = data?.simpleProduct;
  const handleAddToCart = useCallback(() => {
    if (product) {
      const cartMessage = addToCart(product, quantity); // Use the shared addToCart function
      setMessage(cartMessage);
    }
  }, [product, quantity]);
  const handleBuyNow=useCallback(()=> {
    if(product) {
      clearCart();
      addToCart(product,quantity);
      toast.success('Proceeding to checkout', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }); 
    }
  }, [product, quantity])
  
  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (newQuantity > 0) setQuantity(newQuantity);
  };
  if (loading) return <Loader />;
  if (error) return <p>{error.message}</p>;

  
  return (
    <>
    <section className='product-page'>

      <div className="container mx-auto product-overview px-4 md:px-8 xl:px-14 lg:px-10 2xl:px-10  2xl:py-[70px] md:py-8  py-16 lg:py-10">
        {message && (
          <div className='flex my-4 p-2 items-center gap-2 bg-white h-14 border-2 border-t-blues'>
            <p className='ms-2 text-lg font-medium'>{message}</p>
            <button className="rounded-lg bg-blues p-2 h-10">
              <Link className='text-decoration-none  font-medium text-white' to='/cart'>View Cart</Link>
            </button>
          </div>
        )}
        <div className="shadow-lg py-2 px-3">
          <div className="grid items-center gap-8 grid-cols-1 lg:grid-cols-2">
            <div>
              {product && <Carousel product={product} />}
            </div>
            <div>
              {product && (
                <ProductDetail 
                buy={handleBuyNow}
                  cart={handleAddToCart}
                  increment={handleIncrement}
                  decrement={handleDecrement}
                  handleQuantityChange={handleQuantityChange}
                  quantity={quantity}
                  product={product}
                />
              )}
            </div>
          </div>
     
      
      <div className="product-information mt-4">

      <Product product={product}/>
      </div>
      </div>
      
      </div>
      </section>
      
      <section className='recommend-product'>
        <div className="container mx-auto">
        <div className='px-4 md:px-8 xl:px-14 lg:px-10 2xl:px-10 pb-9'>
          <h2 className='bg-blues text-white p-2 font-normal text-2xl lg:text-3xl 2xl:text-4xl'>Recommend Products</h2>
        <ProductCar />
      </div>
        </div>
        </section></>
  );
};

export default ProductPage;
