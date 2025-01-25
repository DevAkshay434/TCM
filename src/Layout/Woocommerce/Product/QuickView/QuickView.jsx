import { useQuery } from '@apollo/client'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { SINGLE_PRODUCT } from '../../../../Queries/Queries'
import { TrimSymbol } from '../../../../Component/Currency/TrimSymbol';
import FormatCurrency from '../../../../Component/Currency/FormatCurrency';

function QuickView  ({uri, setActiveProduct, handleAddToCart}) {

    const { loading,error, data}= useQuery(SINGLE_PRODUCT,{
        variables: {id : uri},
        fetchPolicy:"cache-first",
        nextFetchPolicy:"cache-and-network"
    })
    if (!uri) {
        return <div>No product selected for quick view.</div>;
      }
    if(loading) {
        return <p className='text-center h-24 w-96'>Loading please wait....</p>
      }
      if (error ) {
        return <p>{error.message}</p>
      }
      const product = data?.simpleProduct;


  return (
    <>
    <div className='quickview-product'>
        <div className="grid grid-cols-1 items-center md:grid-cols-2">
            <div>
               <img src={product.featuredImage.node.sourceUrl} alt={product.featuredImage.node.altText} className='w-auto h-52 mx-auto lg:h-96'/>
            </div>
            <div>
            <h3>{product.name}</h3>
            <div className='my-4 mb-3'>
  <span className="font-medium text-sm md:text-base lg:text-lg 2xl:text-xl  text-gray-500 line-through"><FormatCurrency amountInINR={TrimSymbol(product.regularPrice)}/></span>

  <span className="font-semibold text-sm md:text-base lg:text-lg 2xl:text-xl   text-blues ml-2"><FormatCurrency amountInINR={TrimSymbol(product.price)}/></span>

</div>
{product.content && (
    <p>{product.content}</p>
)}
 <NavLink className='hover:underline text-blues text-base' to ={product.uri}>
 View Product Details
    </NavLink>
            </div>
        </div>
    </div>
    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
    <button
      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type="button"
      onClick={() => setActiveProduct(false)}
    >
      Close
    </button>
    <button
    onClick={()=> handleAddToCart(product)}
      className="bg-blues text-white  font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
      type="button"
      
    >
     Add To Cart
    </button>
  </div>
  </>
  )
}

export default QuickView
