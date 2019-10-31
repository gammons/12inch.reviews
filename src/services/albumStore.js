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
    this.latestAlbums = []
    this.fetcher = new AlbumFetcher()
    this.indexStore = new IndexStore()

    await this.indexStore.initialize()
    this.albumCount = await this.indexStore.count()

    const data = await this.fetcher.fetchPreview()
    this.remoteAlbumCount = data.album_count

    return Promise.resolve(data.albums.map(album => new AlbumModel(album)))
  }

  // reconcile localStorage albums with latest albums
  reconcile() {
    return new Promise(resolve => {
      const handle = async () => {
        let diff = this.remoteAlbumCount - this.albumCount
        let n = 0
        const newAlbums = []

        while (n < diff) {
          if (n % 1000 === 0) {
            this.latestAlbums = (await this.fetcher.fetch(n / 1000)).albums
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

  saveToLocal(newAlbums) {
    this.indexStore.add(newAlbums)
  }

  retrieve() {
    return this.indexStore.fetch()
  }
}
