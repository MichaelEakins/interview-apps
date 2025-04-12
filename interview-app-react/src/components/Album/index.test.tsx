// src/components/Album/index.test.tsx

import React from "react";
import { render, screen } from "@testing-library/react";
import { Album } from "./index";

describe("Album Component", () => {
  const originalDate = global.Date;

  beforeEach(() => {
    const MockDate = class extends originalDate {
      constructor(date?: string | number | Date) {
        super(date || "2023-01-01T00:00:00Z");
      }

      getFullYear(): number {
        return 2019;
      }
    } as DateConstructor;

    global.Date = MockDate;
  });

  afterEach(() => {
    global.Date = originalDate;
  });

  const mockAlbumProps = {
    artistName: "Test Artist",
    albumName: "Test Album",
    artworkUrl: "https://example.com/artwork.jpg",
    releaseDate: "2022-01-01T00:00:00Z",
    collectionId: 123456789,
  };

  it("renders album information correctly", () => {
    render(<Album {...mockAlbumProps} />);

    expect(screen.getByText("Test Album")).toBeInTheDocument();
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
    expect(screen.getByText("2019")).toBeInTheDocument();

    const image = screen.getByAltText("Test Album by Test Artist");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "https://example.com/artwork.jpg");
  });

  it("renders without release date when not provided", () => {
    const { releaseDate, ...props } = mockAlbumProps;
    render(<Album {...props} />);

    expect(screen.getByText("Test Album")).toBeInTheDocument();
    expect(screen.getByText("Test Artist")).toBeInTheDocument();
    expect(screen.queryByText("2019")).not.toBeInTheDocument();
  });
});
