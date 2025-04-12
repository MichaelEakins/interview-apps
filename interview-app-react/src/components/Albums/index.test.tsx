// src/components/Albums/Albums.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import { Albums } from "./index";

describe("Albums Component", () => {
  const mockAlbums = [
    {
      artistName: "Artist 1",
      albumName: "Album 1",
      artworkUrl: "https://example.com/artwork1.jpg",
      collectionId: 1,
    },
    {
      artistName: "Artist 2",
      albumName: "Album 2",
      artworkUrl: "https://example.com/artwork2.jpg",
      collectionId: 2,
    },
  ];

  it("renders loading state", () => {
    render(<Albums albums={[]} isLoading={true} error={null} />);
    expect(screen.getByText("Loading albums...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    render(<Albums albums={[]} isLoading={false} error="Test error" />);
    expect(screen.getByText("Error: Test error")).toBeInTheDocument();
  });

  it("renders empty state when no albums found", () => {
    render(<Albums albums={[]} isLoading={false} error={null} />);
    expect(
      screen.getByText("No albums found. Try another search.")
    ).toBeInTheDocument();
  });

  it("renders albums list correctly", () => {
    render(<Albums albums={mockAlbums} isLoading={false} error={null} />);

    expect(screen.getByText("Showing 2 results")).toBeInTheDocument();
    expect(screen.getByText("Album 1")).toBeInTheDocument();
    expect(screen.getByText("Artist 1")).toBeInTheDocument();
    expect(screen.getByText("Album 2")).toBeInTheDocument();
    expect(screen.getByText("Artist 2")).toBeInTheDocument();
  });
});
