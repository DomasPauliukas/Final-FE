import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Artist, Festival } from "../../../types/TypesExport";
import api from "../../../components/api";
import OnlyAdmin from "../../../components/privateroute/OnlyAdmin";
import { useNotification } from "../../../context/ToastifyContext";
import styles from "./ArtistItem.module.css";


const ArtistItem: React.FC = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [artist, setArtist] = useState<Artist | null>(null)
    const [festivals, setFestivals] = useState<Festival[] | null>(null)

    const { showSuccess, showError } = useNotification()

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const res = await api.get(`/artists/${id}`)
                setArtist(res.data.artist)
                setFestivals(res.data.festivals)
            } catch (error) {
                console.error("Error fetching artist:", error)
            }
        }
        fetchArtist()
    }, [id])

    if (!artist) {
        return <div>Loading...</div>
    }

    const deleteArtist = async (id: string) => {
        try {
            await api.delete(`/artists/${id}`)
            showSuccess("Artist deleted successfully")
            navigate('/artists')
        } catch (error) {
            console.error("Error deleting artist:", error)
            showError("Error deleting artist")
        }
    }

  return (
    <div className={styles.artistDetailContainer}>
        <h1>{artist.name}</h1>

        <OnlyAdmin>
            <div className={styles.actions}>
                <Link to={`/edit-artist/${id}`} className={styles.btnLink}>Edit</Link>
                <button onClick={() => deleteArtist(id ?? '')} className={styles.deleteBtn}>Delete</button>
            </div>
        </OnlyAdmin>
            
        <img src={artist.image} alt={artist.name} className={styles.artistImage} />
        
        <div className={styles.artistInfo}>
            <h2>{artist.name} ({artist.country})</h2>
            <p>{artist.genre}</p>
            <p>{artist.bio}</p>
        </div>

        <h2 className={styles.sectionTitle}>Most popular hits:</h2>
        <ul className={styles.hitsList}>
            {Array.isArray(artist.hits) &&
                artist.hits.map((hit, index) => (
                <li key={index}>
                    <a href={hit} target="_blank" rel="noopener noreferrer">
                        {hit}
                    </a>
                </li>
            ))}
        </ul>

        {festivals && festivals.length > 0 ? (
            <div>
                <h2 className={styles.sectionTitle}>Performing in:</h2>
                <u className={styles.festivalList}>
                    {festivals.map((festival) => (
                        <li key={festival._id}>
                            <Link to={`/festivals/${festival._id}`}>{festival.name} ({festival.date})</Link>
                        </li>
                    ))}
                </u>
            </div>
        ) : (
            <p>This artist is not performing at festivals yet. Check it later!</p>
        )}
    </div>
  );
}

export default ArtistItem