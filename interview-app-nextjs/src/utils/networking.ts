// networking.ts - Utility functions for API calls

// iTunes API base URL
export const ITUNES_API_URL = "https://itunes.apple.com/search";

// Define interfaces for API responses
export interface ITunesResult {
  wrapperType: string;
  kind?: string;
  artistId: number;
  collectionId?: number;
  trackId?: number;
  artistName: string;
  collectionName?: string;
  trackName?: string;
  collectionCensoredName?: string;
  trackCensoredName?: string;
  artistViewUrl: string;
  collectionViewUrl?: string;
  trackViewUrl?: string;
  previewUrl?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  collectionPrice?: number;
  trackPrice?: number;
  releaseDate?: string;
  collectionExplicitness?: string;
  trackExplicitness?: string;
  discCount?: number;
  discNumber?: number;
  trackCount?: number;
  trackNumber?: number;
  trackTimeMillis?: number;
  country: string;
  currency?: string;
  primaryGenreName: string;
}

export interface ITunesSearchResponse {
  resultCount: number;
  results: ITunesResult[];
}

/**
 * Searches for an artist in the iTunes API
 *
 * TODO: Implement the fetch logic to get data from iTunes API
 *
 * @param {string} artistName - The name of the artist to search for
 * @param {number} limit - Maximum number of results to return (default: 20)
 * @returns {Promise<ITunesSearchResponse>} - Promise that resolves to the search results
 *
 * Example implementation:
 * 1. Construct the URL with proper parameters (artistName, entity types, limit)
 * 2. Make a fetch request to the iTunes API
 * 3. Parse and return the JSON response
 * 4. Handle any errors that might occur
 */
export const searchArtist = (
  artistName: string,
  limit: number = 20
): Promise<ITunesSearchResponse> => {
  // TODO: Replace this placeholder with actual fetch implementation
  // You will need to:
  // - Encode the artist name for URLs
  // - Append parameters for entity type (music, album)
  // - Set the appropriate limit
  // - Handle the response

  // Placeholder return - replace with actual implementation
  return Promise.reject("Not implemented");
};

/**
 * Gets details about a specific album
 *
 * TODO: Implement the fetch logic to get album details
 *
 * @param {string} albumId - The ID of the album
 * @returns {Promise<ITunesResult>} - Promise that resolves to the album details
 */
export const getAlbumDetails = (albumId: string): Promise<ITunesResult> => {
  // TODO: Implement album details fetch

  // Placeholder return - replace with actual implementation
  return Promise.reject("Not implemented");
};
