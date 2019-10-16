// @flow

export default class SpotifyPlayer {
  accessTokenFn: cb => void
  deviceID: string

  constructor(deviceID: string, accessTokenFn: cb => void) {
    this.deviceID = deviceID
    this.accessTokenFn = accessTokenFn
  }

  play(uri: string, trackNum: number, position: number) {
    return new Promise(res => {
      this.accessTokenFn(token => {
        fetch(
          `https://api.spotify.com/v1/me/player/play?device_id=${this.deviceID}`,
          {
            method: "PUT",
            body: JSON.stringify({
              context_uri: uri,
              offset: { position: trackNum },
              position_ms: position
            }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        ).then(res)
      })
    })
  }

  pause() {
    return new Promise(res => {
      this.accessTokenFn(token => {
        fetch(
          `https://api.spotify.com/v1/me/player/pause?device_id=${this.deviceID}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        ).then(res)
      })
    })
  }
}
