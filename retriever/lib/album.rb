class Album < ActiveRecord::Base
  validates :spotify_album_id, presence: true
  validates :spotify_artist_id, presence: true

  before_create :ensure_unique_created_at

  def to_h
    hash = attributes
    hash["timestamp"] = created_at.to_i
    hash
  end

  def timestamp=(t)
    self.created_at = Time.at(t / 1000)
  end

  private

  def ensure_unique_created_at
    while (Album.where(created_at: self.created_at).count > 0) do
      self.created_at = self.created_at + 1.second
    end
  end
end
