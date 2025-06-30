import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "./Partniors.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Partner {
  id: string;
  imageUrl: string;
  alt: string;
}

type RawPartner = {
  _id: string;
  images: string[];
  companyName: string;
};

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
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await axios.post("https://easyway-fmdo.onrender.com/loadPartners");
        const formatted = (res.data.partners as RawPartner[]).map(
          (p: RawPartner) => ({
            id: p._id,
            imageUrl: p.images?.[0] || "",
            alt: p.companyName,
          })
        );
        console.log("Raw partners:", res.data.partners);

        setPartners(formatted);
      } catch (err) {
        console.error("Failed to load partners", err);
      }
    };

    fetchPartners();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 600, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
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
                {partner.imageUrl ? (
                  <img
                    src={partner.imageUrl}
                    alt={partner.alt}
                    className="partner-logo"
                  />
                ) : (
                  <div className="partner-logo placeholder">No Image</div> // Optional fallback
                )}
              </figure>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Partniors;
