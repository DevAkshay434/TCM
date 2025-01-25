import React, { useState,  useEffect, Suspense, lazy } from 'react';
const Category = lazy(()=> import('../Woocommerce/Category/Category'))
export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  // Detect screen size change
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 769); // Adjust the breakpoint as needed (768px for tablets)
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const handleDropdownToggle = () => {
    if (isSmallScreen) {
      setIsOpen(!isOpen);
    }
  };
  const handleCategoryClick = () => {
    setIsOpen(false);
  };
  return (
    <div
     
      onMouseEnter={() => !isSmallScreen && setIsOpen(true)}  
      onMouseLeave={() => !isSmallScreen && setIsOpen(false)}
    >
      <button
        id="hs-dropdown-default"
        type="button"
        className="py-1 lg:px-4 inline-flex items-center gap-x-2 text-sm font-medium text-gray-800 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={handleDropdownToggle}  
        aria-label="Dropdown"
      >
        <span className="text-xl mt-[-6px]">&#8801;</span>
        <p className=" text-sm">Shop By Category</p>
        <svg
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute thin z-50 transition-all duration-300 top-6 -left-0 xl:w-[50rem] sm:w-[32rem] w-[20rem] xs:w-[24rem] lg:w-[60rem] md:w-[43rem] bg-white shadow-md rounded-lg p-1  z-4"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="hs-dropdown-default"
      
        >
          <Suspense fallback={<></>}>
          <Category  closedropdown={handleCategoryClick}/>
          </Suspense>
        </div>
      )}
    </div>
  );
}
