// @flow

export default class AlbumFetcher {
  initialize() {}

  fetchPreview() {
    return fetch(
      `https://s3.us-east-2.amazonaws.com/12inch.reviews/initial.json`
    ).then(r => r.json())
  }

  fetch(page: number = 0) {
    return fetch(
      `https://s3.us-east-2.amazonaws.com/12inch.reviews/albums${page}.json`
    ).then(r => r.json())
  }
}
