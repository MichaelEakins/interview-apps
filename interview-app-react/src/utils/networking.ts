// src/utils/networking.tsx
export const fetchArtistData = async (
  artistName: string,
  options = { logErrors: true }
) => {
  try {
    if (!artistName.trim()) {
      return { results: [] };
    }

    const response = await fetch(
      `https://itunes.apple.com/search?term=${encodeURIComponent(
        artistName
      )}&entity=album&attribute=artistTerm&limit=25`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data from iTunes API");
    }

    return await response.json();
  } catch (error) {
    // Only log if logErrors is true
    if (options.logErrors) {
      console.error("Error fetching artist data:", error);
    }
    throw error;
  }
};
