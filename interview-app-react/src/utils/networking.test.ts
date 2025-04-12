// src/utils/networking.test.tsx

import { fetchArtistData } from "./networking";

// Mock fetch
global.fetch = jest.fn();

describe("fetchArtistData", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it("should make a fetch request to the iTunes API with the correct URL", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue({ results: [] }),
    };
    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

    await fetchArtistData("test artist");

    expect(global.fetch).toHaveBeenCalledWith(
      "https://itunes.apple.com/search?term=test%20artist&entity=album&attribute=artistTerm&limit=25"
    );
    expect(mockResponse.json).toHaveBeenCalled();
  });

  it("should return empty results for empty search term", async () => {
    const result = await fetchArtistData("");

    expect(result).toEqual({ results: [] });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("should throw an error if the fetch fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false });

    await expect(fetchArtistData("test")).rejects.toThrow(
      "Failed to fetch data from iTunes API"
    );
  });

  it("should propagate errors from the fetch call", async () => {
    const error = new Error("Network error");
    (global.fetch as jest.Mock).mockRejectedValue(error);

    await expect(
      fetchArtistData("test", { logErrors: false })
    ).rejects.toThrow();
  });
});
