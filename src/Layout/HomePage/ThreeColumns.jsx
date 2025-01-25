import React from 'react';
import { Link } from 'react-router-dom';

const ThreeColumns = ({ pages }) => {
  return (
    <section className='news-letter'>
      <div className="container mx-auto md:py-8 py-6 lg:py-10  2xl:py-[70px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 lg:gap-8 md:px-8 md:gap-14 px-4 lg:px-10 xl:px-14 2xl:px-10">
          <div className="col-span-2  gap-2 flex flex-col-reverse md:flex-row items-center lg:border-r-[1.5px] lg:border-gray-200 lg:pr-6 xl:pr-10"> 
            <div className='md:w-3/4 mt-2 md:mt-0'>
              <h2 className="font-normal text-3xl xl:text-4xl/[46px]  2xl:text-6xl/[71px] mb-3">
                {pages.heading}
              </h2>
            
              <Link className='bg-blues text-sm xl:text-base 2xl:text-lg 2xl:h-10 2xl:w-28  xl:w-28 block text-center h-[30px] lg:h-8 w-24 pt-[4.5px] lg:pt-[6px] xl:pt-[4px] 2xl:pt-[6px]  text-white rounded-md' to={pages.button1Link.url}>
                {pages.button1Link.title}
              </Link>
        
            </div>
            <div>
              <img src={pages.containerImage.node.sourceUrl} alt={pages.containerImage.node.altText} loading='lazy' width='553' height="353"/>
            </div>
          </div>

          <div className='form-section col-span-2 lg:col-span-1 flex flex-col border-t-[1.5px] border-gray-200 gap-2 lg:border-none'> 
            <h2 className='text-3xl font-normal xl:text-4xl 2xl:text-5xl/[52px] mt-5'>
              {pages.formColumn.title}
            </h2>
            <form className='mt-4 mx-auto  text-center lg:mx-0 lg:text-start'>
              <input type="text" className='border-black ps-2 2xl:h-16 border-2 h-10 xs:w-96 w-full lg:w-full ' placeholder={pages.formColumn.inputPlaceholder} /><br />
              <Link className='bg-blues xl:text-base 2xl:text-lg 2xl:h-10 2xl:w-28  pt-[4.5px] lg:pt-[6px] xl:pt-[4px] 2xl:pt-[6px]   xl:w-28 block  text-sm text-center h-[30px] lg:h-8 w-24 text-white rounded-md mt-3' type='submit'>
                Submit
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ThreeColumns;
