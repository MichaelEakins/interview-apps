// jest.setup.js
import "@testing-library/jest-dom";

// Mock the fetch API globally
global.fetch = jest.fn();
