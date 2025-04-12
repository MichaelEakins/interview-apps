# React Interview App

This is a React-based application designed for interview purposes. The app allows users to search for albums by their favorite artists using the iTunes API. It demonstrates key React concepts such as component-based architecture, state management, and API integration.

## Features

- Search for albums by artist name.
- Display album details, including artwork, album name, artist name, and release year.
- Handle loading, error, and empty states gracefully.
- Responsive and user-friendly interface.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MichaelEakins/interview-apps.git
   cd interview-apps/interview-app-react
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the App

Start the development server:

```bash
npm start
# or
yarn start
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to view the app.

## How to Use

1. Enter the name of an artist or band in the search input field.
2. The app will fetch and display a list of albums related to the artist.
3. View album details, including artwork, album name, artist name, and release year.

## Testing

This app includes unit tests for key components and utilities.

### Running Tests

To run the tests, use the following command:

```bash
npm test
# or
yarn test
```

### Test Coverage

The tests cover the following areas:

- **Components**:

  - `Album`: Verifies that album details are displayed correctly.
  - `Albums`: Tests loading, error, empty, and populated states.
  - `Home`: Ensures the search functionality works as expected.

- **Utilities**:
  - `fetchArtistData`: Validates API calls and error handling.

### Debugging Tests

If you encounter issues during testing, ensure that:

- The `jest` environment is correctly set up.
- Mocked API calls are properly configured in the test files.

## Folder Structure

```
src/
├── components/
│   ├── Album/
│   ├── Albums/
├── pages/
│   └── Home/
├── utils/
└── index.tsx
```

## License

This project is licensed under the GNU General Public License v3.0. See the [LICENSE](./LICENSE) file for details.
