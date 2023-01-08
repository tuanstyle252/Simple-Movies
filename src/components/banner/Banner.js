import React from "react";
import { useEffect, useState } from "react";
import { fetcher } from "../../config/config";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";

const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=95f2419536f533cdaa1dadf83c606027`,
    fetcher
  );
  const movies = data?.results || [];
  console.log(movies);
  return (
    <section className="banner">
      <Swiper grabCursor={'true'} slidesPerView={'auto'}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerImg item={item}></BannerImg>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

function BannerImg({ item }) {
  const {
    title,
    poster_path
  } = item;
  return (
    <div className="banner-img">
      <div className="overlay"></div>
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=""
        className="banner-img-img"
      />
      <div className="content">
        <h2 className="content-namefilm">{title}</h2>
        <div className="content-detail">
          <span className="content-detail-span">Action</span>
          <span className="content-detail-span">Advanture</span>
          <span className="content-detail-span">Drama</span>
        </div>
        <button className="content-watchnow">Watch Now</button>
      </div>
    </div>
  );
}
export default Banner;
