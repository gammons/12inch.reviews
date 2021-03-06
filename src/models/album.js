// @flow

export default class Album {
  id: string
  timestamp: string
  created_at: string
  title: string
  artist: string
  rating: string
  bnm: boolean
  bnr: boolean
  label: string
  url: string
  description: string
  genre: string
  imageUrl: string

  constructor(args) {
    this.id = args.id
    this.timestamp = Date.parse(args.created_at)
    this.created_at = args.created_at
    this.title = args.title
    this.artist = args.artist
    this.rating = args.rating
    this.bnm = args.bnm
    this.bnr = args.bnr
    this.label = args.label
    this.url = args.url
    this.description = args.description
    this.genre = args.genre
    this.spotify_album_id = args.spotify_album_id
    this.spotify_artist_id = args.spotify_artist_id
    this.image_url = args.image_url
  }

  prettyReviewDate() {
    return new Date(this.timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    })
  }
}
