import React from "react";
import { useNavigate } from "react-router-dom";

const MoviesCard = ({ item }) => {
  const { title, poster_path, vote_average, release_date, backdrop_path, id } =
    item;
  const navi = useNavigate();
  return (
    <div className="movies-card">
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=""
        className="movies-card-img"
      />
      <div className="movies-card-full">
        <h3 className="movies-card-title">{title}</h3>
        <div className="movies-card-rate">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
      </div>
      <button
        onClick={() => navi(`/movie/${id}`)}
        className="content-watchnow-list"
      >
        Watch Now
      </button>
    </div>
  );
};

export default MoviesCard;
