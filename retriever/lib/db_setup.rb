require "sqlite3"
require "active_record"
require "json"

require_relative "album"

ActiveRecord::Base.establish_connection(
  adapter: "sqlite3",
  database: "albums.db"
)

class DBSetup
  def create!
    ActiveRecord::Schema.define do
      create_table :albums, force: true do |t|
        t.string :pitchfork_id, null: false
        t.string :title, null: false
        t.string :artist, null: false
        t.numeric :rating
        t.boolean :bnm
        t.boolean :bnr
        t.string :label
        t.string :url
        t.string :description, null: false
        t.string :genre
        t.string :spotify_album_id, null: false
        t.string :spotify_artist_id, null: false
        t.string :image_url
        t.integer :page
        t.timestamps
        t.index :pitchfork_id, unique: true
        t.index :spotify_album_id, unique: true
      end
    end
  end
end

