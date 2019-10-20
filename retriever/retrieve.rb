require "http"
require "json"
require "dotenv"
require "logger"

require "byebug"

require_relative "lib/album"
require_relative "lib/pitchfork"
require_relative "lib/spotify"

Dotenv.load

class Retriever
  attr_reader :rejected

  def initialize
    @logger = Logger.new(STDOUT)
    @logger.level = Logger::INFO
    @spotify = Spotify.new(ENV["SPOTIFY_CLIENT_ID"], ENV["SPOTIFY_CLIENT_SECRET"], @logger)
    @albums = []
  end

  def backfill
    load_albums
    fetch_albums
    post_process
    write_results
    log_rejections
    @logger.close
  end

  def refresh
    get_new_albums
    write_results
    @logger.close
  end

  def get_new_albums
    load_albums
    last_id = @albums.sort_by {|a| a.timestamp }.reverse[0].id

    found = false
    count = 0
    new_albums = []
    while !found do
      albums = Pitchfork.new.get_albums(count)
      albums = albums.sort_by {|a| a.timestamp }.reverse

      last = albums.find_index {|a| a.id == last_id }
      found = true unless last.nil?
      last ||= albums.count

      puts "last is #{last}"
      puts "found is #{found}"

      next if found && last == 0

      new_albums += add_spotify_info_to_albums(albums[0..last - 1])

      count += 1
    end

    @albums += new_albums

    aof = File.open("temp_albums.json", "w")
    aof << JSON.generate(@albums.map(&:to_h))
    aof.close
  end

  def create_albums_json
    load_albums
    write_results
  end

  private

  def load_albums
    return unless File.exist?("temp_albums.json")

    @albums = JSON.parse(File.read("temp_albums.json")).map do |album_h|
      Album.new(album_h)
    end
    @albums.reject! {|album| album.spotify_album_id.nil? }

    @albums
  end

  def fetch_albums
    ((@albums.count / 25 + 1)..874).each do |page|
      new_albums = Pitchfork.new.get_albums(page)

      puts page

      @albums += add_spotify_info_to_albums(new_albums)

      puts "\n"

      aof = File.open("temp_albums.json", "w")
      aof << JSON.generate(@albums.map(&:to_h))
      aof.close
    end
    @albums
  end

  def add_spotify_info_to_albums(albums)
    albums.each do |album|
      spotify_album = @spotify.search(album.artist, album.title)

      unless spotify_album.nil?
        album.spotify_artist_id = spotify_album["artists"][0]["id"]
        album.spotify_album_id = spotify_album["id"]
        album.image_url = spotify_album["images"][0]["url"]
      end

      putc "."
      sleep 1
    end

    albums.reject! {|album| album.spotify_album_id.nil? }
    albums
  end

  def post_process
    @rejected = @albums.select {|a| a.spotify_artist_id.nil? || a.spotify_album_id.nil? }
    @albums.reject! {|a| a.spotify_artist_id.nil? || a.spotify_album_id.nil? }
  end

  def write_results
    @albums.each_slice(1000).to_a.each_with_index do |albums_slice,idx|
      f = File.open("albums#{idx}.json", "w")
      f << JSON.generate(albums_slice.map(&:to_h))
      f.close
    end
  end

  def log_rejections
    @logger.info("Rejected #{rejected.count} albums.")

    rejected.each do |album|
      @logger.info("#{album.artist} - #{album.title}")
    end
  end
end
