import React, { lazy, Suspense } from 'react';
import { GET_FOOTER } from '../../Queries/Queries';
import { useQuery } from '@apollo/client';
import { NavLink } from 'react-router-dom';
import parse from 'html-react-parser';

const Icons = lazy(() => import('../../Component/Icons'));

const Footer = () => {
    const { loading, error, data } = useQuery(GET_FOOTER, {
      fetchPolicy:'cache-first',
      nextFetchPolicy:'cache-and-network'
    });
    if (loading) {
        return null;
    }
    if (error) {
        return <p>Menu error : {error.message}</p>;
    }
    
    const footer = data.pageBy?.pageBuilder?.pages?.[0] || {};
    
    return (
        <section className='footer text-center md:text-start' >
            <div className="bg-black text-white 2xl:py-[50px] xl:py-8 lg:py-6 py-4">
                <div className='container md:px-8 px-4 lg:px-10 2xl:px-10 xl:px-14 mx-auto'>
                    <hr className="bg-gray-100 opacity-80 mb-3 lg:mb-8" />
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-8 my-2 md:my-0'>
                        {/* First div taking up 5 columns */}
                        <div className="lg:col-span-4">
                            <h3 className='text-3xl xl:text-4xl font-bold mb-1 lg:mb-2 xl:mb-4'>{footer.title}</h3>
                            <p className='text-xs md:text-sm 2xl:text-base font-normal mb-1 lg:mb-2'>{footer.description}</p>
                            <div className="flex justify-center gap-8 lg:gap-3 lg:justify-start mt-3">
                                <Suspense fallback={<div></div>}>
                                    {footer.socialIcons.map((el, index) => (
                                        (el.link && el.link.length > 0 ? (
                                            <div key={index}>
                                                <NavLink to={`${el.link}`} target="_blank">
                                            <Icons icons={`${el.icons}`} size="lg" color="white" className="mx-2 cursor-pointer" />
                                            </NavLink>
                                        </div>
                                        ) :(
                                            <div key={index}>
                                            <Icons icons={`${el.icons}`} size="lg" color="white" className="mx-2 cursor-pointer" />
                                        </div>
                                        )
                                    )
                                        
                                    ))}
                                </Suspense>
                            </div>
                        </div>

                        {/* Link columns taking up 2-3 columns each */}
                        {footer.columns.slice(0, 2).map((el, index) => (
                            <div key={index} className={`${index === 0 ? "lg:col-span-3 md:pl-44 lg:pl-0 xl:pl-6" : ""} ${index === 1 ? "lg:col-span-3 lg:pl-2" : ""}`}>
                                <h5 className='text-base md:text-xl font-semibold mb-2'>{el.heading}</h5>
                                <ul>
                                    {el.pagesLink.map((item, idx) => (
                                        <li className='grid' key={idx}>
                                            <NavLink to={item.link.url} className='mt-[5px] text-sm md:text-base 2xl:text-lg font-normal'>
                                                {parse(item.link.title)}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        <div className="lg:col-span-2 lg:pl-0 md:pl-40">
                            <h5 className='text-base font-semibold mb-2'>Join Our Newsletter</h5>
                            <form className='flex gap-2 lg:gap-3 lg:my-3 my-1 flex-col md:flex-row items-center flex-wrap'>
                                <input type="text" placeholder='Your Email*' className='bg-transparent border-white border-[1px] rounded-md h-8 w-60 lg:w-72 text-sm pl-3' />
                                <NavLink className='bg-blues text-sm xl:text-base 2xl:text-lg 2xl:h-10 2xl:w-28 xl:w-24 pt-[4.5px] lg:pt-[6px] xl:pt-[4px] 2xl:pt-[6px] block text-center h-[30px] lg:h-8 w-24 text-white rounded-md' to='/contact-us'>Contact us</NavLink>
                            </form>
                        </div>
                    </div>
                    <hr className="bg-gray-100 opacity-80 my-3 lg:my-4" />
                </div>
                <p className='text-center 2xl:text-lg md:text-base text-xs text-white'>{footer.copyrightText}</p>
            </div>
        </section>
    );
}

export default Footer;
