require_relative "album"

# 21759 results,
# or 871 pages

class Pitchfork
  PER_PAGE = 25

  def get_albums(page = 0, sort = "asc")
    resp = nil
    while resp.nil?
      resp = JSON.parse(HTTP.get("https://pitchfork.com/api/v2/search/?types=reviews&hierarchy=sections%2Freviews%2Falbums%2Cchannels%2Freviews%2Falbums&sort=publishdate%20#{sort}&size=#{PER_PAGE}&start=#{page * PER_PAGE}")) rescue nil
      sleep 1
    end

    albums = resp["results"]["list"].map do |result|
      album = Album.new
      album.pitchfork_id = result["id"]
      album.created_at = Time.at(result["timestamp"] / 1000)
      album.title = result["title"].gsub(/<\/?[^>]*>/, "")

      album.artist = if result["artists"][0].nil?
                       "Various artists"
                     else
                       result["artists"][0]["display_name"]
                     end

      next if result["tombstone"]["albums"].empty?

      album.rating = result["tombstone"]["albums"][0]["rating"]["display_rating"]
      album.bnm = begin
                    result["tombstone"]["albums"][0]["rating"]["bnm"]
                  rescue StandardError
                    false
                  end
      album.bnr = begin
                    result["tombstone"]["albums"][0]["rating"]["bnr"]
                  rescue StandardError
                    false
                  end
      album.label = begin
                      result["tombstone"]["albums"][0]["labels_and_years"][0]["labels"][0]["display_name"]
                    rescue StandardError
                      "Unknown"
                    end
      album.url = "https://pitchfork.com" + result["url"]
      album.description = result["seoDescription"]

      album.genre = if result["genres"][0].nil?
                      "Unknown"
                    else
                      result["genres"][0]["display_name"]
                    end

      album
    end
    albums.compact
  end
end
