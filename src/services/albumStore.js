// @flow
import AlbumFetcher from "./albumFetcher"
import AlbumModel from "../models/album"

export default class AlbumStore {
  fetcher: AlbumFetcher
  remoteTimestamp: number
  filesCount: number
  latestAlbums: Array<AlbumModel>
  albums: Array<AlbumModel>

  async initialize() {
    this.fetcher = new AlbumFetcher()
    this.albums = JSON.parse(window.localStorage.getItem("albums")) || []
    const data = await this.fetcher.fetch(0)
    this.albumCount = data.album_count
    this.latestAlbums = data.albums
    return this.reconcile()
  }

  // reconcile localStorage albums with latest albums
  reconcile() {
    return new Promise(resolve => {
      const handle = async () => {
        let diff = this.albumCount - this.albums.length
        let n = 0
        while (n < diff) {
          if (n > 0 && n % 1000 === 0) {
            const latest = (this.latestAlbums = await this.fetcher.fetch(
              n / 1000
            ))
            this.latestAlbums = latest.albums
          }
          this.albums.push(this.latestAlbums[n % 1000])
          n++
        }
        this.saveToLocal()
        resolve()
      }
      handle()
    })
  }

  // save al
  saveToLocal() {
    console.log("saveToLocal this.albums = ", this.albums)
    window.localStorage.setItem("albums", JSON.stringify(this.albums))
  }

  retrieve() {
    console.log("albumStore.retrieve")
    const albums = JSON.parse(window.localStorage.getItem("albums"))
    console.log("albums = ", albums.length)
    return albums.map(album => {
      //console.log("album = ", album)
      return new AlbumModel(album)
    })
  }
}
