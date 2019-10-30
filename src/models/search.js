// @flow
export default class Search {
  artist: string
  genre: string
  rating: number
  sort: string

  constructor(args = {}) {
    this.artist = args.artist
    this.genre = args.genre
    this.rating = args.rating
    this.sort = args.sort
  }
}
