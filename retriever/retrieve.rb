require "http"
require "json"
require "dotenv"
require "logger"
require "active_record"

require "byebug"

require_relative "lib/album"
require_relative "lib/pitchfork"
require_relative "lib/spotify"

Dotenv.load

ActiveRecord::Base.establish_connection(
  adapter: "sqlite3",
  database: "albums.db"
)

class Retriever
  START_AT_PAGE = 874

  def initialize
    @logger = Logger.new(STDOUT)
    @logger.level = Logger::DEBUG
    @spotify = Spotify.new(ENV["SPOTIFY_CLIENT_ID"], ENV["SPOTIFY_CLIENT_SECRET"], @logger)
    @albums = []
  end

  def backfill
    160.upto(START_AT_PAGE).each do |page|
      puts "============ Page #{page} ==========="
      Pitchfork.new.get_albums(page).each do |album|
        process_album(album)
      end
    end

    @logger.close
  end

  def refresh
    dupe_count = 0
    (0..30).each do |page|
      puts "============ Page #{page} ==========="
      Pitchfork.new.get_albums(page, "desc").each do |album|
        process_album(album)
        dupe_count += 1 if Album.where(pitchfork_id: album.pitchfork_id).count >= 1
        return if dupe_count > 3
      end
    end
  end

  def create_albums_json_files
    Album.order(created_at: :desc).each_slice(1000).to_a.each_with_index do |albums_slice,idx|
      putc "."
      f = File.open("albums#{idx}.json", "w")
      f << JSON.generate(albums_slice.map(&:attributes))
      f.close
    end
  end

  private

  def process_album(album)
    if Album.where(pitchfork_id: album.pitchfork_id).count >= 1
      puts "Duplicate stored for #{album.pitchfork_id}: #{album.artist} - #{album.title}"
      return
    end

    album = add_spotify_info_to_album(album)

    if Album.where(spotify_album_id: album.spotify_album_id).count >= 1
      puts "Duplicate stored for #{album.pitchfork_id}: #{album.artist} - #{album.title}"
      return
    end

    if album.valid?
      putc "."
      album.save!
    else
      puts "Unable to find #{album.artist} - #{album.title}"
    end
  end

  def add_spotify_info_to_album(album)
    spotify_album = @spotify.search(album.artist, album.title)
    sleep 0.5

    unless spotify_album.nil?
      album.spotify_artist_id = spotify_album["artists"][0]["id"]
      album.spotify_album_id = spotify_album["id"]
      album.image_url = spotify_album["images"][0]["url"]
    end

    album
  end

  def write_results
  end
end
