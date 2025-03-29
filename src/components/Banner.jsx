import React from "react";
import { banner01, banner02 } from "../assets/images/index";

function Banner() {
  return (
    <div id="bannerCarousel" className="carousel slide" data-bs-ride="carousel">
      {/* Indicadores */}
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#bannerCarousel"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#bannerCarousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
      </div>

      {/* Slides */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={banner01}
            className="d-block w-100"
            alt="Banner 01"
            style={{ height: "600px", objectFit: "cover" }}
          />
        </div>
        <div className="carousel-item">
          <img
            src={banner02}
            className="d-block w-100"
            alt="Banner 02"
            style={{ height: "600px", objectFit: "cover" }}
          />
        </div>
      </div>

      {/* Controles */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#bannerCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#bannerCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  );
}

export default Banner;
