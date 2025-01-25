import React from 'react';
import './Comming.css'; // Make sure to create this file for custom styles
import src from './img/img.avif'
export default function ComingSoon() {
    return (
        <>
            <div className="video-background ">
                <iframe
                    src="https://player.vimeo.com/video/1015284353?h=e7a6aad2a9&autoplay=1&loop=1&autopause=0&muted=1&title=0&byline=0&portrait=0&controls=0"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    id="myVideo"
                    className='2xl:scale-[2] scale-[1.5]'
                />
            </div>
            <img
                src={`${src}`}
                alt="Coming Soon Background"
                className="mobile-image"
            />
            <div className="content-overlay ">
                <div className=" md:px-8 px-4 xl:px-14 lg:px-10 2xl:px-10 container mx-auto">
                    <div className=" h-full m-0 p-0 w-full ">
                        <div className="text-center pt-4 ">
                            <h1 className="font-semibold text-xl text-white">THE CRICKET MOHALI</h1>
                            <hr className="border-1 mt-4 border-gray-300" />
                            <p className="text-6xl pt-44 xl:pt-44 2xl:pt-72 font-semibold 2xl:text-6xl text-white">Coming Soon</p>
                        </div>
                    </div>
                </div>


                    <footer className="footer  md:px-8 px-4 xl:px-14 lg:px-10 2xl:px-10   pt-4 bg-black ">
                        <div className="grid justify-between items-center text-white grid-cols-1 md:grid-cols-2 w-full">
                            <div>
                                <p className='text-base font-normal text-gray-300'>Copyright © 2024 THE CRICKET MOHALI - All Rights Reserved.</p>
                            </div>
                            <div className=" text-base font-normal text-gray-300 md:text-end">
                                <p>Powered by TCM Cricket</p>
                            </div>
                        </div>
                    </footer>
            </div>
        </>
    );
}
