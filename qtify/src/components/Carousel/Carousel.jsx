import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import CarouselLeft from "./CarouselLeft/CarouselLeft";
import CarouselRight from "./CarouselRight/CarouselRight";

import "swiper/css";
import "swiper/css/navigation";
import styles from "./Carousel.module.css";

// Custom Controls (optional)
const Controls = ({ data }) => {
  const swiper = useSwiper();

  useEffect(() => {
    swiper.slideTo(0, 1); // Reset to first slide on data change
  }, [data, swiper]);

  return null;
};

const Carousel = ({ data, renderCardComponent }) => {
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <div className={styles.wrapper}>
      {swiperInstance && <CarouselLeft />}
      {swiperInstance && <CarouselRight />}

      <Swiper
        onSwiper={setSwiperInstance} // Save swiper instance for custom arrows
        initialSlide={0}
        slidesPerView={5} // Number, not string
        slidesPerGroup={1} // Move 1 slide per click
        spaceBetween={40}
        modules={[Navigation]}
        navigation={false} // false because we're using custom arrows
        allowTouchMove={true}
        loop={false} // Important so slides don’t wrap around
      >
        <Controls data={data} />

        {data.map((item, index) => (
          <SwiperSlide key={index}>{renderCardComponent(item)}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
