import './App.css';
import React , { lazy,  Suspense, useLayoutEffect, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './Context/useAuth';
import AOS from 'aos';
import 'aos/dist/aos.css';
import OrderTracking from './Layout/Woocommerce/Order/OrderTracking';
import OrderDetails from './Layout/Woocommerce/Order/OrderDetail';
import OrderSuccess from './Layout/Woocommerce/Order/OrderSuccess';
const Page = lazy(() => import('./Pages/Page'));
const ComingSoon = lazy(() => import('./ComingSoon'));
const Orders = lazy(() => import('./Layout/Woocommerce/My Account/Orders'));
const Shipping = lazy(() => import('./Layout/Woocommerce/My Account/Shipping'));
const Dashboard = lazy(() => import('./Layout/Woocommerce/My Account/Dashboard'));
const Address = lazy(() => import('./Layout/Woocommerce/My Account/Address'));
const Account = lazy(() => import('./Layout/Woocommerce/My Account/Account'));
const Myaccount = lazy(() => import('./Layout/Woocommerce/My Account/Myaccount'));
const Wishlist = lazy(() => import('./Layout/Woocommerce/My Account/Wishlist'));
const Headers = lazy(() => import('./Layout/Header/Headers'));
const Checkout = lazy(() => import('./Layout/Checkout/Checkout'));
const Footer = lazy(() => import('./Layout/Header/Footer'));
const Wishlists = lazy(() => import('./Layout/Header/Wishlist'));
const Cart = lazy(() => import('./Layout/Cart/Cart'));
const ProductPage = lazy(() => import('./Layout/Woocommerce/Product/ProductPage/ProductPage'))
const CollectionProduct = lazy(() => import('./Layout/Woocommerce/Product/CollectionProduct/CollectionProduct'));
Page.preload = () => import('./Pages/Page'); 

function App() { 
 const {isLoggedIn } =useAuth();
  const { pathname } = useLocation(); 
  useEffect(() => {
    AOS.init({
        once:true,});
        AOS.refresh();
        Page.preload();

    }, []); 
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
   
  }, [pathname]);
  return (
    <>
     {/* {
    isLoggedIn ? (   */}

    <Suspense fallback={ <></>}>
      <Headers />
      <Routes>
      <Route path='/admin' element={<Navigate to="/admin/wp-admin" replace />} />
        <Route path="/" element={<Page />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
        <Route path="/order-tracking/:id" element={<OrderDetails />} />
        <Route exact  path="/order-success/:orderId" element={<OrderSuccess />} />
        
        <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/checkout" element={<Checkout />} />
        <Route path="/wishlist" element={<Wishlists />} />
        <Route path="/:uri" element={<Page />} />
        <Route path="/my-account/*" element={<Dashboard />} >
          <Route path="" element={<Account />} />
          <Route path="order" element={<Orders />} />
          <Route path="address" element={<Address />} />
          <Route path="personal-information" element={<Myaccount />} />
          <Route path="address/edit-shipping-address" element={<Shipping />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>
        <Route path="/product/:uri" element={<ProductPage />} />
        <Route path="/product-category/:uri" element={<CollectionProduct />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </Suspense>
      {/* )
      :(
      <ComingSoon />
      )}   */}
  </>
  ); 
}

export default App;
