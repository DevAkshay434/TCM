import React from 'react'
import { NavLink } from 'react-router-dom'

const Newsletter = () => {
  return (
    <div className='flex flex-wrap  w-full flex-row items-center gap-3 md:gap-0 justify-center md:justify-between'>
      <div className="w-2/4">
        <h4 className="font-normal text-3xl/[40px] xl:text-5xl 2xl:text-6xl break-words">Join Our Newsletter</h4>
      </div>
      <div className='flex gap-2 flex-col md:flex-row items-center flex-wrap'>
        <input type="text" placeholder='Your Email*'  className='bg-transparent border-white border-[1px] rounded-md h-8 w-60 lg:w-72 text-sm pl-3'/>
        <NavLink className='bg-blues text-sm xl:text-base 2xl:text-lg 2xl:h-10 2xl:w-28  xl:w-24  pt-[4.5px] lg:pt-[6px] xl:pt-[4px] 2xl:pt-[6px] block text-center h-[30px] lg:h-8 w-24 text-white rounded-md' to='/contact-us'>Contact us</NavLink>
      </div>
    </div>
  )
}

export default Newsletter
