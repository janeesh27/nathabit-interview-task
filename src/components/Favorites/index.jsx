import React from "react";

const Favorites = ({ favorites }) => {
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-[32px] font-inter sm:text-[64px] font-bold text-center">
        Your Favorites
      </h1>
      <div className="flex flex-wrap justify-center">
        {favorites.map((movie) => (
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
        ))}
      </div>
    </div>
  );
};

export default Favorites;
