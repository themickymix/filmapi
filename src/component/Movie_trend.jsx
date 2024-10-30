import React, { useEffect, useState } from "react";
import { options, movie_url_trend, img_url } from "../constant";
import Cards from "../component/Card";
import Card2 from "../component/Card2";
import { NavLink } from "react-router-dom";
function MovieTrending() {
  const [isSmall, setIsSmall] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetch(movie_url_trend, options)
      .then((res) => res.json())
      .then((res) => {
        setMovie(res.results); // Set fetched movies
      })
      .catch((err) => console.error(err));

    const handleResize = () => {
      setIsSmall(window.innerWidth < 768); // Update isSmall if screen width is below 768px
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup on component unmount
  }, []);

  return (
    <div className="m-2 md:pl-[8%] md:pr-[8%] mb-16 mt-8">
      {/* movie 4 slice */}
      <div>
        <div className="flex flex-row">
          <span className="font-bold  text-2xl flex-1">Trending Movies</span>
          <NavLink
            className={"text-gray-500 font-bold text-md mr-3"}
            to="/movie">
            SEE MORE
          </NavLink>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {movie.slice(0, 4).map((movies) => {
            const dates = movies.release_date.split("-")[0];
            return (
              <Cards
                id={movies.id}
                type={"movie"}
                key={movies.id}
                category={"Movie"}
                name={movies.title}
                date={dates}
                img={img_url + movies.backdrop_path}
              />
            );
          })}
        </div>
      </div>
      {/* movie 2 slice */}
      <div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {movie.slice(4, 6).map((movies) => {
            const dates = movies.release_date.split("-")[0];
            return isSmall ? (
              <Cards
                id={movies.id}
                type={"movie"}
                key={movies.id}
                category={"Movie"}
                name={movies.title}
                date={dates}
                img={img_url + movies.backdrop_path}
              />
            ) : (
              <Card2
                id={movies.id}
                type={"movie"}
                key={movies.id}
                category={"Movie"}
                name={movies.title}
                date={dates}
                img={img_url + movies.backdrop_path}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MovieTrending;
