import { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import SearchInput from "./components/SearchInput";
import MovieList from "./components/MovieList";
import Loader from "./components/Loader";
import MovieDetail from "./components/MovieDetails";
import { Link } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

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
      if (prevFavorites.find((fav) => fav.imdbID === movie.imdbID)) {
        return prevFavorites; // Movie is already in favorites
      } else {
        return [...prevFavorites, movie];
      }
    });
  };

  useEffect(() => {
    fetchTopRatedMovies();
  }, []);

  return (
    <>
      <div className="bg-[#8f8f8f] py-10">
        <Link to="/favorites">
          <div className="absolute hover:scale-105 right-8 font-inter font-semibold bg-black p-6 rounded-lg text-white top-8">
            Favorites
          </div>
        </Link>
        <div className="flex gap-y-2 items-center flex-col justify-center">
          <Link to="/">
            <h1 className="font-inter text-[38px] font-bold">
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
      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}

export default App;
