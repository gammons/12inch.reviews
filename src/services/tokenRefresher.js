const tokenRefresh = async refreshToken => {
  const resp = await fetch(
    `/.netlify/functions/spotifyRefresh?refresh_token=${refreshToken}`,
    {
      method: "GET"
    }
  )

  const json = await resp.json()

  return json
}

export default tokenRefresh
