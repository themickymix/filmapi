export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`, // Use the apiKey variable correctly
  },
};

// discover movie
export const movie_url =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc";

//movie trending
export const movie_url_trend =
  "https://api.themoviedb.org/3/trending/movie/day?language=en-US";

// tv discover
export const tv_url =
  "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
// tv trending
export const tv_url_trend =
  "https://api.themoviedb.org/3/trending/tv/day?language=en-US";

//image link
export const img_url = "https://image.tmdb.org/t/p/original/";
