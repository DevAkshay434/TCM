
import FormatCurrency from "../../Component/Currency/FormatCurrency";
import { TrimSymbol } from '../../Component/Currency/TrimSymbol'
export default function CheckoutPreview({productDetail, handleRemove}) {
  
  const selectedPaymentMethod= "Smart Gateway"
  if (!productDetail || productDetail.length === 0) {
    return <p>No products in the cart.</p>;
  }
  return (
    <>
    <div className="mt-8  space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
       
        {productDetail.map((el,index)=>(
      <div className="flex flex-col items-center rounded-lg bg-white sm:flex-row" key={index}>
        <div className="relative">
        <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={`${el.featuredImage.node.sourceUrl}`} alt={`${el.featuredImage.node.altText}`}  />
                  <span className="sr-only">cart</span>
                  <div className="absolute inline-flex items-center justify-center w-7 h-7 text-base font-normal text-white bg-blues border-2 border-white rounded-full -top-[2px] -end-[13px] ">{el.quantity}</div>
                </div>
       
        <div className="flex w-full flex-col md:flex-row justify-center 
        md:justify-between  gap-2 items-center  pl-6 py-4">
          <div>
            <span className="font-semibold">{el.name}</span>
            {/* <span className="float-right text-gray-400">42EU - 8.5US</span> */}
            <p className="text-lg font-medium text-blues"><FormatCurrency amountInINR={TrimSymbol(el.salePrice)}/></p>
          </div>
          <div>
            <button onClick={()=>handleRemove(el.id)} className= "inline-flex items-center justify-start text-red-400 hover:underline"> <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                    </svg>
                    Remove</button>
          </div>
          </div>
        
    </div>
))}
</div> 
<div className="mt-6 border-t pt-4">
  <h3 className="text-2xl font-semibold mb-4">Payment information</h3>
  <div className="space-y-4">
    

    <div className="flex w-full items-center gap-4 px-2 rounded-md h-20 border-blues border-[1px]">
      <input
        id="smart-gateway"
        type="radio"
        name="payment-method"
        value="Smart Gateway"
        checked={selectedPaymentMethod === 'Smart Gateway'}
        className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
        readOnly
      />
      <div className=" ">
      <label htmlFor="smart-gateway" className=" block text-xl font-medium text-gray-700">
        Smart Gateway
        <span className="ml-20 text-2xl text-red-700  font-semibold"><span className="text-blues">HDFC Smart</span>GATEWAY</span>
      </label>
    
    </div>
    </div>  
    <p className="text-base text-gray-500 mt-4">
            {selectedPaymentMethod === 'Smart Gateway' && 'Credit, Debit Card / Net Banking / UPI'}
          </p>
    
  
</div>
</div>
</>
);
}
