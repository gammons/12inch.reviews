// @flow

export default class SpotifyPlayer {
  constructor(deviceID, accessToken) {
    console.log("init new SpotifyPlayer with ", deviceID, accessToken)
    this.deviceID = deviceID
    this.accessToken = accessToken
  }

  play(uri) {
    return fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${this.deviceID}`,
      {
        method: "PUT",
        body: JSON.stringify({ uris: [uri] }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`
        }
      }
    )
  }

  pause() {
    return fetch(
      `https://api.spotify.com/v1/me/player/pause?device_id=${this.deviceID}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.accessToken}`
        }
      }
    )
  }
}
