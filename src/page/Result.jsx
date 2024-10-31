import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { options } from "../constant";
import Cards from "../component/Card";

const QueryResults = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalresult, setTotalResult] = useState(0);
  const location = useLocation();

  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return params.get("query");
  };

  useEffect(() => {
    const fetchResults = async () => {
      const query = getQueryParams();
      setQuery(query);

      if (query) {
        try {
          // Fetch data based on query and page
          const response = await fetch(
            `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(
              query
            )}&page=${currentPage}&api_key=${options.api_key}`,
            { ...options, method: "GET" }
          );

          const data = await response.json();
          if (data && data.results) {
            setResults(data.results);
            setTotalPages(data.total_pages);
            setTotalResult(data.total_results);
          } else {
            console.error("No results found.");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchResults();
  }, [location.search, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="m-[2%] justify-items-center">
      {/* Pagination Controls */}

      {results.length === 0 ? (
        <p className="p-5 pb-5">No results found for '{query}'.</p>
      ) : (
        <>
          <p className="p-5">
            Found {totalresult} results for "{query}"
          </p>
          <div className="join mb-4">
            <button
              className="join-item btn text-white"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}>
              « Previous
            </button>

            {[...Array(Math.min(totalPages, 5)).keys()].map((_, index) => (
              <button
                key={index}
                className={`join-item btn ${
                  currentPage === index + 1 ? " bg-white text-black" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            ))}

            <button
              className="join-item btn text-white"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}>
             Next »
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-0 gap-3">
            {results.map((tvs) => {
              const dates = tvs.first_air_date
                ? tvs.first_air_date.split("-")[0]
                : tvs.release_date.split("-")[0];

              const image2 = tvs.backdrop_path
                ? `https://image.tmdb.org/t/p/original${tvs.backdrop_path}`
                : `https://placehold.co/705x400?text=No-image`;

              const category = tvs.first_air_date ? "TV Show" : "Movie";

              return (
                <Cards
                  id={tvs.id}
                  key={tvs.id}
                  name={tvs.name || tvs.title}
                  date={dates}
                  category={category}
                  img={image2}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default QueryResults;
