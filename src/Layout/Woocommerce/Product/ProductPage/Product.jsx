import React, { lazy, startTransition, Suspense, useState } from 'react'
import Cookies from 'js-cookie'
import Sanitize from '../../../../libs/Sanitize';

const AddReview = lazy(() => import('./Review/AddReview'))
const ShowReview = lazy(() => import('./Review/ShowReview'))

const Product = ({ product }) => {
  const [activeSection, setActiveSection] = useState('description');
  const [isOpen, setIsOpen] = useState(false);

  const toggleReviewForm = () => setIsOpen(!isOpen);

  const handleSection = (section) => {
    startTransition(() => {
      setActiveSection(section);
    });
  }
  
  const formatStockStatus = (status) => {
    return status.replace(/_/g, ' ');
  };
  
  const userDetails = Cookies.get('userDetails');
  const user = userDetails ? JSON.parse(userDetails) : {};
  return (
    <div>
     
      <div className="flex md:pl-3 mt-6 border-y-2 border-blues mx-auto  py-2 items-center  gap-2">
        <button className={` text-black transition duration-200 ease-in-out h-12   px-2 md:px-3 hover:text-white rounded-md font-normal text-base lg:text-lg  hover:bg-blues ${activeSection === 'description' ? 'bg-blues text-white' : ''}`} onClick={() => handleSection('description')}>Description</button>
        <button className={` text-black transition duration-200 ease-in-out h-12    px-2 md:px-3 hover:text-white rounded-md font-normal text-base lg:text-lg   hover:bg-blues ${activeSection === 'info' ? 'bg-blues text-white' : ''}`} onClick={() => handleSection('info')}>Additional Information</button>
        <button className={` text-black transition duration-200 ease-in-out h-12    px-2 md:px-3 hover:text-white rounded-md font-normal  text-base lg:text-lg   hover:bg-blues ${activeSection === 'review' ? 'bg-blues text-white' : ''}`} onClick={() => handleSection('review')}>Reviews ({product.reviewCount})
        </button>
      </div>
      <div className="h-auto">
        {activeSection === 'description' && 
          <div className='  p-2 '>
            {product && product.content && product.content.length > 0 ?
              (
                <p>{Sanitize(product.content)}</p>
              )
              : (
                <p className='text-base lg:text-lg 2xl:text-2xl'>No description available.</p>
              )}
          </div>

        }
        {activeSection === 'review' &&
          <Suspense fallback={<div></div>}>
            <div className="">
              <div className="grid lg:grid-cols-2 text-center items-center border-b pb-2 pt-4">
                <div className='border-r'>
                  {product.reviewCount > 0 ?(
                    <>
                    <h3 className="text-2xl"> Reviews
                    </h3>
                    <div className="flex items-center justify-center gap-2">
                    <div>
                      {[...Array(5)].map((_, starIndex) => (
                        <span
                          key={starIndex}
                          className={`star text-2xl ${starIndex < product.averageRating ? 'text-yellows' : 'text-rating'}  `}
                        >
                          &#9733;
                        </span>
                      ))}</div>
                    <p className='font-medium text-base'> {product.averageRating} out of 5</p>
                  </div>
                  <div>
                    <p className='font-medium text-base'> Based on {product.reviewCount} reviews</p>
                  </div>
                    </>
                  ):(
                    <>
                    {[...Array(5)].map((_, starIndex) => (
                        <span
                          key={starIndex}
                          className={`star text-3xl text-rating`}
                        >
                          &#9733;
                        </span>

                      ))}
                      <p className='font-medium text-lg '>Be the first to write a review</p>
                    </>
                  )}
                  
                </div>
                <div>

                  <button
                    className="bg-blues w-1/2 hover:bg-hoverblue text-white h-10 py-2 px-4 rounded transition "
                    onClick={toggleReviewForm}
                  >
                    {isOpen ? 'Cancel Review' : 'Write Review'}
                  </button>
                </div>
              </div>


              {/* Review Form with Transition */}
              <div
                className={`overflow-hidden   transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <AddReview user={user}   product={product} />
              </div>
              <ShowReview user={user}   product={product} />
            </div>
          </Suspense>
        }
        {activeSection === 'info' &&
          <div className=' py-2 px-4'>
            <p className="text-base  lg:text-lg 2xl:text-xl mb-2">
              Category: <span className="ms-8">{product.productCategories.edges[0].node.name}</span>
            </p>
            <p className="text-base  lg:text-lg 2xl:text-xl">
              Availability: <span className="ms-4">{formatStockStatus(product.stockStatus)}</span>
            </p>
          </div>}
      </div>
    </div>
  )
}

export default Product
