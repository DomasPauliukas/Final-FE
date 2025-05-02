import { useEffect, useState } from "react"
import { Artist } from "../../types/TypesExport"
import api from "../../components/api"
import { Link } from "react-router-dom"

const ArtistsPage: React.FC = () => {
  const [artists, setArtists] = useState<Artist[] | null>(null)

  useEffect(() => {
    const fetchArtists = async () => {
      const res = await api.get(`/artists`)
      setArtists(res.data)
    }
    fetchArtists()
  }, [])

if (!artists) {
    return <div>Loading...</div>
  }

  console.log(artists)
  return (
    <div>
      <h1>Artists</h1>
      <p>List of artists will be displayed here.</p>
      {artists.map((artist) => (
        <div key={artist._id}>
          <img src={artist.image} alt={artist.name} style={{ width: '200px', height: 'auto' }} />
          <h2>{artist.name} ({artist.country})</h2>
          <p>{artist.genre}</p>
          <div>
          <Link to={`/artists/${artist._id}`}>Read more</Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ArtistsPage