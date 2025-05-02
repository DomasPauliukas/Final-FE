import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Festival } from "../../types/TypesExport"
import api from "../../components/api"
import UserNavigator from "../../components/usernavigator/UserNavigator"

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

  return (
    <div>
      <h2>Artists at {festival.name}</h2>
      <Link to={`/festivals/${id}`}>&larr; Back to Festival</Link>

      <div>
        {festival.artists.map((artist) => (
          <div key={artist._id} style={{ marginBottom: "20px" }}>
            <img src={artist.image} alt={artist.name} style={{ width: '200px', height: 'auto' }} />
            <h3>{artist.name}</h3>
            <p><strong>Genre:</strong> {artist.genre}</p>
            <p>{artist.bio}</p>
            <p><strong>Country:</strong> {artist.country}</p>
          </div>
        ))}
      </div>

        <UserNavigator />
    </div>
  )
}

export default FestivalArtistsPage