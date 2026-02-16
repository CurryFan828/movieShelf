import { createContext, useState, useEffect } from "react";

// Create the context
export const MovieContext = createContext();

// Provider component
export function MovieProvider({ children }) {
  // Initialize state from localStorage if available
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Save watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add movie to watchlist
  function addToWatchlist(movie) {
    setWatchlist((prev) => {
      const exists = prev.find((m) => m.id === movie.id);
      if (exists) return prev;
      return [...prev, movie];
    });
  }

  // Remove movie from watchlist
  function removeFromWatchlist(movieId) {
    setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
  }

  // Add movie to favorites
  function addToFavorites(movie) {
    setFavorites((prev) => {
      if (prev.find((m) => m.id === movie.id)) return prev;
      return [...prev, movie];
    });
  }

  // Remove movie from favorites
  function removeFromFavorites(movieId) {
    setFavorites((prev) => prev.filter((m) => m.id !== movieId));
  }

  return (
    <MovieContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        favorites,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
