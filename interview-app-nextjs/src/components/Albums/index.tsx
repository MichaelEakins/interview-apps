"use client";

import React, { useState } from "react";
import Album from "../Album";
import { AlbumType } from "../../types";
import "./index.css";
const Albums: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setSearchPerformed(true);

    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          searchTerm
        )}&entity=album,song&limit=20`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAlbums(data.results);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      setError(errorMessage);
      setAlbums([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="albums-container">
      <header className="albums-header">
        <h1>Music Library</h1>
      </header>

      <div className="search-form-container">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for artists, albums, or songs..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
      </div>

      {isLoading && (
        <div className="loading-indicator">
          <p>Searching...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}

      {searchPerformed && !isLoading && !error && albums.length === 0 && (
        <div className="no-results">
          <p>No results found for "{searchTerm}"</p>
        </div>
      )}

      {albums.length > 0 && (
        <div className="results-count">
          <p>
            Found {albums.length} results for "{searchTerm}"
          </p>
        </div>
      )}

      <div className="albums-grid">
        {albums.map((album, index) => (
          <Album key={`${album.collectionId}-${index}`} album={album} />
        ))}
      </div>
    </div>
  );
};

export default Albums;
