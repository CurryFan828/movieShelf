const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // TMDb API key from .env
const BASE_URL = 'https://api.themoviedb.org/3';   // TMDb base URL

// Fetch popular movies from TMDb
export async function getPopularMovies() {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

  // Check for API errors
  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }

  const data = await response.json();
  return data.results; // Return only the array of movies
}

// Search movies by title
export async function searchMovies(query) {
  if (!query) return []; // optional: return empty array if query is blank

  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
  );

  // ✅ Check for API errors
  if (!response.ok) {
    throw new Error('Failed to search movies');
  }

  const data = await response.json();
  return data.results; // array of matching movies
}
