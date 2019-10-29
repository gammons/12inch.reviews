// @flow

export default class AlbumFetcher {
  page: number

  constructor(metadata) {
    //this.albums = []
    this.page = 0
    this.metadata = metadata
  }

  fetchFirst() {
    return fetch(
      `https://s3.us-east-2.amazonaws.com/12inch.reviews/albums0.json`
    ).then(data => data.json())
  }

  async fetchRest() {
    const albums = []
    for (let i = 1; i < this.metadata.files; i++) {
      const data = await fetch(
        `https://s3.us-east-2.amazonaws.com/12inch.reviews/albums${i}.json`
      ).then(data => data.json())
      console.log("adding data file...")

      albums.concat(data)
      // data.forEach(album => {
      //   console.log("adding album")
      //   store.add(album)
      // })
    }
    return albums
  }
}
