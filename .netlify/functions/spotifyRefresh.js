import fetch from "node-fetch"
import formData from "form-data"

exports.handler = async (event, context, callback) => {
  const args = []
  args.push("grant_type=refresh_token")
  args.push(`refresh_token=${event.queryStringParameters.refresh_token}`)

  const clientID = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const auth = Buffer.from(`${clientID}:${clientSecret}`).toString("base64")

  const spotifyUrl = `https://accounts.spotify.com/api/token?${args.join("&")}`

  const resp = await fetch(spotifyUrl, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })

  const data = await resp.json()

  callback(null, {
    statusCode: 200,
    body: JSON.stringify(data)
  })
}
