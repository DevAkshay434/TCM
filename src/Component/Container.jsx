import React from 'react'

const Container = ({image, heading, paragraph,alt}) => {
  return (
    <div className='container  mx-auto my-10  px-14 lg:px-32'>
      <div className="grid grid-cols-1 text-center">
       
            <h2 className='font-semibold text-4xl mb-9'>{heading}</h2>
            <p className='text-black text-sm lg:text-lg md:text-base' dangerouslySetInnerHTML={{__html:paragraph}} />
        </div>
    </div>
  )
}

export default Container
