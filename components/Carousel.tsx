/* eslint-disable react/no-unknown-property */
import type { NextPage } from "next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel: NextPage = () => {
  const settings = {
    // 슬라이드 옵션들
    arrows: false,
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 300,
    useTransform: false, //깜빡거림 방지
  };

  return (
    <div>
      <section>
        <Slider {...settings} className="page-carousel">
          <img className="slide-image" src="/homeimg1.png" />
          <img className="slide-image" src="/letterItemImg.png" />
          <img className="slide-image" src="/perNoteImg1.png" />
        </Slider>
      </section>
      <style jsx>{`
        section {
          width: 60rem;
          height: 30rem;
        }
        .page-carousel {
          display: flex;
          overflow: hidden;
        }
        .slide-image {
          width: 56rem;
          height: 30rem;
        }
        .slick-slider .slick-track,
        .slick-slider .slick-list {
          -webkit-transform: translate3d(0, 0, 0);
          transition-delay: 10ms;
        }
      `}</style>
    </div>
  );
};

export default Carousel;
