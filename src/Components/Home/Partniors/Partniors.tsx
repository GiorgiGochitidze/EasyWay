import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Partniors.css";

interface Partner {
  id: number;
  imageUrl: string;
  alt: string;
}

const partners: Partner[] = [
  {
    id: 1,
    imageUrl:
      "https://static.rfstat.com/renderforest/images/website_maker_images/components/component-images/clients4-1.0.0.png",
    alt: "Partner 1",
  },
  {
    id: 2,
    imageUrl:
      "https://static.rfstat.com/renderforest/images/website_maker_images/components/component-images/clients4-2.0.0.png",
    alt: "Partner 2",
  },
  {
    id: 3,
    imageUrl:
      "https://static.rfstat.com/renderforest/images/website_maker_images/components/component-images/clients4-3.0.0.png",
    alt: "Partner 3",
  },
  {
    id: 4,
    imageUrl:
      "https://static.rfstat.com/renderforest/images/website_maker_images/components/component-images/clients4-4.0.0.png",
    alt: "Partner 4",
  },
  {
    id: 5,
    imageUrl:
      "https://static.rfstat.com/renderforest/images/website_maker_images/components/component-images/clients4-5.0.0.png",
    alt: "Partner 5",
  },
  {
    id: 6,
    imageUrl:
      "https://static.rfstat.com/renderforest/images/website_maker_images/components/component-images/clients4-6.0.0.png",
    alt: "Partner 6",
  },
];

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const NextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => (
  <div className={className} style={{ ...style }} onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path d="M11.438 21.813l6.125-6.125-6.125-6.125 1.875-1.875 8 8-8 8z"></path>
    </svg>
  </div>
);

const PrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => (
  <div className={className} style={{ ...style }} onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path d="M20.563 21.438l-1.875 1.875-8-8 8-8 1.875 1.875-6.125 6.125z"></path>
    </svg>
  </div>
);

const Partniors: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="partners-section">
      <div className="partners-header">
        <h1 className="partners-title">ჩვენი პარტნიორები</h1>
        <p className="partners-description">
          გახდი ჩვენი პარტნიორების მომხმარებელი და მიიღე ექსკლუზიური ულიმიტო
          ფასდაკლება.
        </p>
      </div>
      <div className="slider-container">
        <Slider {...settings}>
          {partners.map((partner) => (
            <div key={partner.id} className="partner-slide">
              <figure className="partner-figure">
                <img
                  src={partner.imageUrl}
                  alt={partner.alt}
                  className="partner-logo"
                />
              </figure>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Partniors;
