import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchQuery) {
      setSearchQuery("");
      navigate(`/results?query=${encodeURIComponent(searchQuery)}`);
    }
  };
  return (
    <div className="navbar bg-base-100 flex flex-col md:flex-row md:justify-center sticky top-0 z-10 md:pl-[8%] md:pr-[8%]">
      <div className="md:flex-1 gap-10 md:gap-2 justify-center md:justify-start p-2">
        <NavLink
          className={({ isActive }) =>
            `py-2 px-3 rounded ${
              isActive
                ? " bg-blue-700 btn text-xl text-white"
                : "text-gray-900 text-xl hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            } `
          }
          to="/">
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `py-2 px-3 rounded ${
              isActive
                ? " bg-blue-700 btn text-xl text-white"
                : "text-gray-900 text-xl hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            } `
          }
          to="/movie">
          Movie
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `py-2 px-3 rounded ${
              isActive
                ? " bg-blue-700 btn text-xl text-white"
                : "text-gray-900 text-xl hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            } `
          }
          to="/tv">
          TV Show
        </NavLink>
   
      </div>
      <div className="form-control w-full md:w-auto mb-2 md:mb-0">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update state on change
          onKeyDown={handleKeyDown} // Handle Enter key press
          className="input input-bordered w-full md:w-auto"
        />
      </div>
    </div>
  );
}

export default Navbar;
