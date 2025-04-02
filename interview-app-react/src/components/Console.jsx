import React, { useState, useEffect } from "react";
import "./Console.css";

/*
 * iTunes Music Search Application
 *
 * This application allows users to search for music in the iTunes library.
 *
 * Known Issues:
 * 1. Album artwork images are not displaying correctly
 * 2. "No results" message appears before search is performed
 * 3. Page continuously re-renders after performing a search
 */

function Console() {
  const [artistName, setArtistName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTrigger, setSearchTrigger] = useState(0);

  // This effect causes continuous re-rendering after search
  useEffect(() => {
    if (searchResults.length > 0) {
      setSearchTrigger((prev) => prev + 1);
    }
  }, [searchResults, searchTrigger]);

  const handleInputChange = (e) => {
    setArtistName(e.target.value);
  };

  const searchArtist = async () => {
    if (!artistName.trim()) return;

    setIsLoading(true);
    setError("");
    setSearchResults([]);

    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          artistName
        )}&entity=musicArtist,album,song&limit=20`
      );
      const data = await response.json();
      setSearchResults(data.results);
    } catch (err) {
      setError(`Error searching for "${artistName}": ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchArtist();
  };

  return (
    <div className="console">
      <div className="console-header">
        <h1>Music Search</h1>
      </div>
      <div className="console-content">
        <form className="search-container" onSubmit={handleSubmit}>
          <label htmlFor="artist-input">Artist:</label>
          <input
            type="text"
            id="artist-input"
            placeholder="Enter artist name..."
            value={artistName}
            onChange={handleInputChange}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Searching..." : "Search"}
          </button>
        </form>

        <div className="results-container">
          <h2>Search Results</h2>

          {isLoading && <div className="loading-indicator">Searching...</div>}

          {error && <div className="error">{error}</div>}

          {/* This condition shows "No results" even before search is performed */}
          {!isLoading && !error && artistName.trim() !== "" && (
            <div className="no-results">No results found</div>
          )}

          <ul className="results-list">
            {searchResults.map((item, index) => {
              // Album artwork URL is incorrect - using a broken URL
              const artwork =
                item.kind === "song"
                  ? "broken-url"
                  : "https://via.placeholder.com/100";
              const type = item.kind || item.wrapperType || "Unknown";
              const name = item.artistName || item.trackName || "Unknown";

              return (
                <li key={index} className="result-item">
                  <div className="result-image">
                    <img src={artwork} alt={name} />
                  </div>
                  <div className="result-info">
                    <h3>{name}</h3>
                    <p>{type.charAt(0).toUpperCase() + type.slice(1)}</p>
                    {item.collectionName && <p>Album: {item.collectionName}</p>}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Console;
