require_relative "album"

# 21759 results,
# or 871 pages

class Pitchfork
  PER_PAGE = 25

  def get_albums(page = 0, sort = "asc")
    resp = JSON.parse(HTTP.get("https://pitchfork.com/api/v2/search/?types=reviews&hierarchy=sections%2Freviews%2Falbums%2Cchannels%2Freviews%2Falbums&sort=publishdate%20#{sort}&size=#{PER_PAGE}&start=#{page * PER_PAGE}"))

    albums = resp["results"]["list"].map do |result|
      album = Album.new
      album.pitchfork_id = result["id"]
      album.created_at = Time.at(result["timestamp"] / 1000)
      album.title = result["title"]

      if result["artists"][0].nil?
        album.artist = "Various artists"
      else
        album.artist = result["artists"][0]["display_name"]
      end

      next if result["tombstone"]["albums"].length == 0

      album.rating = result["tombstone"]["albums"][0]["rating"]["display_rating"]
      album.bnm = result["tombstone"]["albums"][0]["rating"]["bnm"] rescue false
      album.bnr = result["tombstone"]["albums"][0]["rating"]["bnr"] rescue false
      album.label = result["tombstone"]["albums"][0]["labels_and_years"][0]["labels"][0]["display_name"] rescue "Unknown"
      album.url = "https://pitchfork.com" + result["url"]
      album.description = result["socialDescription"]

      if result["genres"][0].nil?
        album.genre = "Unknown"
      else
        album.genre = result["genres"][0]["display_name"]
      end

      album
    end
    albums.compact
  end
end
