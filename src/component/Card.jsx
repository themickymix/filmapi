import React from "react";
import { Link } from "react-router-dom";

function Cards({ name, img, date, category, id, type }) {
  return (
    // Pass type as a query parameter in the Link
    <Link to={`/info/${id}?type=${type}`}>
      <div>
        <div className="cardglow relative rounded-md overflow-hidden max-w-sm">
          <img src={img} alt={name} className="w-full h-auto" />
          <div className="absolute bottom-0 left-0 w-full p-1 md:p-4">
            {/* <p className="text-white md:font-semibold">{name}</p> */}
          </div>
        </div>
        <p className="text-sm">
          {category} &bull; {date}
        </p>
        <p className="font-bold">{name}</p>
      </div>
    </Link>
  );
}

export default Cards;
