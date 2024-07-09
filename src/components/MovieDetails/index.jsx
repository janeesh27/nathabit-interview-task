import React from "react";
import { motion } from "framer-motion";

const MovieDetail = ({ movie, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 pt-[240px] sm:pt-[120px] font-inter flex justify-center items-center"
    >
      <div className="bg-black relative p-8 rounded-lg w-11/12 md:w-1/2 lg:w-1/3 flex flex-col gap-y-2 items-center">
        <button
          onClick={onClose}
          className="absolute right-4 font-bold text-red-500"
        >
          Close
        </button>
        <h2 className="text-2xl mt-8 text-white text-center font-bold mb-4">
          {movie.Title} ({movie.Year})
        </h2>
        <img
          src={movie.Poster}
          alt={`${movie.Title} Poster`}
          className="mb-4"
        />
        <p className="text-left text-white">Director:{movie.Director}</p>
        <p className="text-left text-white">Actors:{movie.Actors}</p>
        <p className="text-center text-white">Plot:{movie.Plot}</p>
        <p>Ratings:</p>
        <ul className="text-white">
          {movie.Ratings.map((rating, index) => (
            <li key={index}>
              {rating.Source}: {rating.Value}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default MovieDetail;
