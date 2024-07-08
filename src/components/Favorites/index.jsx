import React from "react";
import MovieList from "../MovieList";

const Favorites = ({ favorites }) => {
  console.log(favorites);
  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-[32px] bg-white font-inter sm:text-[64px] font-bold text-center">
        Your Favorites
      </h1>
      <div className="flex flex-wrap justify-center">
        {favorites && favorites.length > 0 ? (
          favorites.map((movie) => (
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
