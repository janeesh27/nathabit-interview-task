import React from "react";
import "./index.css";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

const MovieList = ({ movies, onSelectMovie, onAddToFavorites, favorites }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          className="movie-item flex flex-col p-5 bg-black"
          onClick={() => onSelectMovie(movie.imdbID)}
        >
          <img
            src={movie.Poster}
            className="border-[2px] min-h-[350px] max-h-[350px] border-white"
            alt={movie.Title}
          />
          <div className="text-white flex flex-col mt-4 gap-y-2">
            <h3 className="font-semibold">{movie.Title}</h3>
            <div className="flex justify-between">
              <p>{movie.Year}</p>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToFavorites(movie);
                }}
              >
                {favorites?.some((fav) => fav.imdbID === movie.imdbID) ? (
                  <MdFavorite className="text-red-500" />
                ) : (
                  <MdFavoriteBorder />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
