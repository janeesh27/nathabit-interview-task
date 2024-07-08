import React from "react";

const MovieDetail = ({ movie, onClose }) => {
  return (
    <div className="fixed inset-0 pt-[240px] sm:pt-[120px]  font-inter bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white relative p-8 rounded-lg w-11/12 md:w-1/2 lg:w-1/3 flex flex-col gap-y-2 items-center">
        <button onClick={onClose} className="absolute right-4 text-red-500">
          Close
        </button>
        <h2 className="text-2xl mt-8 font-bold mb-4">
          {movie.Title} ({movie.Year})
        </h2>
        <img
          src={movie.Poster}
          alt={`${movie.Title} Poster`}
          className="mb-4"
        />
        <p className="text-left">
          <strong>Director:</strong> {movie.Director}
        </p>
        <p className="text-left">
          <strong>Actors:</strong> {movie.Actors}
        </p>
        <p className="text-center">
          <strong>Plot:</strong> {movie.Plot}
        </p>
        <p>
          <strong>Ratings:</strong>
        </p>
        <ul>
          {movie.Ratings.map((rating, index) => (
            <li key={index}>
              {rating.Source}: {rating.Value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieDetail;
