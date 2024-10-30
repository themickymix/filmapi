import React from "react";
import { Link } from "react-router-dom";
function Card2({ name, img, category, date, id, type }) {
  return (
    <Link to={`/info/${id}?type=${type}`}>
      <div className="cardglow relative rounded-md overflow-hidden w-full">
        <img src={img} alt={name} className="w-full h-auto" />
        <div className="absolute bottom-0 left-0 w-full p-1 md:p-4 bg-gradient-to-t from-black to-transparent">
          <p className=" text-sm">
            {category} &bull; {date}{" "}
          </p>
          <p className="font-bold">{name}</p>
        </div>
      </div>
    </Link>
  );
}

export default Card2;
