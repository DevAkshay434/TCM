
import FormatCurrency from "../../Component/Currency/FormatCurrency";
import { useCurrency } from "../../Context/useCurrency";
import Select from 'react-select';

export default function CheckoutForm({handleSubmit,shippingCost, finalTotal, handleChange, shippingInfo,totalPrice }) {
  const {  countryNames, isLoadingCountries } = useCurrency();

  const handleCountryChange = (selectedOption) => {
    
    handleChange({
      target: { name: 'country', value:selectedOption.label}, // Use the label for the country name
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 my-3">
            <div>
              <label htmlFor="firstName" className="mb-1 block text-sm font-medium text-gray-900 "> Your First Name * </label>
              <input type="text"    name="firstName" value={shippingInfo.firstName}  onChange={handleChange} id="your_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blues focus:ring-blues focus:outline-blues" placeholder="First Name" required />
            </div>

            <div>
              <label htmlFor="lastName" className="mb-1 block text-sm font-medium text-gray-900 ">Your Last Name </label>
              <input type="text"
            name="lastName"
            value={shippingInfo.lastName}
            onChange={handleChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blues focus:ring-blues focus:outline-blues" placeholder="Last Name"   />
            </div>
            <div className="sm:col-span-2">
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-900 ">Email</label>
            <input
          type="email"
          name="email"
          value={shippingInfo.email}
          onChange={handleChange} 
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blues focus:ring-blues focus:outline-blues "
          placeholder="Enter Your Email"
          required
          // Make this field read-only
        />
            </div>
            <div>
            <label htmlFor="address1" className="mb-1 block text-sm font-medium text-gray-900 ">Address </label>
            <input
          type="text"
          name="address1"
          value={shippingInfo.address1}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-200 p-2.5 bg-gray-50 text-sm shadow-sm outline-none focus:z-10 focus:border-blues focus:ring-blues"
          placeholder="Address"
          required
        />
            </div>
            <div>
            <label htmlFor="address2" className="mb-1 block text-sm font-medium text-gray-900 ">Address line 2 (optional) </label>
            <input
             type="text"
             name="address2"
             value={shippingInfo.address2}
             onChange={handleChange}
          className="w-full rounded-md border border-gray-200 p-2.5 text-sm bg-gray-50 shadow-sm outline-none focus:z-10 focus:border-blues focus:ring-blues"
          placeholder="Address Line 2 "
        />
            </div>
            <div >
            <label htmlFor="city" className="mb-1 block text-sm font-medium text-gray-900 ">
          City
        </label>
        <input
          type="text"
          name="city"
          value={shippingInfo.city}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-200 bg-gray-50 p-2.5 text-sm shadow-sm outline-none focus:z-10 focus:border-blues focus:ring-blues"
          placeholder="Enter Your City"
          required
        />
       
      </div> 
      <div>
            <label htmlFor="postcode" className="mb-1 block text-sm font-medium text-gray-900 ">
         Postal/Zip Code
        </label>
        <input
          type="text"
          name="postcode"
          value={shippingInfo.postcode}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-200 bg-gray-50 p-2.5 text-sm shadow-sm outline-none focus:z-10 focus:border-blues focus:ring-blues"
          required
          placeholder="Enter Your Zip Code"
        />
       
      </div> 
      <div>
            <label htmlFor="state" className="mb-1 block text-sm font-medium text-gray-900 ">
         State
        </label>
        <input
          type="text"
          name="state"
          value={shippingInfo.state}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-200 bg-gray-50 p-2.5 text-sm shadow-sm outline-none focus:z-10 focus:border-blues focus:ring-blues"
          required
          placeholder="Enter Your State"
        />
       
      </div> 
      <div>
            <label htmlFor="country" className="mb-1 block text-sm font-medium text-gray-900 ">
   Country/Region
        </label>
        {/* <input
          type="text"
          name="country"
          value={shippingInfo.country}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-200 bg-gray-50 p-2.5 text-sm shadow-sm outline-none focus:z-10 focus:border-blues focus:ring-blues"
          placeholder="Country/Region"
        /> */}
        <Select
           options={countryNames} // Use countryNames, which contains the country names
           onChange={handleCountryChange} // Update on country change
           placeholder="Select Country/Region"
           value={countryNames.find(country => country.label === shippingInfo.country)}
           required
        />
      </div>
     
     
      <div className="sm:col-span-2">
            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-900 ">
      Phone Number
        </label>
        <input
          type="text"
          name="phone"
          value={shippingInfo.phone}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-200 bg-gray-50 p-2.5 text-sm shadow-sm outline-none focus:z-10 focus:border-blues focus:ring-blues"
          placeholder="Phone Number"
          required
        />
       
      </div>
      
            </div>
            <div className="mt-6 border-t border-b py-2">
        <div className="flex items-center justify-between lg:mb-3  ">
          <p className="text-sm lg:text-base font-medium text-gray-900">Subtotal</p>
          <p className="font-medium text-blues"><FormatCurrency amountInINR={totalPrice}/></p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm lg:text-base font-medium text-gray-900">Delivery Charges</p>
          <p className="font-medium text-blues"><FormatCurrency amountInINR={shippingCost}/></p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm lg:text-base font-semibold text-gray-900">Total</p>
        <p className="text-xl font-semibold text-blues"><FormatCurrency amountInINR={finalTotal}/></p>
      </div>
    <button type="submit" className="mt-4 mb-8 w-full rounded-md bg-blues px-6 py-3 font-medium text-white">Place Order</button>
    </form>
  
  );
}
