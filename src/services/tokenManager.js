// @flow

const TokenManager = {
  getAccessToken: () => {
    return window.localStorage.getItem("accessToken")
  },

  hasAccessToken: () => {
    return TokenManager.getAccessToken() ? true : false
  },

  setAccessToken: token => {
    window.localStorage.setItem("accessToken", token)

    const expiry = Date.now() + 1000 * 60 * 60
    window.localStorage.setItem("tokenExpires", expiry)
  },

  getRefreshToken: () => {
    return window.localStorage.getItem("refreshToken")
  },

  setRefreshToken: token => {
    window.localStorage.setItem("refreshToken", token)
  },

  accessTokenFn: async cb => {
    const expires = TokenManager.getTokenExpires()
    if (expires && expires < Date.now()) {
      await TokenManager.refreshAccessToken()
    }

    if (TokenManager.getAccessToken()) cb(TokenManager.getAccessToken())
  },

  getTokenExpires: () => {
    const expires = window.localStorage.getItem("tokenExpires")
    if (expires) return parseInt(expires)
    return null
  },

  refreshAccessToken: async () => {
    const refreshed = await TokenManager.tokenRefresh()
    TokenManager.setAccessToken(refreshed.access_token)

    if (refreshed.refresh_token) {
      TokenManager.setRefreshToken(refreshed.refresh_token)
    }
  },

  tokenRefresh: async () => {
    const resp = await fetch(
      `/.netlify/functions/spotifyRefresh?refresh_token=${TokenManager.getRefreshToken()}`,
      {
        method: "GET"
      }
    )

    const json = await resp.json()

    return json
  },

  clearTokens: () => {
    window.localStorage.setItem("refreshToken", null)
    window.localStorage.setItem("accessToken", null)
    window.localStorage.setItem("tokenExpires", null)
  }
}

export default TokenManager
