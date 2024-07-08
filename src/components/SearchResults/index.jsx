import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../Loader/index";
import MovieList from "../MovieList";
import SearchInput from "../SearchInput";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const fetchMovies = async (query, page) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${query}&page=${page}&apikey=d87cd140`
      );
      if (response.data.Response === "True") {
        setMovies(response.data.Search || []);
        setTotalResults(parseInt(response.data.totalResults));
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
  };

  useEffect(() => {
    if (query) {
      fetchMovies(query, currentPage);
    }
  }, [query, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalResults / 10);

  const getPaginationRange = () => {
    const range = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  const paginationRange = getPaginationRange();

  return (
    <div className="bg-[#8f8f8f] py-10">
      <div className="flex gap-y-2 items-center flex-col justify-center">
        <Link to="/">
          <h1 className="font-inter text-[38px] font-bold">
            Find<span className="text-white">Flix</span>
          </h1>
        </Link>
        <SearchInput onSearch={fetchMovies} />
        {loading && (
          <div className="min-h-[80vh]">
            <Loader />
          </div>
        )}
        {error && <p className="text-black text-[32px] mt-[50px]">{error}</p>}
        {!loading && !error && (
          <MovieList movies={movies} onSelectMovie={() => {}} />
        )}
        <div className="flex w-[320px] justify-center mx-auto gap-4 mt-4">
          {paginationRange.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`p-4 rounded-xl font-semibold ${
                currentPage === page ? "bg-black text-white" : "bg-white"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
