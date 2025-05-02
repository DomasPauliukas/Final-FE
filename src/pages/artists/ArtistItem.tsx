import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Artist, Festival } from "../../types/TypesExport";
import api from "../../components/api";

const ArtistItem: React.FC = () => {
    const { id } = useParams()

    const [artist, setArtist] = useState<Artist | null>(null)
    const [festivals, setFestivals] = useState<Festival[] | null>(null)

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

    console.log(artist)
  return (
    <div>
        <h1>{artist.name}</h1>
        <img src={artist.image} alt={artist.name} style={{ width: '200px', height: 'auto' }} />
        <h2>{artist.name} ({artist.country})</h2>
        <p>{artist.genre}</p>
        <p>{artist.bio}</p>

        <h2>Most popular hits:</h2>
        <ul>
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
                <h2>Performing in:</h2>
                <ul>
                    {festivals.map((festival) => (
                        <li key={festival._id}>
                            <Link to={`/festivals/${festival._id}`}>{festival.name} ({festival.date})</Link>
                        </li>
                    ))}
                </ul>
            </div>
        ) : (
            <p>This artist is not performing at festivals yet. Check it later!</p>
        )}
    </div>
  );
}

export default ArtistItem