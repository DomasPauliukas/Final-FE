import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../../components/api"
import { Artist } from "../../../types/TypesExport"
import ArtistForm from "../../../components/forms/ArtistForm"

const EditArtist: React.FC = () => {
    const { id } = useParams()
    const [artist, setArtist] = useState<Artist | null>(null)

    useEffect(() => {
        const fetchArtist = async () => {
            try {
                const res = await api.get(`/artists/${id}`)
                setArtist(res.data.artist)
            } catch (error) {
                console.error("Error fetching artist:", error)
            }
        }
        fetchArtist()
    }, [id])

    if (!artist) {
        return <div>Loading...</div>
    }

  return (
    <div>
      <h1>Edit Artist</h1>
        <ArtistForm editArtistData={artist}/>
    </div>
  )
}

export default EditArtist