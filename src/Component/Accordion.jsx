import React, { useState } from 'react'
import Sanitize from '../libs/Sanitize';
import parse from 'html-react-parser'
const Accordion = ({pages}) => {
    const [activeElement, setActiveElement] = useState("");

  const handleClick = (index) => {
    if (index === activeElement) {
      setActiveElement(null);
    } else {
      setActiveElement(index);
    }
  };
  return (
 <section className='faq-question py-6  px-4 md:px-8 xl:px-14 lg:px-10 2xl:px-10 '>
    <div className="container mx-auto">
{pages.heading && (
    <h1 className="text-3xl text-center mb-8">{pages.heading}</h1>
)}
{pages.listItems.map((el,index)=>(
    <div key={index} className="mb-4">
            <button
              className="cursor-pointer inline-flex justify-between w-full items-center transition-all duration-200 ease-in text-lg font-semibold bg-gray-200 hover:bg-blues  hover:text-white p-4 rounded-md"
              onClick={() => handleClick(index)}
            >
             <h3 className="text-base xl:text-xl font-normal">{el.title}</h3>
              <span  className={`ml-auto h-5 w-5 shrink-0 transition-transform duration-300 ${
                  activeElement === index ? 'rotate-180' : 'rotate-0'
                }`}
              >
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
      </span>
            </button>

            {activeElement === index && (
              <div className="mt-2 p-4 hover:bg-blues  hover:text-white bg-gray-200 transition-all duration-200 ease-in border-l-2 border-blues">
                <p className='text-sm md:text-base font-normal'>{parse(Sanitize(el.content))}</p>
              </div>
            )}
          </div>
))}
</div>
 </section>

        
  

  )
}

export default Accordion
