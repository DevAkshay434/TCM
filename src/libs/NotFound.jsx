import React from 'react'
import { NavLink } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='h-80 w-full flex flex-col justify-center items-center md:px-8 px-4 xl:px-14 lg:px-10 2xl:px-10 mx-auto '>
        <div className='mb-3'>
      <h1 className='text-4xl text-blues font-semibold font-signika  text-center'>404 Page Not Found</h1>
      <p className='text-base mt-2'>The page you were looking for does not exist.</p>
      </div>
      <NavLink to="/" className="bg-blues text-white text-lg rounded-lg  h-10 p-[5px]">Go To Home Page</NavLink>
    </div>
  )
}

export default NotFound
