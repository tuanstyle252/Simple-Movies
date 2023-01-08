import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher, tmdbAPi } from "../config/config";
import { Swiper, SwiperSlide } from "swiper/react";
import MoviesCard from "../components/movie/MoviesCard";
import "swiper/css";

const MoviesDetailPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPi.getMoviesDetail(movieId), fetcher);
  if (!data) return null;
  const { backdrop_path, poster_path, original_title, genres, overview } = data;
  //   console.log(data);
  return (
    <>
      <div className="banner-detail">
        <div className="overlay-banner"></div>
        <div className="overlay-detail">
          <img
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt=""
          />
        </div>
      </div>
      <div className="after-banner">
        <img
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt=""
          className="after-banner-img"
        />
      </div>
      <h1 className="original-title">{original_title}</h1>
      {genres.length > 0 && (
        <div className="genres">
          {genres.map((item) => (
            <span className="genres-detail" key={item.id}>
              {item.name}{" "}
            </span>
          ))}
        </div>
      )}
      <p className="overview">{overview}</p>
      <MovieCredit></MovieCredit>
      <MoviesVideo></MoviesVideo>
      <MoviesSimilar></MoviesSimilar>
    </>
  );
};

function MovieCredit() {
  //https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPi.getMoviesCredit(movieId), fetcher);
  if (!data) return null;
  const { cast } = data;
  if (!data || data.length <= 0) return null;
  //   console.log(data);
  return (
    <div className="main-cast">
      <h2 className="casts-title">casts</h2>
      <div className="casts">
        {cast.slice(0, 4).map((item) => (
          <div className="casts-list">
            <img
              src={tmdbAPi.imageOriginal(item.profile_path)}
              alt=""
              className="casts-list-img"
              key={item.id}
            />
            <h3 className="casts-name">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

function MoviesVideo() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPi.getMoviesVideo(movieId), fetcher);
  if (!data) return null;
  //   console.log(data);
  //<iframe width="1180" height="664" src="https://www.youtube.com/embed/kfw7MYah2n0" title="W/n - 3107 3 ( Official Video ) ft. Nâu, Duongg, Titie" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  const { results } = data;
  if (!data || data.length <= 0) return null;
  return (
    <>
      <div className="movie-trailer">
        {results.slice(0, 1).map((item) => (
          <div className="movie-trailer-detail">
            <iframe
              width="1180"
              height="664"
              src={`https://www.youtube.com/embed/${item.key}`}
              title="W/n - 3107 3 ( Official Video ) ft. Nâu, Duongg, Titie"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              key={item.id}
              className="movies-trailer-watch"
            ></iframe>
          </div>
        ))}
      </div>
    </>
  );
}

function MoviesSimilar() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPi.getMoviesSimilar(movieId), fetcher);
  if (!data) return null;
  const { results } = data;
  if (!data || data.length <= 0) return null;
  console.log(data);
  return (
    <div className="similar">
      <h2 className="similar-title">Similar</h2>
      <div className="movies-list">
        {/* https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>> */}
        <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MoviesCard item={item}></MoviesCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}
export default MoviesDetailPage;
