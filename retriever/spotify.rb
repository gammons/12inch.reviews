require "fuzzy_match"

class Spotify
  def authorize
    encoded = Base64.encode64("#{ENV["SPOTIFY_CLIENT_ID"]}:#{ENV["SPOTIFY_CLIENT_SECRET"]}").gsub(/\n/,"")
    resp = HTTP.headers("Authorization": "Basic #{encoded}").post("https://accounts.spotify.com/api/token", form: {grant_type: "client_credentials"})
    json = JSON.parse(resp.body.to_s)
    ENV["SPOTIFY_ACCESS_TOKEN"] = json["access_token"]
  end

  def get_artist_id(artist_name)
    resp = JSON.parse(HTTP.headers("Authorization": "Bearer #{ENV["SPOTIFY_ACCESS_TOKEN"]}").get("https://api.spotify.com/v1/search", params: {q: artist_name, type: "artist"}))
    spotify_artist_name = FuzzyMatch.new(resp["artists"].map {|r| r["name"] }, must_match_at_least_one_word: true).find(artist_name)
    resp["artists"]["items"].each do |result|
      if result["name"] == spotify_artist_name
        return result["id"]
      end
    end
    nil
  end

  # https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?offset=0&limit=2&include_groups=appears_on&market=ES
  def get_album_id(artist_id, album_name)
    url = "https://api.spotify.com/v1/artists/#{artist_id}/albums?offset=0&limit=50&include_groups=album"
    resp = JSON.parse(HTTP.headers("Authorization": "Bearer #{ENV["SPOTIFY_ACCESS_TOKEN"]}").get(url))
    spotify_album_name = FuzzyMatch.new(resp["items"].map {|r| r["name"] }, must_match_at_least_one_word: true).find(album_name)
    puts "album_name = '#{album_name}', spotify_album_name = '#{spotify_album_name}'"
    resp["items"].each do |result|
      if result["name"] == spotify_album_name
        return result["id"]
      end
    end
    nil
  end
end
