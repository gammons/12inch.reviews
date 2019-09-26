require "http"
require "json"
require "byebug"
require "dotenv"

require_relative "album"
require_relative "pitchfork"
require_relative "spotify"

Dotenv.load

pitchfork = Pitchfork.new
spotify = Spotify.new

pitchfork.get_albums.each do |album|
  artist_id = spotify.get_artist_id(album.artist)
  puts "-----------------------------"
  puts "Artist: #{album.artist}"
  puts "Spotify artist id = #{artist_id}"
  puts "Album: #{album.title}"
  puts "Album ID: #{spotify.get_album_id(artist_id, album.title)}"
  sleep 1
end
