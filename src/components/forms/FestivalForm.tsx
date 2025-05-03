import { useEffect, useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { Festival } from "../../types/TypesExport"

type FestivalFormProps = {
    editFestivalData?: Festival
}

const FestivalForm: React.FC<FestivalFormProps> = ( {editFestivalData}) => {

    const navigate = useNavigate()
    const [name, setName] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [date, setDate] = useState<string>('')
    const [image, setImage] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    useEffect(() => {
        if (editFestivalData) {
            setName(editFestivalData.name)
            setLocation(editFestivalData.location)
            setDate(editFestivalData.date)
            setImage(editFestivalData.image)
            setDescription(editFestivalData.description)
        }
    }
    , [editFestivalData])

    const SubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        
        if (!name || !location || !date || !image || !description) {
            alert("All fields are required!")
            return
        }

        const newFestival = {
            name,
            location,
            date,
            image,
            description
        }

        if (editFestivalData) {
            try {
                await api.put(`/festivals/${editFestivalData._id}`, newFestival)
                alert("Festival updated successfully!")
                navigate(`/festivals/${editFestivalData._id}`)
            }
            catch (error) {
                console.error("Error updating festival:", error)
                alert("Error updating festival")
            }
        } else {
            try {
                await api.post('/festivals', newFestival)
                alert("Festival created successfully!")
                navigate(`/festivals`)
            } catch (error) {
                console.error("Error creating festival:", error)
                alert("Error creating festival")
            }
        }
    }
    
  return (
    <div>
      <h1>Festival Form</h1>

      <form onSubmit={SubmitHandler}>
        <div className="form-control">
            <label htmlFor="name">Name: </label>
            <input 
                type="text" 
                id="name" 
                value={name} onChange={(event) => setName(event.target.value)} 
                required 
            />
        </div>
        <div className="form-control">
            <label htmlFor="location">Location: </label>
            <input 
                type="text" 
                id="location" 
                placeholder="city, country"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                required
            />
        </div>
        <div className="form-control">
            <label htmlFor="date">Date: </label>
            <input 
                type="date" 
                id="date" 
                value={date} 
                onChange={(event) => setDate(event.target.value)} 
                required
            />
        </div>
        <div className="form-control">
            <label htmlFor="image">Image URL: </label>
            <input 
                type="text" 
                id="image" 
                placeholder="Enter festival image URL" 
                value={image} 
                onChange={(event) => setImage(event.target.value)} 
                required
            />
        </div>
        <div className="form-control">
            <label htmlFor="description">Description: </label>
            <textarea 
                id="description" 
                value={description} 
                onChange={(event) => setDescription(event.target.value)} 
                required
            ></textarea>
        </div>

            <button type="submit">{editFestivalData ? 'Edit': 'Create'}</button>
      </form>
    </div>
  )
}

export default FestivalForm
