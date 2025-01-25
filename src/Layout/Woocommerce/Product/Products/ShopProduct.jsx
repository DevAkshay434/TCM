import React, { useState } from 'react';
import Sidebar from './Filters/Sidebar';
import Product from './SideProduct';

function ShopProduct({ pages }) {
  const [sortOrder, setSortOrder] = useState(''); // Sorting state
  const [selectedCategory, setSelectedCategory] = useState(''); // Category selection state
  const [minValue, setMinValue] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [maxValue, setMaxValue] = useState(20000);
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // Update both the ID and name of the selected category
  };
  const handlePriceChange = (min, max) => {
    setMinValue(min, 10);
    setMaxValue(max, 10);
  };


  return (
    <>
    <section className="shop-page relative bg-gray-100">
      <div className="container mx-auto py-6 md:px-8 px-4 xl:px-10 lg:px-10 2xl:px-10">
        <div className="grid grid-cols-12 gap-8">
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-4">
              <Sidebar pages={pages} selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} onPriceChange={handlePriceChange} />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-9">
            <div className="flex justify-end gap-8 lg:gap-0 items-center mb-4">
              
              <select value={sortOrder} onChange={handleSortChange} className='bg-transparent border-[2px] p-[6px] rounded-md focus:outline-none'>
                <option value="">Featured</option>
                <option value="Sort by A-Z">Sort by A-Z</option>
                <option value="Sort by Z-A">Sort by Z-A</option>
                <option value="Sort by price: low to high">Price (low to high)</option>
                <option value="Sort by price: high to low">Price (high to low)</option>
              </select>
              <div className="block lg:hidden border-[1px]">
                <button onClick={()=> setIsOpen(!isOpen)}>Filter</button>
              </div>
            </div>
            <Product pages={pages} minPrice={minValue} // Pass minPrice
              maxPrice={maxValue} sortOrder={sortOrder} selectedCategory={selectedCategory} />
          </div>
        </div>
      </div>
    </section>
     <div className={`fixed top-0 right-0 w-72 h-full bg-white shadow-md z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'transform translate-x-0' : 'transform translate-x-full'} z-50 p-4`}>
     <button className="text-2xl focus:outline-none mb-4" onClick={() => setIsOpen(false)}>
            &times;
          </button>
     <Sidebar pages={pages} selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} onPriceChange={handlePriceChange} />
     </div>
     </>
  );
}

export default ShopProduct;
