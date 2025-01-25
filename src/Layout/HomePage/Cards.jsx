import React from 'react'
import { Link } from 'react-router-dom'

const Cards = ({pages}) => {
  return (
    <section className='category lg:pt-10 xl:pt-12 2xl:pt-[70px] pt-6 md:pt-8'>
      <div className="container mx-auto relative">
       <div className="grid grid-cols-1 md:grid-cols-2 2xl:gap-5 lg:grid-cols-3 md:px-8 lg:px-10 2xl:px-10 xl:px-14 px-4 gap-2 md:gap-4 lg:gap-9 ">
       {pages.categoryLink.map((el,index)=>(
        <Link className={`${index ===2 ? 'md:col-span-2 md:w-1/2 md:mx-auto lg:col-span-1 lg:w-full lg:mx-0': '' }`} to={el.link.url}  key={index}>

           <div className='rounded-lg hover:shadow-xl border-blues border-[1px] items-center h-auto justify-between py-4 bg-white flex  px-4 lg:px-2 xl:pl-5' >
            <div>
           <p className='text-lg font-semibold xl:text-2xl '>{el.link.title}</p>
           </div>
           <div>
           <img src={el.icon.node.sourceUrl} className='mx-auto h-32 md:h-48 lg:h-40 2xl:h-52' alt={el.icon.node.altText} loading="lazy"/>
           </div>
        </div>
        </Link>

       ) )}
       </div>
      </div>
    </section>
  )
}

export default Cards
