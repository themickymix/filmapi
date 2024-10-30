function Genre({ genrec }) {
  // Define a function to determine the background color based on the genre
  const getGenreColor = (genre) => {
    switch (genre) {
      case "Action":
        return "bg-blue-500"; // Blue
      case "Adventure":
        return "bg-green-500"; // Green
      case "Animation":
        return "bg-pink-400"; // Pink
      case "Comedy":
        return "bg-yellow-500"; // Yellow
      case "Crime":
        return "bg-purple-500"; // Purple
      case "Documentary":
        return "bg-gray-300"; // Light Gray
      case "Drama":
        return "bg-red-500"; // Red
      case "Family":
        return "bg-orange-300"; // Light Orange
      case "Fantasy":
        return "bg-teal-400"; // Teal
      case "History":
        return "bg-yellow-400"; // Gold
      case "Horror":
        return "bg-green-800"; // Dark Green
      case "Music":
        return "bg-red-300"; // Light Red
      case "Mystery":
        return "bg-indigo-500"; // Indigo
      case "Romance":
        return "bg-pink-500"; // Pink
      case "Science Fiction":
        return "bg-silver"; // Silver (custom color)
      case "Thriller":
        return "bg-orange-600"; // Dark Orange
      case "TV Movie":
        return "bg-gray-500"; // Grey
      case "War":
        return "bg-gray-800"; // Dark Gray
      case "Western":
        return "bg-yellow-800"; // Brown
      case "Soap":
        return "bg-purple-300"; // Light Purple (or any color you prefer)
      case "Reality":
        return "bg-blue-400"; // Light Purple (or any color you prefer)
      default:
        return "bg-slate-400"; // Default color
    }
  };

  return (
    <div
      className={`rounded-md p-1 ${getGenreColor(genrec)} text-white text-sm`}>
      <p>{genrec}</p>
    </div>
  );
}

export default Genre;
