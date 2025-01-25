import Cookies from 'js-cookie';
export const clearCart = () => {
  
  Cookies.set('cart', JSON.stringify([]), { expires: 7 });
  
  window.dispatchEvent(new Event('cartUpdated'));
  
  return 'All products have been removed from your cart.';
};
export const removeFromCart = (productId) => {
  let cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
  const updatedCart = cart.filter(item => item.id !== productId);
  Cookies.set('cart', JSON.stringify(updatedCart), { expires: 7 });
  window.dispatchEvent(new Event('cartUpdated'));
  return `Product has been removed from your cart.`;
};
// Add to cart function
export const addToCart = (product, quantity = 1) => {
  let cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];
  const existingProductIndex = cart.findIndex(item => item.id === product.id);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += quantity;
  } else {
    cart.push({ ...product, quantity });
  }

  Cookies.set('cart', JSON.stringify(cart), { expires: 7 });
  window.dispatchEvent(new Event('cartUpdated'));
  return `${product.name} has been added to your cart.`;
};

// Add to wishlist function
export const addToWishlist = (product) => {
  let wishlist = Cookies.get('wishlist') ? JSON.parse(Cookies.get('wishlist')) : [];
  const existingProduct = wishlist.find(item => item.id === product.id);

  if (!existingProduct) {
    wishlist.push({ ...product });
    Cookies.set('wishlist', JSON.stringify(wishlist), { expires: 7 });
    window.dispatchEvent(new Event('wishlistUpdated'));
    return `${product.name} has been added to your wishlist.`;
  }

  return `${product.name} is already in your wishlist.`;
};
