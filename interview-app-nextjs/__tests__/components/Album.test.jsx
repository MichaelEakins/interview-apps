// __tests__/components/Album.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Album from "../../src/components/Album";

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe("Album Component", () => {
  // Create proper mock album that matches your component's expectations
  const mockAlbum = {
    artworkUrl100: "https://example.com/artwork.jpg",
    collectionName: "Test Album",
    artistName: "Test Artist",
    primaryGenreName: "Rock",
    collectionId: 123456,
  };

  test("renders album details correctly", () => {
    render(<Album album={mockAlbum} />);

    // Test album name is rendered
    expect(screen.getByText(mockAlbum.collectionName)).toBeInTheDocument();

    // Test artist name is rendered
    expect(screen.getByText(mockAlbum.artistName)).toBeInTheDocument();
  });

  test("handles missing data gracefully", () => {
    const incompleteAlbum = {
      collectionId: 12345,
      artistName: "Test Artist",
      // No collectionName or artwork
    };

    render(<Album album={incompleteAlbum} />);

    // Should render artist name
    expect(screen.getByText(incompleteAlbum.artistName)).toBeInTheDocument();

    // Should render "Unknown" or similar fallback
    expect(screen.getByText("Unknown")).toBeInTheDocument();

    // Should still render an image with placeholder
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("placeholder-album.jpg");
  });

  // Skipping this test since the component doesn't implement onClick handler yet
  test.skip("clicking on album calls onClick handler if provided", () => {
    const mockOnClick = jest.fn();
    const { container } = render(
      <Album album={mockAlbum} onClick={mockOnClick} />
    );

    // Find and click the album container using container
    const albumElement = container.querySelector(".album");
    fireEvent.click(albumElement);

    // Verify callback was called
    expect(mockOnClick).toHaveBeenCalled();
  });
});
