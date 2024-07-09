import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Favorites = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-[32px] bg-white font-inter md:py-[60px] sm:text-[64px] font-bold text-center">
        Your Favorites
      </h1>
      <Link to="/">
        <div className="absolute top-2 md:top-8 text-[24px] text-white bg-black p-2 md:p-6 font-inter font-bold right-8">
          Back
        </div>
      </Link>
      <div className="flex flex-wrap justify-center">
        {location.state && location.state.length > 0 ? (
          location.state.map((movie) => (
            <div
              key={movie.imdbID}
              className="movie-item flex flex-col p-5 bg-black m-2"
            >
              <img
                src={movie.Poster}
                className="border-[2px] min-h-[350px] max-h-[350px] border-white"
                alt={movie.Title}
              />
              <div className="text-white flex flex-col mt-4 gap-y-2">
                <h3 className="font-semibold">{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white text-[32px] font-inter flex items-center justify-center min-h-[80vh]">
            No favorites added yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
