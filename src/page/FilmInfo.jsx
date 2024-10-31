import { useEffect, useState } from "react";
import { options } from "../constant";
import { useParams, useLocation } from "react-router-dom";
import Genre from "../component/Genre";
import { img_url } from "../constant";
function FilmInfo() {
  const [item, setItem] = useState(null);
  const [cast, setCast] = useState([]); // State to hold cast information
  const { id } = useParams();
  const location = useLocation();

  // Retrieve the "type" query parameter from the URL
  const type = new URLSearchParams(location.search).get("type");

  // Debugging log to check if id and type are received correctly
  console.log("Received id:", id);
  console.log("Received type:", type);

  const endpoint =
    type === "movie"
      ? `https://api.themoviedb.org/3/movie/${id}?language=en-US`
      : `https://api.themoviedb.org/3/tv/${id}?language=en-US`;

  const creditsEndpoint =
    type === "movie"
      ? `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`
      : `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`;

  useEffect(() => {
    // Fetch film or TV show details
    fetch(endpoint, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        setItem(data);
      })
      .catch((error) => console.error("Fetch error:", error));
  }, [id, endpoint]);

  useEffect(() => {
    // Fetch cast information
    fetch(creditsEndpoint, options)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched cast data:", data);
        setCast(data.cast); // Set the cast information
      })
      .catch((error) => console.error("Fetch cast error:", error));
  }, [id, creditsEndpoint]);

  return (
    <div className="">
      <div className="grid md:grid-cols-2 gap-[1rem] pt-[1rem] justify-items-center pl-1 pr-1 md:pl-[20%] md:pr-[20%]">
        <div className="grid justify-items-end md:m-3 w-72 md:w-auto">
          <img
            className=" rounded-lg"
            src={
              item ? (
                `https://image.tmdb.org/t/p/original${item.poster_path}`
              ) : (
                <span class="loaders"></span>
              )
            }
            alt={item ? item.title || item.name : "Placeholder"}
          />
        </div>
        <div className="mx-3">
          <span className="text-3xl">
            {item ? item.title || item.name : "Loading..."}
          </span>

          <p>{item?.vote_average}/10</p>
          <p> Vote by {item?.vote_count} people</p>

          <h4 className="mt-8">Overview: </h4>
          <p>{item?.overview || "No overview available"}</p>
          <div>
            <h4 className="mt-8">Genres</h4>
            <div className="flex gap-3">
              {item?.genres?.map((genre) => (
                <Genre key={genre.id} genrec={genre.name} />
              )) || <p>No genres available</p>}
            </div>
          </div>
          <div>
            <h4 className="mt-8">Top Cast</h4>
            <div className="flex flex-wrap gap-3">
              {cast.length > 0 ? (
                cast.slice(0, 6).map((member) => (
                  <div
                    key={member.id}
                    className="grid grid-row-6 p-2 justify-items-center">
                    <img
                      className="w-20 h-auto rounded-md"
                      src={img_url + member.profile_path}
                      alt=""
                    />{" "}
                    <p className="font-bold text-xs mt-1">{member.name}</p>
                    <p className="text-gray-400 text-xs ">
                      as {member.character}
                    </p>
                  </div>
                ))
              ) : (
                <p>No cast information available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilmInfo;
