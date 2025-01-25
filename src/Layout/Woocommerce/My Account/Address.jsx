import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom';
const Address = () => {
const [userdetail, setUserDetail] = useState('');
useEffect(()=>{
  const user = Cookies.get('userDetails') ? JSON.parse(Cookies.get('userDetails')) : [];
  setUserDetail(user);

},[]);

  return (
    <section className='addres-page'>
      <div className="container w-100 md:px-2">
      <p className='text-center mb-4'>The following addresses will be used on the checkout page by default.</p>

        <div className="grid grid-cols-1 ">
        <div className='flex flex-col items-center'>
            <p>Your Address</p>
            
            <Link className='p-2 text-base mt-3 rounded-md transition-all duration-100 ease-in hover:bg-blues hover:text-white' to="/my-account/address/edit-shipping-address">Edit</Link>
           
        </div>
        {userdetail && (
                <div className='grid mt-2 mx-auto'>
                    <p>{userdetail.shipping.first_name} {userdetail.shipping.last_name}</p>
                    <p>{userdetail.shipping.phone}</p>
                    <p>{userdetail.email}</p>
                    <p>{userdetail.shipping.address_1}, {userdetail.shipping.address_2},{userdetail.shipping.postcode}</p>
                    <p>{userdetail.shipping.city}, {userdetail.shipping.country}</p>
                    </div>
            )}
        </div>
      </div>

    </section>
  )
}

export default Address
