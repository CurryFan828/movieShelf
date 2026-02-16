import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Watchlist from "./pages/Watchlist";
import { useState } from 'react';
import { searchMovies } from './services/movieService';
import { MovieProvider } from "./contexts/MovieContext";
import './App.css';

function App() {
  // State to hold search results
  const [searchResults, setSearchResults] = useState(null);

  // Handler function to query search
  const handleSearch = async (query) => {
    const results = await searchMovies(query); // call TMDb search
    setSearchResults(results); // store results in state
  };

  return (
    <Router>
      <MovieProvider>
        <div className="app">
          <Header onSearch={handleSearch} />

          <Routes>
            <Route path="/" element={<Home searchResults={searchResults} />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
        </div>
      </MovieProvider>
    </Router>
  );
};

export default App;