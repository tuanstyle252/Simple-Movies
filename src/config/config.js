export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apikey = "95f2419536f533cdaa1dadf83c606027";
const tmdbEndPoin = "https://api.themoviedb.org/3/movie";
const tmdbEndPoinSearch = "https://api.themoviedb.org/3/search"
export const tmdbAPi = {
  getMoviesList: (type, page=1) => `${tmdbEndPoin}/${type}?api_key=${apikey}&page=${page}`,
  getMoviesDetail: (movieId) => `${tmdbEndPoin}/${movieId}?api_key=${apikey}`,
  getMoviesCredit: (movieId) =>
    `${tmdbEndPoin}/${movieId}/credits?api_key=${apikey}`,
  getMoviesVideo: (movieId) =>
    `${tmdbEndPoin}/${movieId}/videos?api_key=${apikey}`,
  getMoviesSimilar: (movieId) =>
    `${tmdbEndPoin}/${movieId}/similar?api_key=${apikey}`,
  getMoviesSearch:(query, page)=>`${tmdbEndPoinSearch}/movie?api_key=${apikey}&query=${query}&page=${page}`,
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
};
