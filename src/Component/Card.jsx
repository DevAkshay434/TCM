import React from 'react'
import { NavLink } from 'react-router-dom'
import FormatCurrency from './Currency/FormatCurrency'
import { TrimSymbol } from './Currency/TrimSymbol'

const Card = ({title, url, Image, imgclass,Price,salePrice,  cardclass}) => {
    
  return (    
    <NavLink to={`${url}`}>
          <div className={cardclass}>
            <div>
              {Image ? (
                 <img
                 className={imgclass}
                 src={`${Image}`}
                 alt="Profile" 
                 loading="lazy"
               />
              ) :(
                 <img
                 className="img-fluid rounded-full mx-auto"
                 src="https://via.placeholder.com/150"
                 alt="Profile "
               />
              )}
             
            </div>
            <h3 className="text-sm md:text-base font-normal lg:text-lg xl:text-xl 2xl:text-2xl mb-2">{title}</h3>  
            {Price && salePrice &&
                 <div>

                 <span className="text-xs md:text-sm font-normal lg:text-base xl:text-lg 2xl:text-xl text-gray-500 line-through"><FormatCurrency amountInINR={TrimSymbol(Price)} /></span>
                 <span className="text-xs md:text-sm font-normal lg:text-base xl:text-lg 2xl:text-xl text-blues ml-2"><FormatCurrency amountInINR={TrimSymbol(salePrice)} /></span>
               
               </div>
            } 
           
          </div>
     </NavLink>
  )
}

export default Card
