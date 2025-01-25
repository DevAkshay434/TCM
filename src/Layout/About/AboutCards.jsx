import React from 'react'
import Sanitize from '../../libs/Sanitize'
import parse from 'html-react-parser'
const AboutCard =({pages})=>{
return (
    <>
    <section className="our-journey 2xl:py-[50px] xl:py-8 lg:py-6 py-4">
<div className="container mx-auto md:px-8 px-4 lg:px-10 2xl:px-10 xl:px-14 ">
<h2 className="text-4xl/[45px]   lg:text-5xl/[55px] xl:text-[58px]/[65px] 2xl:text-[72px]/[86px] lg:mb-4 text-center">{pages.title}</h2>
<div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-4 mt-6 mb-3 justify-center">
    
   {pages.card.map((item,index)=>(
    <div className="flex lg:w-72 xl:w-96 flex-col justify-center items-center gap-5 cursor-pointer mx-auto mt-4 lg:mt-0" key={index}>
        <img src={item.icon.node.sourceUrl} title={item.icon.node.title} alt={item.icon.node.altText} className=" w-auto h-28 xl:h-36 2xl:h-52  hover:scale-110 transform transition-transform duration-1000 ease-in-out" />
        <h3 className="font-normal text-xl xl:text-2xl">{item.text}</h3>
        <p className='text-sm md:text-base font-normal text-center 2xl:text-xl '>{parse(Sanitize(item.paragraph))}</p>
    </div>
   ))} 
</div>
</div>
    </section>
    </>
)

}
export default AboutCard