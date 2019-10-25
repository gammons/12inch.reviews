class Album < ActiveRecord::Base
  validates :spotify_album_id, presence: true
  validates :spotify_artist_id, presence: true

  def timestamp=(t)
    self.created_at = Time.at(t / 1000)
  end

  # def to_h
  #   {
  #     id: id,
  #     timestamp: timestamp,
  #     title: title,
  #     artist: artist,
  #     rating: rating,
  #     bnm: bnm,
  #     bnr: bnr,
  #     label: label,
  #     url: url,
  #     description: description,
  #     genre: genre,
  #     spotify_album_id: spotify_album_id,
  #     spotify_artist_id: spotify_artist_id,
  #     image_url: image_url
  #   }
  # end
end
