import { useEffect, useState } from "react"
import { Artist } from "../../../types/TypesExport"
import api from "../../../components/api"
import { Link } from "react-router-dom"
import OnlyAdmin from "../../../components/privateroute/OnlyAdmin"
import styles from "./ArtistsPage.module.css"


const ArtistsPage: React.FC = () => {
  const [artists, setArtists] = useState<Artist[] | null>(null)
  const [searchArtist, setSearchArtist] = useState<string>('')

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

  return (
    <div>
      <h1>Artists</h1>
      <input
          type="text"
          placeholder="Search artist by name..."
          value={searchArtist}
          onChange={(event) => setSearchArtist(event.target.value)}
          style={{ marginBottom: '20px', padding: '8px', width: '100%' }}
        />
      <OnlyAdmin>
        <Link to="/create-artist" className={styles.btnLink}>+ Create New Artist</Link>
      </OnlyAdmin>

        <div className={styles.artistGrid}>
            {artists
            .filter((artist) => artist.name.toLowerCase().includes(searchArtist.toLowerCase()))
            .map((artist) => (
              <div key={artist._id} className={styles.artistCard}>
                <img src={artist.image} alt={artist.name} className={styles.artistImage} />
                <h2>{artist.name} ({artist.country})</h2>
                <p>{artist.genre}</p>
                <div>
                <Link to={`/artists/${artist._id}`}>Read more</Link>
                </div>
              </div>
            ))}
        </div>
    </div>
  )
}

export default ArtistsPage