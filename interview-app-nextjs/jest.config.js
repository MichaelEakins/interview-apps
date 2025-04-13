const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  transform: {
    // Transform files with babel
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  moduleNameMapper: {
    // Handle CSS imports
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
    // Handle image imports
    "^.+\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
    // Handle module aliases
    "^@/(.*)$": "<rootDir>/$1",
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config
module.exports = createJestConfig(customJestConfig);
