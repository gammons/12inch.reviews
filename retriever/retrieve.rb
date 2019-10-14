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
  end

  def access_token
    puts @spotify.authorize
  end

  def test
    album = @spotify.search("Debby Friday", "Death Drive EP")
    puts "album = '#{album && album["name"]}'"
  end

  def perform
    fetch_albums
    post_process
    write_results
    log_rejections
    @logger.close
  end

  private

  def fetch_albums
    @albums = []
    (0..20).each do |page|
      new_albums = Pitchfork.new.get_albums(page)
      new_albums.each do |album|
        spotify_album = @spotify.search(album.artist, album.title)

        unless spotify_album.nil?
          album.spotify_artist_id = spotify_album["artists"][0]["id"]
          album.spotify_album_id = spotify_album["id"]
          album.image_url = spotify_album["images"][0]["url"]
        end

        putc "."
        sleep 1
      end
      puts "\n"
      @albums += new_albums
    end
    @albums
  end

  def post_process
    @rejected = @albums.select {|a| a.spotify_artist_id.nil? || a.spotify_album_id.nil? }
    @albums.reject! {|a| a.spotify_artist_id.nil? || a.spotify_album_id.nil? }
  end

  def write_results
    f = File.open("albums.json","w")
    f << JSON.generate({albums: @albums.map(&:to_h)})
    f.close
  end

  def log_rejections
    @logger.info("Rejected #{rejected.count} albums.")

    rejected.each do |album|
      @logger.info("#{album.artist} - #{album.title}")
    end
  end
end

Retriever.new.perform
