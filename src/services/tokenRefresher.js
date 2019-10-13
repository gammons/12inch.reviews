const tokenRefresh = async refreshToken => {
  const resp = await fetch(
    `/.netlify/functions/spotifyRefresh?refresh_token=${refreshToken}`,
    {
      method: "GET"
    }
  )

  return JSON.parse(await resp.text()).access_token
}

export default tokenRefresh
