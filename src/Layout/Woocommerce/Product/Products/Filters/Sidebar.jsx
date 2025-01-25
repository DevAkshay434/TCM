import React, { useState, lazy, Suspense } from 'react';
const Availability = lazy(() => import('./Availability'));
const Category = lazy(() => import('./Category'));
const Sizes = lazy(() => import('./Sizes'));
const Price = lazy(() => import('./Price'));

const Sidebar = ({ pages, onCategorySelect ,selectedCategory,onPriceChange }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };
console.log('page',pages);
  return (
    <div className="sidebar">
      {pages?.sidebarFilter.map((el, index) =>
        <div className="my-3" key={index}>
          <button
            type="button"
            className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100"
            onClick={() => handleToggle(index)}
            aria-expanded={openDropdown === index}
          >
            <span className="flex-1 ml-3 text-xl font-medium font-signika text-left whitespace-nowrap">{el.name}</span>
            <svg
              className={`w-6 h-6 transition-transform ${openDropdown === index ? 'rotate-180' : ''
                }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>

          <ul
            className={`py-2 space-y-2 transition-all duration-300 ease-in-out overflow-hidden ${openDropdown === index ? 'max-h-52 opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            { (
              // Conditional rendering based on index
              index === 0 ? (
                <Suspense fallback={<div></div>}><Price item={el} onPriceChange={onPriceChange}/> </Suspense>
                
               ) :
                index === 1 ? (<Suspense fallback={<div></div>}><Category item={el} onCategorySelect={onCategorySelect}/> </Suspense>)
                  : index === 2 ? (<Suspense fallback={<div></div>}><Availability item={el} selectedCategory={selectedCategory} />  </Suspense>) :
                    index === 3 ? (
                    <Suspense fallback={<div></div>}> <Sizes item={el} />
                    </Suspense>)
                     :
                      (<></>)
            ) }
          </ul>
          <hr className="border-b" />
        </div>
      )}




    </div>
  );
};

export default Sidebar;
