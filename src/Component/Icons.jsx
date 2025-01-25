import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import { faUser, faEye, faHeart, faClock , faMap, faHandshake} from '@fortawesome/free-regular-svg-icons';
import { faSearch, faShoppingCart, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram , faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

const Icons = ({icons, size, color, Class}) => {
  const iconMap = {
    faAngleRight : faAngleRight , 
    faFacebookF:faFacebookF,
    faInstagram:faInstagram,
    faTwitter: faTwitter,
    faEye: faEye,
    faGithub:faGithub,
    faUser: faUser,
    faShoppingCart: faShoppingCart,
    faHeart: faHeart,
    faSearch: faSearch,
    faGlobe: faMap,
    faClock:faClock,
    faHandshake:faHandshake
  };

  return (
    <>
       <FontAwesomeIcon
              className={Class}
              icon={iconMap[icons]}
              color={color}
              size={size}
             />
               
    </>
  )
}

export default Icons
