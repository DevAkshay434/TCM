export  const TrimSymbol = (price) => {
    if (typeof price === 'string') {
    
      return parseFloat(price.replace(/[^\d.-]/g, ''));
    }
    return price; 
  };
  