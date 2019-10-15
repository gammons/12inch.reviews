class Album
  attr_accessor :id, :timestamp, :title, :artist, :rating, :bnm, :bnr, :label, :url, :description, :genre, :spotify_album_id, :spotify_artist_id, :image_url

  def initialize(hash = {})
    self.id = hash["id"]
    self.timestamp = hash["timestamp"]
    self.title = hash["title"]
    self.artist = hash["artist"]
    self.rating = hash["rating"]
    self.bnm = hash["bnm"]
    self.bnr = hash["bnr"]
    self.label = hash["label"]
    self.url = hash["url"]
    self.description = hash["description"]
    self.genre = hash["genre"]
    self.spotify_album_id = hash["spotify_album_id"]
    self.spotify_artist_id = hash["spotify_artist_id"]
    self.image_url = hash["image_url"]
  end

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
