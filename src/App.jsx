import { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import SearchInput from "./components/SearchInput";
import MovieList from "./components/MovieList";

function App() {
  const [movies, setMovies] = useState([]);

  const fetchMovies = _.debounce(async (query) => {
    if (query) {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${query}&apikey=d87cd140`
      );
      setMovies(response.data.Search || []);
    } else {
      setMovies([]);
    }
  }, 500);
  return (
    <>
      <div className="bg-[#8f8f8f] py-10">
        <div className="flex gap-y-2 items-center flex-col justify-center">
          <h1 className="font-inter text-[38px] font-bold">
            Find<span className="text-white">Flix</span>
          </h1>
          <SearchInput onSearch={fetchMovies} />
          <MovieList movies={movies} />
        </div>
      </div>
      <div className="bg-[url('/assets/bg.jpg')]"></div>
    </>
  );
}

export default App;
