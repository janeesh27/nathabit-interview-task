import React from "react";
import "./index.css";

const MovieList = ({ movies }) => {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <div key={movie.imdbID} className="movie-item p-5 bg-black">
          <img src={movie.Poster} alt={movie.Title} />
          <div className="text-white flex flex-col mt-4 gap-y-2">
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
