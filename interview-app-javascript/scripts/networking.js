// networking.js - Utility functions for API calls

// iTunes API base URL
const ITUNES_API_URL = "https://itunes.apple.com/search";

/**
 * Searches for an artist in the iTunes API
 *
 * TODO: Implement the fetch logic to get data from iTunes API
 *
 * @param {string} artistName - The name of the artist to search for
 * @param {number} limit - Maximum number of results to return (default: 20)
 * @returns {Promise} - Promise that resolves to the search results
 *
 * Example implementation:
 * 1. Construct the URL with proper parameters (artistName, entity types, limit)
 * 2. Make a fetch request to the iTunes API
 * 3. Parse and return the JSON response
 * 4. Handle any errors that might occur
 */
export const searchArtist = (artistName, limit = 20) => {
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
 * @returns {Promise} - Promise that resolves to the album details
 */
export const getAlbumDetails = (albumId) => {
  // TODO: Implement album details fetch

  // Placeholder return - replace with actual implementation
  return Promise.reject("Not implemented");
};
