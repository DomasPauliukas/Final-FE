import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { Artist } from "../../types/TypesExport";

type ArtistFormProps = {
    editArtistData?: Artist
}

const ArtistForm: React.FC<ArtistFormProps> = ( {editArtistData}) => {
    const navigate = useNavigate()
    const [name, setName] = useState<string>('')
    const [country, setCountry] = useState<string>('')
    const [genre, setGenre] = useState<string>('')
    const [image, setImage] = useState<string>('')
    const [bio, setBio] = useState<string>('')
    const [hits, setHits] = useState<string[]>([])

    useEffect(() => {
        if (editArtistData) {
            setName(editArtistData.name)
            setCountry(editArtistData.country)
            setGenre(editArtistData.genre)
            setImage(editArtistData.image)
            setBio(editArtistData.bio)
            setHits(editArtistData.hits)
        }
    }, [editArtistData])

const SubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!name || !country || !genre || !image || !bio || hits.length === 0) {
        alert("All fields are required!")
        return
    }

    const newArtist = {
        name,
        country,
        genre,
        image,
        bio,
        hits
    }
    if (editArtistData) {
        await api.put(`/artists/${editArtistData._id}`, newArtist)
        alert("Artist updated successfully!")
        navigate('/artists')
    } else {
        await api.post(`/artists`, newArtist)
        alert("Artist created successfully!")
        navigate('/artists')
    }
    
}

  return (
    <div>
      <form onSubmit={SubmitHandler}>
        <div className="form-control">
            <label htmlFor="name">Name:</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
        </div>
        <div className="form-control">
            <label htmlFor="country">Country:</label>
            <input
                type="text"
                id="country"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
            />
        </div>
        <div className="form-control">
            <label htmlFor="genre">Genre:</label>
            <input
                type="text"
                id="genre"
                value={genre}
                onChange={(event) => setGenre(event.target.value)}
            />
        </div>
        <div className="form-control">
            <label htmlFor="image">Image URL:</label>
            <input
                type="text"
                id="image"
                value={image}
                onChange={(event) => setImage(event.target.value)}
            />
        </div>
        <div className="form-control">
            <label htmlFor="bio">Bio:</label>
            <textarea
                id="bio"
                value={bio}
                onChange={(event) => setBio(event.target.value)}
            ></textarea>
        </div>
        <div className="form-control">
            <label htmlFor="hits">Most popular hits:</label>
            <input
                type="text"
                id="hits"
                value={hits.join(', ')}
                onChange={(event) => setHits(event.target.value.split(',').map(hit => hit.trim()))}
            />
        </div>

        <button type="submit">{editArtistData ? 'Edit Artist' : 'Create Artist'}</button>
      </form>
    </div>
  );
}

export default ArtistForm;