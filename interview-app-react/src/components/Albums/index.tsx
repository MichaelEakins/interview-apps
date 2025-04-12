// src/components/Albums/index.tsx

import React from "react";
import { Album, AlbumProps } from "../Album";
import "./styles.css";

export interface AlbumsProps {
  albums: AlbumProps[];
  isLoading: boolean;
  error: string | null;
}

export const Albums: React.FC<AlbumsProps> = ({ albums, isLoading, error }) => {
  if (isLoading) {
    return <div className="albums-loading">Loading albums...</div>;
  }

  if (error) {
    return <div className="albums-error">Error: {error}</div>;
  }

  if (albums.length === 0) {
    return (
      <div className="albums-empty">No albums found. Try another search.</div>
    );
  }

  return (
    <div className="albums-container" data-testid="albums-container">
      <p className="albums-count">Showing {albums.length} results</p>
      <div className="albums-list">
        {albums.map((album) => (
          <Album
            key={album.collectionId}
            artistName={album.artistName}
            albumName={album.albumName}
            artworkUrl={album.artworkUrl}
            releaseDate={album.releaseDate}
            collectionId={album.collectionId}
          />
        ))}
      </div>
    </div>
  );
};
