import { useState, useEffect } from 'react';
import MovieGrid from '../components/MovieGrid';
import { getPopularMovies } from '../services/movieService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

function Home({ searchResults }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const displayMovies = searchResults || movies;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null); // reset error state before fetching

        // TEMPORARY delay so you can see the spinner
        await new Promise(resolve => setTimeout(resolve, 1000));

        const movieData = await getPopularMovies();
        setMovies(movieData);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies. Please try again later.'); // Set error state
        setMovies([]); // optional: clear movies so map doesn't break
      } finally {
        setLoading(false); // ALWAYS runs
      }
    };

    fetchMovies();
  }, []);

  // Show spinner while loading
  if (loading) {
    return (
      <main className="main-content">
        <LoadingSpinner />
      </main>
    );
  }

  // Show error message if error occurred
  if (error) {
    return (
      <main className="main-content">
        <ErrorMessage message={error} />
      </main>
    );
  }

  // Render movies normally
  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{searchResults ? 'Search Results' : 'Popular Movies'}</h2>
        <p>Discover and save your favorite films</p>
      </div>

      <MovieGrid movies={displayMovies} />
    </main>
  );
}

export default Home;
