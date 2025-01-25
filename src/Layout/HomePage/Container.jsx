import React  from 'react'
import { NavLink } from 'react-router-dom'

const Container = ({pages}) => {
  
  return (
    <section className='image-container'>
      <div className="grid grid-cols-1 items-center sm:grid-cols-12  w-full relative">
        <div className="col-span-6" >
        <div className="relative   text-center">
           <img src={`${pages.firstColImage.node.sourceUrl}`} title={`${pages.firstColImage.node.title}`} alt={`${pages.firstColImage.node.altText}`} loading='eager' className='w-full brightness-50	sm:h-72 lg:h-auto' width='630' height='420' />
          
         
          </div>
        </div>
        <div className="col-span-6" >
        <div className="relative  text-center"  >
           <img src={`${pages.secondColImage.node.sourceUrl}`} alt={`${pages.secondColImage.node.altText}`} title={`${pages.secondColImage.node.title}`} loading='eager' className='w-full sm:h-72 lg:h-auto'  width='630' height='420' />
        
          </div>
        </div>
        <div className="absolute flex flex-col gap-2 items-center xl:gap-[14px] text-center w-3/4 sm:w-2/4 xl-w-[40%] top-[35%] md:top-16 xl:top-[28%] 2xs:top-[40%] 2xl:top-[31.2%]  left-[15%] xs:left-[13%] sm:left-[25%] sm:top-10" data-aos='fade-up' data-aos-duration="800"  data-aos-anchor-placement="center-bottom" >
            <h2 className="font-normal text-white text-4xl/[45px]  lg:text-5xl/[55px] xl:text-[58px]/[65px] 2xl:text-[72px]/[86px] ">{pages.heading}
            </h2>
            <NavLink to={`${pages.button1Link.url}`} className='2xl:h-10 2xl:w-28  xl:w-28 h-[30px] lg:h-8 w-24  pt-[4.5px] lg:pt-[6px] xl:pt-[4px] 2xl:pt-[6px] grid text-center  bg-blues text-sm  xl:text-base hover:bg-hoverblue
              2xl:text-lg text-white  font-normal rounded-lg '>{pages.button1Link.title}</NavLink>
        </div>
       
</div>
    </section>
  )
}

export default Container
