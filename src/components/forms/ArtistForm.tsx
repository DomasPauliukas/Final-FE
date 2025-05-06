import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { Artist } from "../../types/TypesExport";
import { useNotification } from "../../context/ToastifyContext";

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

    const { showSuccess, showError } = useNotification()

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
        showError("All fields are required!")
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
        try {
            await api.put(`/artists/${editArtistData._id}`, newArtist)
            showSuccess("Artist updated successfully!")
            navigate(`/artists/${editArtistData._id}`)
        }
        catch (error) {
            console.error("Error updating artist:", error)
            showError("Error updating artist")
        }
    } else {
        try {
            await api.post('/artists', newArtist)
            showSuccess("Artist created successfully!")
            navigate(`/artists`)
        } catch (error) {
            console.error("Error creating artist:", error)
            showError("Error creating artist")
        }
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