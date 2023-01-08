import React from "react";
import useSWR from "swr";
import MoviesCard from "../components/movie/MoviesCard";
import { fetcher, tmdbAPi } from "../config/config";
import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import ReactPaginate from "react-paginate";

//https://api.themoviedb.org/3/search/movie?api_key=

const itemsPerPage = 20;
const Moviespage = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [url, setUrl] = useState(tmdbAPi.getMoviesList("popular", nextPage));
  const filterDebounce = useDebounce(filter, 500);
  useEffect(() => {
    if (filterDebounce) {
      setUrl(tmdbAPi.getMoviesSearch(filterDebounce, nextPage));
    } else {
      setUrl(tmdbAPi.getMoviesList("popular", nextPage));
    }
  }, [filterDebounce, nextPage]);
  const handlerFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  const movies = data?.results || [];

  // const { total_pages } = data;

  if (!data || !data.total_results) return;
  const pageCount = Math.ceil(data.total_results / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };
  return (
    <div className="movies-page">
      <div className="search">
        <div className="search-detail">
          <input
            type="text"
            className="search-input"
            placeholder="Enter ur film....."
            onChange={handlerFilterChange}
          />
        </div>
        <button className="button1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {loading && <div className="loading"></div>}
      <div className="movies-page-list">
        {movies.length > 0 &&
          movies.map((item) => (
            <MoviesCard key={item.id} item={item}></MoviesCard>
          ))}
      </div>
      <div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
};

export default Moviespage;
