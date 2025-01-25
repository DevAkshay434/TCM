import React from 'react';
import { NavLink } from 'react-router-dom';
import Sanitize from '../../libs/Sanitize';

const Banner = ({ pages = {} }) => {
  const {
    heading = pages.heading,
    content = pages.content,
    button1Link = { url: pages.button1Link.url, title: pages.button1Link.title },
    containerImage = { node: { sourceUrl: pages.containerImage.node.sourceUrl, altText: pages.containerImage.node.altText } },
  } = pages;


  return (
    <section className="homepage-banner">
      <div className="2xl:h-[400px] flex items-center h-[200px] lg:h-[250px] relative">
        <img
          src={containerImage.node.sourceUrl}
          alt={containerImage.node.altText || 'Banner'}
          className="absolute top-0 w-full 2xl:h-[400px] h-[200px] lg:h-[250px] object-cover object-top"
          loading="eager"
          width="2560"
          height="594" // Ensure this image is loaded quickly
        />
        <div className="container mx-auto px-4 md:px-8 xl:px-14 lg:px-10 2xl:px-10 relative z-10">
          <div className="lg:w-1/2 xl:w-[40%] 2xl:w-2/5 px-3 lg:px-0">
            <h1 className="text-white font-normal 2xl:mb-1 text-4xl lg:text-5xl xl:text-[52px]/[57px] 2xl:text-[62px]/[70px] leading-[1.25]">
              {heading}
            </h1>
            <p className="text-sm md:text-base font-normal lg:text-lg 2xl:text-2xl text-white mb-2">
              {Sanitize(content)}
            </p>
            <NavLink className="bg-blues hover:bg-hoverblue rounded-md text-white text-sm xl:text-base 2xl:text-lg 2xl:h-10 block text-center h-[30px] lg:h-8 w-28 
            pt-[4.5px] lg:pt-[6px] xl:pt-[4px] 2xl:pt-[6px]" to={button1Link.url}>
              {button1Link.title}
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
