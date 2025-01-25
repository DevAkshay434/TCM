import React, {lazy, Suspense} from 'react'
import { Link } from 'react-router-dom'
const ProductCarousel = lazy(()=> import('./ProductCarousel'))
const Support = ({pages}) => {
  return (
    <section className="about">
       <div className=" h-full" >
        <div className="grid  items-center 2xl:pr-10 grid-cols-1  sm:grid-cols-2 w-full relative"> 
<div className=' relative'>
    <img  src={pages.containerImage.node.sourceUrl} alt={pages.containerImage.node.altText} loading='lazy' className='w-full h-auto ' height="761" width="818"/> 
    <div className='bg-cover absolute top-0 h-full text-center  text-white flex flex-col items-center justify-center bg-no-repeat'>
    <h2 className=' w-3/4 xl:w-[65%] 2xl:w-[55%]  text-3xl/[40px] lg:text-4xl/[40px] xl:text-[45px]/[50px] 2xl:text-[53px]/[60px] mb-2 font-normal'>{pages.heading}</h2>
    <Link to={pages.button1Link.url} className='bg-black  text-sm xl:text-base 2xl:text-lg 2xl:h-10 2xl:w-28  xl:w-28 block text-center  pt-[4.5px] lg:pt-[6px] xl:pt-[4px] 2xl:pt-[6px]  h-[30px] lg:h-8 w-24  text-white rounded-md'>{pages.button1Link.title}</Link>
    </div>
 </div>

<div className='pb-4 '> 
  <Suspense fallback={<></>}>
  <ProductCarousel/>
  </Suspense>
</div>
        </div>
        </div>
    </section>
  )
}

export default Support
