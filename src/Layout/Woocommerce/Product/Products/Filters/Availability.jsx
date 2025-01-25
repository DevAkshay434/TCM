import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PRODUCT, FILTER_PRODUCT } from '../../../../../Queries/Queries';

const Availability = ({ item, selectedCategory }) => {
  const { loading, error, data } = useQuery(
    selectedCategory ? FILTER_PRODUCT : GET_PRODUCT, 
    {
      variables: selectedCategory ? { id: selectedCategory } : {},
      fetchPolicy: 'cache-first',
      nextFetchPolicy: 'cache-and-network',
    }
  );

  const [inStockChecked, setInStockChecked] = useState(false);
  const [outOfStockChecked, setOutOfStockChecked] = useState(false);
  const [inStockCount, setInStockCount] = useState(0);
  const [outOfStockCount, setOutOfStockCount] = useState(0);

  useEffect(() => {
    if (data) {
      const products = selectedCategory 
        ? data.productCategory.contentNodes.edges.map((edge) => edge.node) 
        : data.products.edges.map((edge) => edge.node);

      const inStock = products.filter((product) => product.stockStatus === 'IN_STOCK').length;
      const outOfStock = products.filter((product) => product.stockStatus === 'OUT_OF_STOCK').length;

      setInStockCount(inStock);
      setOutOfStockCount(outOfStock);
    }
  }, [data, selectedCategory]);

  const handleInStockChange = () => {
    setInStockChecked(!inStockChecked);
    setOutOfStockChecked(false); // Ensure only one option is selected
  };

  const handleOutOfStockChange = () => {
    setOutOfStockChecked(!outOfStockChecked);
    setInStockChecked(false); // Ensure only one option is selected
  };

  if (loading || error) return null;

  return (
    <>
      {item.filter.map((el, itemIndex) => (
        <li className="flex items-center justify-center pl-11" key={itemIndex}>
          <input
            type="checkbox"
            checked={itemIndex === 0 ? inStockChecked : outOfStockChecked}
            onChange={itemIndex === 0 ? handleInStockChange : handleOutOfStockChange}
          />
          <button 
            onClick={itemIndex === 0 ? handleInStockChange : handleOutOfStockChange} 
            className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group"
          >
            {el.filtertext} ({itemIndex === 0 ? inStockCount : outOfStockCount})
          </button>
        </li>
      ))}
    </>
  );
};

export default Availability;
