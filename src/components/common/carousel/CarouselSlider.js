import React, { useState } from 'react';
import Slider from "react-slick";

const CarouselSlider= React.forwardRef((props, ref) => {

    let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
        {
            breakpoint: 600,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 1
            }
        },
        {
            breakpoint: 480,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1
            }
        }
        ]
    };

    return (
        <Slider {...settings}>
            {props.children}
        </Slider>
    )
});

export default CarouselSlider;