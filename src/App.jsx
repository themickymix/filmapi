import { useState, lazy, Suspense } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./component/nav-bar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./component/Footer";
import QueryResults from "./page/Result";
import FilmInfo from "./page/FilmInfo";
import Home from "./page/Home";
import Movie from "./page/Movie";
import TV from "./page/TV";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/tv" element={<TV />} />
          <Route path="/info/:id" element={<FilmInfo />} />
          <Route path="/results" element={<QueryResults />} />
        </Routes>
      </Suspense>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
