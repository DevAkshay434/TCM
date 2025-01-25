import React from 'react'

export default function CardContact({pages}) {
    return(
    <div className='my-5 md:px-8 xl:px-14 px-4 lg:px-10 2xl:px-10'>
        <div className="grid grid-cols-1 gap-4 lg:gap-10 lg:grid-cols-12">

    {pages.group.map((el,index)=>(
        <div className={`lg:col-span-6 bg-blues rounded-lg cursor-pointer transition duration-400 ease-in hover:shadow-lg flex h-20 items-center gap-8 xl:gap-10 lg:gap-4 justify-start md:w-2/3 w-full ${index===0 ? 'mr-auto lg:mr-0 ml-auto': 'mr-auto ml-auto lg:m-0' }`} key={index}>
        <img src={el.image.node.sourceUrl} alt={el.image.node.altText} title={el.image.node.title} className='h-10 ml-5' />
        <div className='text-white '>
<h3 className='text-xl text-start'>{el.cardshead}</h3>
{el.cardstext.map((text,idx)=>(
    <p className='text-lg' key={idx}>{text.text}</p>

))}
    </div>
</div>
    ))}

        </div>
    </div>
    )
}