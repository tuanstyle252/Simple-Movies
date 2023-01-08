import { Fragment } from "react";
import "./App.css";
import { NavLink, Route, Routes } from "react-router-dom";
import "swiper/css";
import Main from "./components/layout/Main";
import Homepage from "./pages/Homepage";
import Banner from "./components/banner/Banner";
import Moviespage from "./pages/Moviespage";
import MoviesDetailPage from "./pages/MoviesDetailPage";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route element={<Main></Main>}>
          <Route
            path="/"
            element={
              <>
                <Banner></Banner>
                <Homepage></Homepage>
              </>
            }
          ></Route>
          <Route path="/movies" element={<Moviespage></Moviespage>}></Route>
          <Route path="/movie/:movieId" element={<MoviesDetailPage></MoviesDetailPage>}></Route>
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
