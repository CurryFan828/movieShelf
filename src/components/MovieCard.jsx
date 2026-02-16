import { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";

const MovieCard = ({ movie }) => {

  const { watchlist, addToWatchlist, removeFromWatchlist, favorites, addToFavorites, removeFromFavorites } = useContext(MovieContext);

  // Check if movie already in watchlist
  const isFavorite = favorites.some((m) => m.id === movie.id);
  const isInWatchlist = watchlist.some((m) => m.id === movie.id);


  // Poster URL
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : "https://placehold.co/300x450/667eea/ffffff?text=No+Poster";

  // Toggle favorite
  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  // Toggle watchlist
   const handleWatchlistClick = () => {
    if (isInWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img src={posterUrl} alt={movie.title} />
      </div>

      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>

        <div className="movie-details">
          <span className="movie-rating">⭐ {movie.vote_average}</span>
          <span className="movie-year">
            {movie.release_date?.substring(0, 4)}
          </span>
        </div>
        <div className="button-group">
          {/* Favorite Button */}
          <button
            className={`favorite-button ${isFavorite ? "favorited" : ""}`}
            onClick={toggleFavorite}
          >
            {isFavorite ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
          </button>

          {/* Watchlist Button */}
          <button
            className={`watchlist-button ${isInWatchlist ? "in-watchlist" : ""}`}
            onClick={handleWatchlistClick}
          >
            {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
