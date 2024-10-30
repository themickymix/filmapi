import React, { useEffect, useState } from "react";
import { options, tv_url_trend, img_url } from "../constant"; // Assume tv_url_trend is defined in constants for TV trending URL
import Cards from "../component/Card";
import Card2 from "../component/Card2";
import { NavLink } from "react-router-dom";
function TVTrending() {
  const [isSmall, setIsSmall] = useState(
    typeof window !== "undefined" && window.innerWidth < 768
  );
  const [tvShows, setTVShows] = useState([]);

  useEffect(() => {
    fetch(tv_url_trend, options)
      .then((res) => res.json())
      .then((res) => {
        setTVShows(res.results); // Set fetched TV shows
      })
      .catch((err) => console.error(err));

    const handleResize = () => {
      setIsSmall(window.innerWidth < 768); // Update isSmall if screen width is below 768px
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Cleanup on component unmount
  }, []);

  return (
    <div className="m-2 md:pl-[8%] md:pr-[8%]">
      {/* TV 4 slice */}
      <div>
        <div className="flex flex-row">
          <span className="font-bold  text-2xl flex-1">Trending TV Show</span>
          <NavLink className={"text-gray-500 font-bold text-md mr-3"} to="/tv">
            SEE MORE
          </NavLink>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {tvShows.slice(0, 4).map((show) => {
            const dates = show.first_air_date.split("-")[0];
            return (
              <Cards
              id={show.id}
                key={show.id}
                category={"TV Show"}
                name={show.name}
                type={'tv'}
                date={dates}
                img={img_url + show.backdrop_path}

                
              />
           
            );
          })}
        </div>
      </div>
      {/* TV 2 slice */}
      <div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {tvShows.slice(4, 6).map((show) => {
            const dates = show.first_air_date.split("-")[0];
            return isSmall ? (
              <Cards
                id={show.id}
                key={show.id}
                category={"TV Show"}
                name={show.name}
                type={"tv"}
                date={dates}
                img={img_url + show.backdrop_path}
              />
            ) : (
              <Card2
                id={show.id}
                key={show.id}
                category={"TV Show"}
                name={show.name}
                type={"tv"}
                date={dates}
                img={img_url + show.backdrop_path}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TVTrending;
