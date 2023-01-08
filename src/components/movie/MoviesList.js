import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { fetcher, tmdbAPi } from "../../config/config";
import MoviesCard from "./MoviesCard";
import useSWR from "swr";

const MoviesList = ({ type = "now_playing" }) => {
  const { data } = useSWR(tmdbAPi.getMoviesList(type), fetcher);
  const movies = data?.results || [];

  return (
    <div className="movies-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MoviesCard item={item}></MoviesCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MoviesList;
