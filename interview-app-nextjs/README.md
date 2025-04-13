# Testing the Next.js Interview App

This project uses Jest and React Testing Library for unit testing. The tests are designed to verify that components render correctly and function as expected without making actual network calls.

## Test Structure

The tests are organized as follows:

- `__tests__/` - Root test directory

  - `components/` - Tests for React components
  - `app/` - Tests for Next.js app pages

- `__mocks__/` - Mock data and mock implementations
  - `mockData.js` - Mock API responses
  - `styleMock.js` - Mock for CSS imports
  - `fileMock.js` - Mock for file imports

## Running Tests

To run all tests once:

```bash
npm test
```

To run tests in watch mode (tests will re-run when files change):

```bash
npm run test:watch
```

To run a specific test file:

```bash
npm test -- __tests__/components/Console.test.jsx
```

## Test Coverage

To generate a test coverage report:

```bash
npm test -- --coverage
```

The coverage report will be available in the `coverage/` directory.

## Writing New Tests

When writing new tests, follow these guidelines:

1. Mock external dependencies like API calls
2. Test component rendering and user interactions
3. Verify that components respond correctly to different states (loading, error, success)
4. Use descriptive test names that explain what is being tested

Example:

```javascript
test("shows error message when API call fails", async () => {
  // Arrange: Setup the test
  fetch.mockRejectedValueOnce(new Error("API Error"));

  // Act: Perform the action
  render(<YourComponent />);
  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  // Assert: Verify the outcome
  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
```

## Mocking Fetch Calls

The fetch API is globally mocked in `jest.setup.js`. Use `fetch.mockResolvedValueOnce()` or `fetch.mockRejectedValueOnce()` to mock successful or failed API calls.

Example:

```javascript
fetch.mockResolvedValueOnce({
  ok: true,
  json: async () => mockData,
});
```

# Testing the Next.js Interview App

This project uses Jest and React Testing Library for unit testing. The tests are designed to verify that components render correctly and function as expected without making actual network calls.

## Test Structure

The tests are organized as follows:

- `__tests__/` - Root test directory

  - `components/` - Tests for React components
  - `app/` - Tests for Next.js app pages

- `__mocks__/` - Mock data and mock implementations
  - `mockData.js` - Mock API responses
  - `styleMock.js` - Mock for CSS imports
  - `fileMock.js` - Mock for file imports

## Running Tests

To run all tests once:

```bash
npm test
```

To run tests in watch mode (tests will re-run when files change):

```bash
npm run test:watch
```

To run a specific test file:

```bash
npm test -- __tests__/components/Console.test.jsx
```

## Test Coverage

To generate a test coverage report:

```bash
npm test -- --coverage
```

The coverage report will be available in the `coverage/` directory.

## Writing New Tests

When writing new tests, follow these guidelines:

1. Mock external dependencies like API calls
2. Test component rendering and user interactions
3. Verify that components respond correctly to different states (loading, error, success)
4. Use descriptive test names that explain what is being tested

Example:

```javascript
test("shows error message when API call fails", async () => {
  // Arrange: Setup the test
  fetch.mockRejectedValueOnce(new Error("API Error"));

  // Act: Perform the action
  render(<YourComponent />);
  fireEvent.click(screen.getByRole("button", { name: /submit/i }));

  // Assert: Verify the outcome
  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
```

## Mocking Fetch Calls

The fetch API is globally mocked in `jest.setup.js`. Use `fetch.mockResolvedValueOnce()` or `fetch.mockRejectedValueOnce()` to mock successful or failed API calls.

Example:

```javascript
fetch.mockResolvedValueOnce({
  ok: true,
  json: async () => mockData,
});
```
