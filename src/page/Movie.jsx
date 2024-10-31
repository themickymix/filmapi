import React, { useEffect, useState } from "react";
import Cards from "../component/Card";
import { options, movie_url, img_url } from "../constant";

function Movie({ id }) {
  const [movie, setMovie] = useState([]); // State for movie data
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(0); // State for total pages
  const [loading, setLoading] = useState(true); // State for loading status

  // Function to handle page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setLoading(true); // Set loading to true when changing pages
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${movie_url}&page=${currentPage}`,
          options
        );
        const data = await response.json();
        setMovie(data.results); // Set movies from the response
        setTotalPages(data.total_pages); // Update total pages
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching movies:", error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchMovies(); // Fetch movies whenever the current page changes
  }, [currentPage]); // Dependency on currentPage

  return (
    <>
      <div className="m-2 md:pl-[8%] md:pr-[8%] justify-items-center">
        <div className="join mb-4">
          <button
            className="join-item btn"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}>
            «
          </button>

          {[...Array(Math.min(totalPages, 5)).keys()].map((_, index) => (
            <button
              key={index}
              className={`join-item btn ${
                currentPage === index + 1 ? "btn-active" : ""
              }`}
              onClick={() => handlePageChange(index + 1)}>
              {index + 1}
            </button>
          ))}

          <button
            className="join-item btn"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}>
            »
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-0 gap-3">
          {loading ? (
            // Display a loading spinner or message while loading
            <span class="loadeds"></span>
          ) : (
            movie.map((movies) => {
              const dates = movies.release_date.split("-")[0];
              return (
                <Cards
                  id={movies.id}
                  key={movies.id}
                  name={movies.title}
                  category={"Movie"}
                  date={dates}
                  type={"movie"}
                  img={img_url + movies.backdrop_path}
                />
              ); // Return Cards for each movie
            })
          )}
        </div>
      </div>
    </>
  );
}

export default Movie;
