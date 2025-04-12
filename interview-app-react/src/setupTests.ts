// setupTests.ts
import "@testing-library/jest-dom";

// Silence console.error in tests
const originalConsoleError = console.error;
console.error = (...args) => {
  // Disable console.error during tests
  // Uncomment if you want to see console errors for debugging:
  // originalConsoleError(...args);
};
