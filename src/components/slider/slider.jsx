import React, {useRef, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Scrollbar, Thumbs} from "swiper";

import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

import "./slider.css";
import imgNotSrc from '../../img/detailsImgNoneSrc.png';
import {URL_IMAGE} from "../../constants/url";

export function Slider({images}) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const prevSwiper = useRef(null);
    const mainSwiper = useRef(null);

    const initStylePrevSlider = (swiper) => {
        if (swiper.slides.length < 5) {
            prevSwiper.current.children[0].classList.add('slider-without-scroll');
        } else {
            prevSwiper.current.children[0].classList.remove('slider-without-scroll');
        }
    }

    const initStyleMainSlider = (swiper) => {
        if (swiper.slides.length < 2) {
            mainSwiper.current.children[0].classList.add('slider-without-scroll');
        } else {
            prevSwiper.current.children[0].classList.remove('slider-without-scroll');
        }
    }

    return (
        <>
            <Swiper data-test-id='slide-big'
                    navigation={true}
                    thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed && thumbsSwiper.slides.length > 1 ? thumbsSwiper : null}}
                    modules={[Pagination, Navigation, Thumbs]}
                    ref={mainSwiper}
                    pagination={
                        {clickable: true}
                    }
                    id='mainSwiper'
                    className="main-swiper"
                    onUpdate={(swiper) => {
                        initStyleMainSlider(swiper)
                    }
                    }
            >
                {images?.length === 0 ?
                    <SwiperSlide>
                        <img src={imgNotSrc} alt="book img"/>
                    </SwiperSlide>
                    :
                    images?.map(item =>
                        (
                            <SwiperSlide key={item.url}>
                                <img src={item.url} alt="book img"/>
                            </SwiperSlide>
                        )
                    )
                }
            </Swiper>
            <Swiper data-test-id='slide-mini'
                    onSwiper={setThumbsSwiper}
                    spaceBetween={30}
                    slidesPerView={5}
                    ref={prevSwiper}
                    scrollbar={{
                        hide: true,
                    }}
                    watchSlidesProgress={true}
                    modules={[Navigation, Thumbs, Scrollbar]}
                    className='preview-swiper'
                    onUpdate={(swiper) => {
                        initStylePrevSlider(swiper)
                    }
                    }
            >
                {images?.length <= 1 ? '' :
                    images?.map(item =>
                        (
                            <SwiperSlide key={item.url}>
                                <img src={item.url} alt="book img"/>
                            </SwiperSlide>
                        )
                    )
                }
            </Swiper>
        </>
    );
}
