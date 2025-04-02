"use client";

import React, { useState } from "react";
import "./Console.css";

interface SearchResult {
  artistName?: string;
  trackName?: string;
  collectionName?: string;
  artworkUrl100?: string;
  kind?: string;
  wrapperType?: string;
}

const Console: React.FC = () => {
  const [artistName, setArtistName] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setError(
        `Error searching for "${artistName}": ${
          err instanceof Error ? err.message : "Unknown error"
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchArtist();
  };

  return (
    <div className="console">
      <div className="console-header">
        <h1>Music Portfolio</h1>
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
          <button type="submit">Search</button>
        </form>

        <div className="results-container">
          <h2>Search Results</h2>

          {isLoading && <div className="loading-indicator">Searching...</div>}

          {error && <div className="error">{error}</div>}

          {!isLoading &&
            !error &&
            searchResults.length === 0 &&
            artistName.trim() !== "" && (
              <div className="no-results">No results found</div>
            )}

          <ul className="results-list">
            {searchResults.map((item, index) => {
              const artwork =
                item.artworkUrl100 || "https://via.placeholder.com/100";
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
};

export default Console;
