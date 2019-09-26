require_relative "album"

class Pitchfork
  def get_albums
    resp = JSON.parse(HTTP.get("https://pitchfork.com/api/v2/search/?types=reviews&hierarchy=sections%2Freviews%2Falbums%2Cchannels%2Freviews%2Falbums&sort=publishdate%20desc%2Cposition%20asc&size=12&start=0"))

    albums = resp["results"]["list"].map do |result|
      album = Album.new
      album.id = result["id"]
      album.timestamp = result["timestamp"]
      album.title = result["title"]
      album.artist = result["artists"][0]["display_name"]
      album.rating = result["tombstone"]["albums"][0]["rating"]["display_rating"]
      album.bnm = result["tombstone"]["albums"][0]["rating"]["bnm"]
      album.bnr = result["tombstone"]["albums"][0]["rating"]["bnr"]
      album.label = result["tombstone"]["albums"][0]["labels_and_years"][0]["labels"][0]["display_name"]
      album.url = "https://pitchfork.com" + result["url"]
      album.description = result["socialDescription"]
      album.genre = result["genres"][0]["display_name"]
      album
    end
  end
end
