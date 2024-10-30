import React, { useEffect, useState } from "react";
import Cards from "../component/Card";
import { options, tv_url, img_url } from "../constant";

function TV() {
  const [tv, setTV] = useState([]); // State for TV shows
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const [totalPages, setTotalPages] = useState(0); // State for total pages
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    fetch(`${tv_url}&page=${currentPage}`, options) // Fetch TV shows based on current page
      .then((res) => res.json())
      .then((res) => {
        setTV(res.results);
        setTotalPages(res.total_pages); // Set total pages from the response
        setLoading(false); // Set loading to false after fetching data
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); // Ensure loading is false on error
      });
  }, [currentPage]); // Fetch new data when currentPage changes

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setLoading(true); // Set loading to true when changing page
  };

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
            // Optional loading indicator for the entire list
            <p>Loading TV shows...</p>
          ) : (
            tv.map((tvs) => {
              const dates = tvs.first_air_date.split("-")[0];
              return (
                <Cards
                  id={tvs.id}
                  key={tvs.id}
                  name={tvs.name}
                  category={"TV Show"}
                  type={"tv"}
                  date={dates}
                  img={img_url + tvs.backdrop_path}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default TV;
