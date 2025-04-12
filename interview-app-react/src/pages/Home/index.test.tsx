// src/pages/Home/index.test.tsx
// Update the error message checking

import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./index";
import { fetchArtistData } from "../../utils/networking";

// Mock the networking module
jest.mock("../../utils/networking");
const mockedFetchArtistData = fetchArtistData as jest.MockedFunction<
  typeof fetchArtistData
>;

describe("Home Component", () => {
  beforeEach(() => {
    mockedFetchArtistData.mockClear();
  });

  it("renders the header with title and description", () => {
    render(<Home />);

    expect(screen.getByText("iTunes Album Search")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Search for your favorite artists and discover their albums"
      )
    ).toBeInTheDocument();
  });

  it("renders the search input with label", () => {
    render(<Home />);

    expect(screen.getByLabelText("Artist/Band Name")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Start typing to search...")
    ).toBeInTheDocument();
  });

  it("should fetch and display albums when user types in search box", async () => {
    const mockAlbumsResponse = {
      results: [
        {
          collectionId: 1,
          artistName: "Test Artist",
          collectionName: "Test Album",
          artworkUrl100: "https://example.com/artwork.jpg",
          releaseDate: "2021-01-01T00:00:00Z",
        },
      ],
    };

    mockedFetchArtistData.mockResolvedValue(mockAlbumsResponse);

    render(<Home />);

    const searchInput = screen.getByTestId("artist-search-input");
    fireEvent.change(searchInput, { target: { value: "test" } });

    // Wait for debounce and API call to complete
    await waitFor(
      () => {
        expect(mockedFetchArtistData).toHaveBeenCalledWith("test");
      },
      { timeout: 1000 }
    );

    await waitFor(() => {
      expect(screen.getByText("Test Album")).toBeInTheDocument();
      expect(screen.getByText("Test Artist")).toBeInTheDocument();
    });
  });

  it("should show error message when API call fails", async () => {
    mockedFetchArtistData.mockRejectedValue(new Error("API Error"));

    render(<Home />);

    const searchInput = screen.getByTestId("artist-search-input");
    fireEvent.change(searchInput, { target: { value: "test" } });

    // Modified to look for the error message within the element
    await waitFor(
      () => {
        // Use a more specific selector to find the error container
        const errorElement = screen.getByText(/Failed to fetch albums/i);
        expect(errorElement).toBeInTheDocument();
      },
      { timeout: 1000 }
    );
  });
});
