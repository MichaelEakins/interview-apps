// src/components/Album/index.tsx

import React from "react";
import "./styles.css";

export interface AlbumProps {
  artistName: string;
  albumName: string;
  artworkUrl: string;
  releaseDate?: string;
  collectionId: number;
}

export const Album: React.FC<AlbumProps> = ({
  artistName,
  albumName,
  artworkUrl,
  releaseDate,
  collectionId,
}) => {
  return (
    <div className="album" data-testid={`album-${collectionId}`}>
      <div className="album-artwork">
        <img src={artworkUrl} alt={`${albumName} by ${artistName}`} />
      </div>
      <div className="album-info">
        <h3 className="album-title">{albumName}</h3>
        <p className="album-artist">{artistName}</p>
        {releaseDate && (
          <p className="album-release-date">
            {new Date(releaseDate).getFullYear()}
          </p>
        )}
      </div>
    </div>
  );
};
