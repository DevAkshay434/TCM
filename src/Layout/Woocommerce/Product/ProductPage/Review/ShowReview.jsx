import React from 'react';
import Sanitize from '../../../../../libs/Sanitize';

const ShowReview = ({ product, user }) => {
    const reviews = product?.reviews?.edges
    console.log('reviw', reviews)
    return (
        <div className='flex flex-col flex-wrap lg:w-3/4 lg:mx-auto justify-center'>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div className='flex p-2 md:p-4 gap-2 items-center md:gap-4 justify-start ' key={index}>
                        <div >
                            {<img src="https://secure.gravatar.com/avatar/620699fb7ccd3e52faad8075d61c3a34?s=192&d=mm&r=g" alt="avatar" className='rounded-full h-14 w-18 ' />}

                        </div>
                        <div className='w-full'>
                            <div className="flex w-full justify-between">
                                <div >
                                    <p className='text-lg'>
                                        {[...Array(review.rating)].map((_, starIndex) => (
                                            <span
                                                key={starIndex}
                                                className='text-yellows font-bold text-xl'
                                            >
                                                &#9733;
                                            </span>

                                        ))}
                                    </p>
                                    <h3 className='text-black font-medium text-lg xl:text-xl 2xl:text-2xl'>{review.node.author.node.name}</h3>
                                   
                                </div>
                                <div className='flex gap-4 items-center'>
                                    <p className='text-blues font-medium text-base lg:text-lg 2xl:text-2xl'>{new Date(review.node.date).toISOString().split('T')[0]}</p>
                                   
                                </div>

                            </div>
                            <p className='text-gray-600 text-lg' dangerouslySetInnerHTML={{ __html: Sanitize(review.node.content) }} />
                         
                            {/* <button className=' text-blues md:pt-1 hover:text-red-500'>&#x21b6; Reply</button> */}
                        </div>
                    </div>
                ))
            ) : (
                <>
                </>
            )}
        </div>
    );
};

export default ShowReview;
