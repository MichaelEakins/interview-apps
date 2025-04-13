import React from "react";
import { AlbumType } from "../../types";
import "./index.css";

interface AlbumProps {
  album: AlbumType;
}

const Album: React.FC<AlbumProps> = ({ album }) => {
  // Use a placeholder image if no artwork is available
  const imageUrl = album.artworkUrl100 || "/placeholder-album.jpg";

  // Get the appropriate name based on what's available
  const name = album.collectionName || album.trackName || "Unknown";
  const artist = album.artistName || "Unknown Artist";
  const type = album.wrapperType || album.kind || "Unknown Type";

  return (
    <div className="album">
      <div className="album-image">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="album-info">
        <h3 className="album-title">{name}</h3>
        <p className="album-artist">{artist}</p>
        <p className="album-type">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </p>
      </div>
    </div>
  );
};

export default Album;
