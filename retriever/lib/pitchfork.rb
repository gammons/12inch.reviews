require_relative "album"

# 21759 results,
# or 871 pages

class Pitchfork
  PER_PAGE = 25

  def get_albums(start_at = 0)
    resp = JSON.parse(HTTP.get("https://pitchfork.com/api/v2/search/?types=reviews&hierarchy=sections%2Freviews%2Falbums%2Cchannels%2Freviews%2Falbums&sort=publishdate%20desc%2Cposition%20asc&size=#{PER_PAGE}&start=#{start_at}"))

    albums = resp["results"]["list"].map do |result|
      album = Album.new
      album.id = result["id"]
      album.timestamp = result["timestamp"]
      album.title = result["title"]

      if result["artists"][0].nil?
        album.artist = "Various artists"
      else
        album.artist = result["artists"][0]["display_name"]
      end

      album.rating = result["tombstone"]["albums"][0]["rating"]["display_rating"]
      album.bnm = result["tombstone"]["albums"][0]["rating"]["bnm"]
      album.bnr = result["tombstone"]["albums"][0]["rating"]["bnr"]
      album.label = result["tombstone"]["albums"][0]["labels_and_years"][0]["labels"][0]["display_name"]
      album.url = "https://pitchfork.com" + result["url"]
      album.description = result["socialDescription"]

      if result["genres"][0].nil?
        album.genre = "Unknown"
      else
        album.genre = result["genres"][0]["display_name"]
      end

      album
    end
  end
end
