import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Festival } from "../../../types/TypesExport"
import api from "../../../components/api"
import UserNavigator from "../../../components/usernavigator/UserNavigator"
import styles from "./FestivalArtistsPage.module.css"


const FestivalArtistsPage: React.FC = () => {
    const { id } = useParams()
    const [festival, setFestival] = useState<Festival | null>(null)

    useEffect(() => {
        const fetchFestival = async () => {
            try {
                const res = await api.get(`/festivals/${id}`)
                setFestival(res.data)
            } catch (error) {
                console.error("Error fetching festival:", error)
            }
        }
        fetchFestival()
    }, [id])

    if (!festival) {
        return <p>Loading...</p>
    }

    if (!festival.artists || festival.artists.length === 0) {
        return (
            <div>
                <p>No artists confirmed for this festival yet. All the information will be updated soon!</p>
                <Link to={`/festivals/${id}`}>Back to Festival</Link>
            </div>
        )
    }

return (
  <div className={styles.artistsContainer}>
      <h2>Artists at {festival.name}</h2>
    
      <Link to={`/festivals/${id}`} className={styles.backLink}>Back to Festival</Link>

      <div>
        {festival.artists.map((artist) => (
          <div key={artist._id} className={styles.artistCard}>
            <img src={artist.image} alt={artist.name} className={styles.artistImage} />
            <div className={styles.artistInfo}>
              <h3 className={styles.artistName}>
                <Link to={`/artists/${artist._id}`} className={styles.artistLink}>{artist.name}</Link>
              </h3>
              <p><strong>Genre:</strong> {artist.genre}</p>
              <p>{artist.bio}</p>
              <p><strong>Country:</strong> {artist.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FestivalArtistsPage