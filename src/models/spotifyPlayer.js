// @flow

export default class SpotifyPlayer {
  constructor(deviceID, accessToken) {
    console.log("init new SpotifyPlayer with ", deviceID, accessToken)
    this.deviceID = deviceID
    this.accessToken = accessToken
  }

  getPlayerState() {
    return fetch(`https://api.spotify.com/v1/me/player`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.accessToken}`
      }
    })
  }

  play(uri, trackNum, position) {
    return fetch(
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