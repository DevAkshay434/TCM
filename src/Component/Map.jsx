import React from 'react'

const Map= ({pages}) => {

    return (
<section className="location 2xl:pb-[50px] xl:pb-8 lg:pb-6 pb-4">
    <div className="container mx-auto md:px-8 px-4 lg:px-10 2xl:px-10 xl:px-14 ">
    <iframe title="map"
            src={`${pages.embeddedCode}`}
            style={{
              borderRadius: "10px",
              width: "100%",
              margin:'0 auto',
              height: "450px",
              boxShadow:"rgba(0, 0, 0, 0.25) 10px 0px 17.1px 0px",
            }}
            
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
    </div>
</section>
    )
}
export default Map