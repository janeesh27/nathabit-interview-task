import { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import SearchInput from "./components/SearchInput";
import MovieList from "./components/MovieList";
import Loader from "./components/Loader";
import MovieDetail from "./components/MovieDetails";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();

  const fetchMovies = _.debounce(async (query) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${query}&apikey=d87cd140`
      );
      if (response.data.Response === "True") {
        setMovies(response.data.Search || []);
        setError(null);
      } else {
        setMovies([]);
        setError(response.data.Error || "No results found.");
      }
    } catch (error) {
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  }, 500);

  const fetchTopRatedMovies = async () => {
    setLoading(true);
    const topRatedMovies = [
      "The Shawshank Redemption",
      "The Godfather",
      "The Dark Knight",
      "The Godfather: Part II",
      "12 Angry Men",
      "Schindler's List",
      "The Lord of the Rings: The Return of the King",
      "Pulp Fiction",
      "The Good, the Bad and the Ugly",
      "The Lord of the Rings: The Fellowship of the Ring",
    ];
    const requests = topRatedMovies.map((title) =>
      axios.get(`https://www.omdbapi.com/?t=${title}&apikey=d87cd140`)
    );
    const responses = await Promise.all(requests);
    const moviesData = responses.map((response) => response.data);
    setTimeout(() => {
      setMovies(moviesData);
      setError(null);
      setLoading(false);
    }, 2000);
  };

  const fetchMovieDetails = async (imdbID) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.omdbapi.com/?i=${imdbID}&apikey=d87cd140`
      );
      setSelectedMovie(response.data);
      setError(null);
    } catch (error) {
      setError("An error occurred while fetching movie details.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFavorites = (movie) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.find(
        (fav) => fav.imdbID === movie.imdbID
      );
      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.imdbID !== movie.imdbID);
      } else {
        return [...prevFavorites, movie];
      }
    });
  };
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    fetchTopRatedMovies();
  }, []);

  console.log(favorites, "favorites");

  return (
    <>
      <div className="bg-[#8f8f8f] py-10">
        <button
          onClick={() => {
            navigate("/favorites", { state: favorites });
          }}
          className="absolute hover:scale-105 right-2 top-2 sm:right-8 font-inter font-semibold bg-black p-2 sm:p-6 text-white sm:top-8"
        >
          Favorites
        </button>
        <div className="flex gap-y-2 items-center flex-col justify-center">
          <Link to="/">
            <h1 className="font-inter text-[38px] md:text-[78px] font-bold">
              Find<span className="text-white">Flix</span>
            </h1>
          </Link>
          <SearchInput onSearch={fetchMovies} />
          {loading && (
            <div className="h-[60vh] flex justify-items-center items-center">
              <Loader />
            </div>
          )}
          {error && (
            <p className="text-black text-[32px] min-h-[80vh] mt-[50px]">
              {error}
            </p>
          )}
          {!loading && !error && (
            <MovieList
              favorites={favorites}
              movies={movies}
              onAddToFavorites={handleAddToFavorites}
              onSelectMovie={fetchMovieDetails}
            />
          )}
        </div>
      </div>
      <AnimatePresence>
        {selectedMovie && (
          <MovieDetail
            key={selectedMovie.imdbID}
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
