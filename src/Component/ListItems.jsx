import React from 'react'
import Sanitize from '../libs/Sanitize'

const ListItems = ({pages}) => {
  console.log('pa',pages)
  return (
    <div className='container mx-auto px-14 lg:px-32'>
      <div>
            <h1 class="text-3xl font-bold my-14 text-center">
                {pages.heading}
            </h1>
        </div>
        {pages.listItems.map((el,index)=>(
 <div class=" pb-10" key={index}>
  <h2 className="text-3xl font-semibold pb-3">{el.title}</h2>
 {el.content && (
        <p className='text-sm lg:text-lg md:text-base font-normal'>
        {Sanitize(el.content)}
        </p>
      )}

      { el.listitem && (
        <ul className='list-disc mt-3 lg:mt-4'>
              {el.listitem.map((item, itemIndex) => (
                <li className='text-sm lg:text-lg md:text-base font-normal'
                  dangerouslySetInnerHTML={{ __html: item.list }}
                  key={itemIndex} 
                />
              ))}
              </ul>       )}

</div>
        ))}
     
    </div>
  )
}

export default ListItems
