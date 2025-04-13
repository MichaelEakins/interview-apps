// __tests__/app/page.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../../src/app/page";

// Mock the Albums component if needed
jest.mock("../../src/components/Albums", () => {
  return function MockAlbums() {
    return <div data-testid="mock-albums">Mock Albums Component</div>;
  };
});

describe("Home Page", () => {
  test("renders the correct layout", () => {
    render(<Home />);
    // Test your actual page behavior
  });
});
