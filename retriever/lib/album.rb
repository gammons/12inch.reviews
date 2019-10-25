class Album < ActiveRecord::Base
  validates :spotify_album_id, presence: true
  validates :spotify_artist_id, presence: true

  def timestamp=(t)
    self.created_at = Time.at(t / 1000)
  end
end
