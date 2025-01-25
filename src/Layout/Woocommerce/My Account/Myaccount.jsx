import React, {useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/useAuth';
import Cookies from 'js-cookie'
import axios from 'axios';
import { toast } from 'react-toastify';
const Myaccount = () => {
    const { setShouldFetchUserDetails } = useAuth();
    const [user, setUserDetail] = useState('');
    const navigate = useNavigate();
  
    const [shippingAddress, setShippingAddress] = useState({
      first_name: '',
      last_name: '',
      email:'',
      username:'',
      phone: '',
      avatar_url:'',
    });
  
    useEffect(() => {
      const users = Cookies.get('userDetails') ? JSON.parse(Cookies.get('userDetails')) : {};
      setUserDetail(users);
  
      if (users) {
        setShippingAddress({
          first_name: users.first_name || '',
          last_name: users.last_name || '',
        username: users.username || '',
          phone: users.shipping.phone || '',
          email: users.email || '',
          avatar_url: users.avatar_url || '',
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
        e.preventDefault();
      setShouldFetchUserDetails(true);
      const consumerKey = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_KEY;
      const consumerSecret = process.env.REACT_APP_WOOCOMMERCE_CONSUMER_SECRET;
      const authHeader = `Basic ${btoa(`${consumerKey}:${consumerSecret}`)}`;
  
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_WOOCOMMERCE_API_URL}wp-json/wc/v3/customers/${user.id}`,
          {
            username:shippingAddress.username,
            email: shippingAddress.email,
            phone: shippingAddress.phone,
            first_name:shippingAddress.first_name ,
            last_name:shippingAddress.last_name ,
          },
          {
            headers: {
              Authorization: authHeader,
              'Content-Type': 'application/json'
            }
          }
        );
  
        if (response.status === 200) {
          const updatedUser = response.data
  
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
          navigate('/my-account');
        }
      }catch (error) {
        if (error.response) {
          console.error('Error updating user details:', error.response.data);
          toast.error(`Error: ${error.response.data.message}`,
            {
                position:"top-center", 
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
              }
          );
        } else {
          console.error('Error updating user details:', error.message);
          toast.error('Error updating user details',{
            position:"top-center", 
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      }
    };
  
  return (
    <div className='grid grid-cols-12 gap-6'>
<div className="col-span-12 ">
    <form onSubmit={handleUpdate} >
        <div className="grid md:grid-cols-2 gap-5">
        <div className='relative md:col-span-2'>
            <input
          type="text"
          name="username"
          value={shippingAddress.username}
          onChange={handleChange}
          className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blues focus:border-blues"
          placeholder="username"
          disabled
        />
        <label htmlFor="address1" className="absolute left-3 -top-2.5 text-sm text-gray-600 bg-white px-1">
          Username
        </label>
        </div>
        <div className='relative'>
            <input
          type="text"
          name="first_name"
          value={shippingAddress.first_name}
          onChange={handleChange}
          className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blues focus:border-blues"
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
          className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blues focus:border-blues"
          placeholder="Last Name"
        />
        <label htmlFor="address1" className="absolute left-3 -top-2.5 text-sm text-gray-600 bg-white px-1">
          Last Name
        </label>
        </div>
        <div className='relative md:col-span-2'>
            <input
          type="text"
          name="email"
          value={shippingAddress.email}
          onChange={handleChange}
          className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blues focus:border-blues"
          placeholder="Your Email "
        />
        <label htmlFor="address1" className="absolute left-3 -top-2.5 text-sm text-gray-600 bg-white px-1">
          Email
        </label>
        </div>
        <div className='relative md:col-span-2'>
            <input
          type="text"
          name="phone"
          value={shippingAddress.phone}
          onChange={handleChange}
          className="block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blues focus:border-blues"
          placeholder="Your Phone Number"
        />
        <label htmlFor="address1" className="absolute left-3 -top-2.5 text-sm text-gray-600 bg-white px-1">
         Phone Number
        </label>
        </div>
        </div>
   
   
    <div className="text-end mt-4">
        <button  className='bg-blues text-white p-2 w-28 rounded-md'>Update</button>
    </div>
    </form>
</div>

    </div>
  )
}

export default Myaccount
