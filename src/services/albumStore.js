// @flow
import AlbumFetcher from "./albumFetcher"
import AlbumModel from "../models/album"
import IndexStore from "./indexStore"

export default class AlbumStore {
  fetcher: AlbumFetcher
  remoteTimestamp: number
  filesCount: number
  latestAlbums: Array<AlbumModel>
  albums: Array<AlbumModel>

  async initialize() {
    this.fetcher = new AlbumFetcher()
    this.indexStore = new IndexStore()
    await this.indexStore.initialize()
    this.albums = await this.indexStore.fetch()
    const data = await this.fetcher.fetch(0)
    this.albumCount = data.album_count
    this.latestAlbums = data.albums

    if (this.albumCount === this.albums.length) {
      return Promise.resolve()
    }

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
    this.indexStore.save(this.albums)
  }

  retrieve() {
    return this.indexStore.fetch()
  }
}
