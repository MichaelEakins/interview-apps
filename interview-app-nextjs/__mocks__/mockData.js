// __mocks__/mockData.js
export const mockSearchResponse = {
  resultCount: 3,
  results: [
    {
      wrapperType: "collection",
      collectionType: "Album",
      artistId: 136975,
      collectionId: 1441164816,
      artistName: "The Beatles",
      collectionName: "Abbey Road (Remastered)",
      artworkUrl100: "https://example.com/artwork1.jpg",
      primaryGenreName: "Rock",
    },
    {
      wrapperType: "collection",
      collectionType: "Album",
      artistId: 136975,
      collectionId: 1441164817,
      artistName: "The Beatles",
      collectionName: "Let It Be",
      artworkUrl100: "https://example.com/artwork2.jpg",
      primaryGenreName: "Rock",
    },
    {
      wrapperType: "collection",
      collectionType: "Album",
      artistId: 136975,
      collectionId: 1441164818,
      artistName: "The Beatles",
      collectionName: "Revolver",
      artworkUrl100: "https://example.com/artwork3.jpg",
      primaryGenreName: "Rock",
    },
  ],
};

export const mockAlbum = {
  wrapperType: "collection",
  collectionType: "Album",
  artistId: 136975,
  collectionId: 1441164816,
  artistName: "The Beatles",
  collectionName: "Abbey Road (Remastered)",
  artworkUrl100: "https://example.com/artwork1.jpg",
  primaryGenreName: "Rock",
};
