class Album
  attr_accessor :id, :timestamp, :title, :artist, :rating, :bnm, :bnr, :label, :url, :description, :genre, :spotify_album_id, :spotify_artist_id, :image_url

  def to_h
    {
      id: id,
      timestamp: timestamp,
      title: title,
      artist: artist,
      rating: rating,
      bnm: bnm,
      bnr: bnr,
      label: label,
      url: url,
      description: description,
      genre: genre,
      spotify_album_id: spotify_album_id,
      spotify_artist_id: spotify_artist_id,
      image_url: image_url
    }
  end
end
