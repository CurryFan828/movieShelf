import { Link } from 'react-router-dom';
import { useState } from 'react';

function Header({ onSearch }) { // receive onSearch from App.jsx
  const [searchQuery, setSearchQuery] = useState('');

  // Call the search handler from App
  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery); // trigger search in App
    }
  };

  // Trigger search when Enter is pressed
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="app-title">MovieShelf</Link>

        <nav className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
          <Link to="/watchlist" className="nav-link">Watchlist</Link>
        </nav>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // track input
            onKeyDown={handleKeyDown} // trigger on Enter
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
