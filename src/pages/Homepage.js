import React, { Fragment } from "react";
import Banner from "../components/banner/Banner";
import MoviesList from "../components/movie/MoviesList";

const Homepage = () => {
  return (
    <Fragment>
      <section className="movies-layout">
        <h2 className="movies-namelist">Now Playing</h2>
        <MoviesList></MoviesList>
      </section>
      <section className="movies-layout">
        <h2 className="movies-namelist">top rate movies</h2>
        <div className="movies-list">
          <MoviesList type="top_rated"></MoviesList>
        </div>
      </section>
      <section className="movies-layout">
        <h2 className="movies-namelist">popular</h2>
        <div className="movies-list">
          <MoviesList type="popular"></MoviesList>
        </div>
      </section>
    </Fragment>
  );
};

export default Homepage;
