require 'http'
require 'json'
require 'dotenv'
require 'logger'
require 'active_record'
require 'spotify_search/spotify_search'
require 'byebug'

Dotenv.load

require_relative 'lib/album'
require_relative 'lib/pitchfork'

ActiveRecord::Base.establish_connection(
  adapter: 'sqlite3',
  database: "#{ENV['ALBUM_STORE_PATH']}/albums.db"
)

class Retriever
  def initialize
    @logger = Logger.new(STDOUT)
    @logger.level = Logger::DEBUG
    @spotify = SpotifySearch::Searcher.new
    @albums = []
  end

  def backfill
    pitchfork = Pitchfork.new
    page = 0
    albums = []

    (0..1000).each do |page|
      puts "============ Page #{page} ==========="
      albums = pitchfork.get_albums(page, 'desc')
      albums.each {|a| process_album(a) }
      page += 1
    end

    @logger.close
  end

  def refresh
    dupe_count = 0
    last_id = Album.maximum(:id)
    (0..30).each do |page|
      puts "============ Page #{page} ==========="
      Pitchfork.new.get_albums(page, 'desc').each do |album|
        process_album(album)
        dupe_count += 1 if Album.where(pitchfork_id: album.pitchfork_id).count >= 1
        return if dupe_count > 3
      end
    end
  end

  def create_albums_json_files
    timestamp = Time.now.to_i
    album_count = Album.count
    file_count = album_count / 1000

    preview_albums = Album.order(created_at: :desc).limit(25)
    f = File.open('initial.json', 'w')
    f << JSON.generate({ albums: preview_albums.map(&:to_h), timestamp: timestamp, album_count: album_count })
    f.close

    Album.order(created_at: :desc).each_slice(1000).to_a.each_with_index do |albums_slice, idx|
      putc '.'
      f = File.open("albums#{idx}.json", 'w')

      f << JSON.generate({ albums: albums_slice.map(&:to_h), timestamp: timestamp, album_count: album_count })
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
      putc '.'
      album.save!
    else
      puts "Unable to find #{album.artist} - #{album.title}"
    end
  end

  def add_spotify_info_to_album(album)
    done = false
    while !done do
      begin
        spotify_album = @spotify.album_search(album.artist, album.title)
        done = true
      rescue HTTP::ConnectionError
        sleep 1
      end
    end
    sleep 0.25

    unless spotify_album.nil?
      album.spotify_artist_id = spotify_album['artists'][0]['id']
      album.spotify_album_id = spotify_album['id']
      album.image_url = spotify_album['images'][0]['url']
    end

    album
  end

  def write_results; end
end
