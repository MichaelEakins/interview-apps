// src/pages/Home/index.tsx

import React, { useState, useEffect } from "react";
import { Albums } from "../../components/Albums";
import { fetchArtistData } from "../../utils/networking";
import "./styles.css";

interface ItunesAlbum {
  collectionId: number;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  releaseDate: string;
}

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // Debounce search term to avoid too many API calls
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Fetch data when debounced search term changes
  useEffect(() => {
    const fetchData = async () => {
      if (!debouncedSearchTerm.trim()) {
        setAlbums([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchArtistData(debouncedSearchTerm);

        const formattedAlbums = data.results.map((album: ItunesAlbum) => ({
          collectionId: album.collectionId,
          artistName: album.artistName,
          albumName: album.collectionName,
          artworkUrl: album.artworkUrl100.replace("100x100", "200x200"),
          releaseDate: album.releaseDate,
        }));

        setAlbums(formattedAlbums);
      } catch (err) {
        setError("Failed to fetch albums. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [debouncedSearchTerm]);

  return (
    <div className="home-container" data-testid="home-container">
      <div className="home-header">
        <h1>iTunes Album Search</h1>
        <p>Search for your favorite artists and discover their albums</p>
      </div>

      <div className="search-container">
        <label htmlFor="artist-search">Artist/Band Name</label>
        <input
          id="artist-search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Start typing to search..."
          data-testid="artist-search-input"
        />
      </div>

      <Albums albums={albums} isLoading={isLoading} error={error} />
    </div>
  );
};

export default Home;
