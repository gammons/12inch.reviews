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

    this.albumCount = await this.indexStore.count()

    const data = await this.fetcher.fetch(0)
    this.remoteAlbumCount = data.album_count
    this.latestAlbums = data.albums

    if (this.albumCount === this.remoteAlbumCount) {
      return Promise.resolve()
    }

    return this.reconcile()
  }

  // reconcile localStorage albums with latest albums
  reconcile() {
    return new Promise(resolve => {
      const handle = async () => {
        let diff = this.remoteAlbumCount - this.albumCount
        let n = 0
        const newAlbums = []
        while (n < diff) {
          if (n > 0 && n % 1000 === 0) {
            const latest = (this.latestAlbums = await this.fetcher.fetch(
              n / 1000
            ))
            this.latestAlbums = latest.albums
          }
          newAlbums.push(this.latestAlbums[n % 1000])
          n++
        }
        this.saveToLocal(newAlbums)
        resolve()
      }
      handle()
    })
  }

  // save al
  saveToLocal(newAlbums) {
    this.indexStore.add(newAlbums)
  }

  retrieve() {
    return this.indexStore.fetch()
  }
}
