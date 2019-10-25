require "fuzzy_match"

class Spotify
  def initialize(client_id, client_secret, logger = nil)
    @client_id = client_id
    @client_secret = client_secret
    @access_token = authorize
    @logger = logger
  end

  def search(artist_name, album_name)
    artist_name = filter_string(artist_name)
    album_name = filter_string(album_name)

    req = HTTP.headers("Authorization": "Bearer #{@access_token}").get("https://api.spotify.com/v1/search", params: {q: "artist:#{artist_name.downcase} album:#{album_name.downcase}", type: "album"})
    resp = JSON.parse(req.body.to_s)

    unless req.code.to_s.start_with?("2")
      raise RuntimeError, req.body
    end
    return resp["albums"] && resp["albums"]["items"] && resp["albums"]["items"][0]
  end

  def get_artist_id(artist_name)
    req = HTTP.headers("Authorization": "Bearer #{@access_token}").get("https://api.spotify.com/v1/search", params: {q: artist_name, type: "artist"})
    unless req.code.to_s.start_with?("2")
      raise RuntimeError, req.body
    end
    @logger.debug("body is #{req.body}")
    resp = JSON.parse(req.body.to_s)

    spotify_artist_name = artist_name
    if resp["artists"].class == Array && artist_name.split(" ").size > 1
      spotify_artist_name = FuzzyMatch.new(resp["artists"].map {|r| r["name"] }, must_match_at_least_one_word: true).find(artist_name)
    end

    resp["artists"]["items"].each do |result|
      puts "Artist = #{result["name"]}"
      if result["name"].downcase == spotify_artist_name.downcase
        return result["id"]
      end
    end
    nil
  end

  # https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6/albums?offset=0&limit=2&include_groups=appears_on&market=ES
  def get_album(artist_id, album_name)
    return nil if artist_id.nil?

    url = "https://api.spotify.com/v1/artists/#{artist_id}/albums?offset=0&limit=50"
    req = HTTP.headers("Authorization": "Bearer #{@access_token}").get(url)
    unless req.code.to_s.start_with?("2")
      raise RuntimeError, req.body
    end
    @logger.debug("body is #{req.body}")
    resp = JSON.parse(req.body.to_s)
    spotify_album_name = FuzzyMatch.new(resp["items"].map {|r| r["name"] }, must_match_at_least_one_word: true).find(album_name)
    resp["items"].each do |result|
      puts "Album = '#{result["name"]}'"
      if result["name"].downcase == (spotify_album_name || "").downcase
        return result
      end
    end
    nil
  end

  def authorize
    encoded = Base64.encode64("#{ENV["SPOTIFY_CLIENT_ID"]}:#{ENV["SPOTIFY_CLIENT_SECRET"]}").gsub(/\n/,"")
    resp = HTTP.headers("Authorization": "Basic #{encoded}").post("https://accounts.spotify.com/api/token", form: {grant_type: "client_credentials"})
    unless resp.code.to_s.start_with?("2")
      raise RuntimeError, resp.body
    end
    json = JSON.parse(resp.body.to_s)
    json["access_token"]
  end

  def filter_string(string)
    string
      .sub(/&amp;/,"&")
      .sub(/’/,"")
      .sub(/ EP/,"")
  end
end
