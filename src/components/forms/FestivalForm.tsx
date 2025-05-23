import { useEffect, useState } from "react"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { Festival } from "../../types/TypesExport"
import { useNotification } from "../../context/ToastifyContext"
import styles from './Form.module.css'

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
    const [regularPrice, setRegularPrice] = useState<number>(0)
    const [vipPrice, setVipPrice] = useState<number>(0)

    const { showSuccess, showError } = useNotification()

    useEffect(() => {
        if (editFestivalData) {
            setName(editFestivalData.name)
            setLocation(editFestivalData.location)
            setDate(editFestivalData.date)
            setImage(editFestivalData.image)
            setDescription(editFestivalData.description)
            setRegularPrice(editFestivalData.regularPrice)
            setVipPrice(editFestivalData.vipPrice)
        }
    }
    , [editFestivalData])

    const SubmitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        
        if (!name || !location || !date || !image || !description) {
            showError("All fields are required!")
            return
        }

        const newFestival = {
            name,
            location,
            date,
            image,
            description,
            regularPrice,
            vipPrice
        }

        if (editFestivalData) {
            try {
                await api.put(`/festivals/${editFestivalData._id}`, newFestival)
                showSuccess("Festival updated successfully!")
                navigate(`/festivals/${editFestivalData._id}`)
            }
            catch (error) {
                console.error("Error updating festival:", error)
                showError("Error updating festival")    
            }
        } else {
            try {
                await api.post('/festivals', newFestival)
                showSuccess("Festival created successfully!")
                navigate(`/festivals`)
            } catch (error) {
                console.error("Error creating festival:", error)
                showError("Error creating festival")
            }
        }
    }
    
  return (
    <div className={styles.formWrapper}>
      <form onSubmit={SubmitHandler}>
        <div className={styles.formControl}>
            <label htmlFor="name">Name: </label>
            <input 
                type="text" 
                id="name" 
                value={name} onChange={(event) => setName(event.target.value)} 
                required 
            />
        </div>
        <div className={styles.formControl}>
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
        <div className={styles.formControl}>
            <label htmlFor="date">Date: </label>
            <input 
                type="date" 
                id="date" 
                value={date} 
                onChange={(event) => setDate(event.target.value)} 
                required
            />
        </div>
        <div className={styles.formControl}>
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
        <div className={styles.formControl}>
            <label htmlFor="description">Description: </label>
            <textarea 
                id="description" 
                value={description} 
                onChange={(event) => setDescription(event.target.value)} 
                required
            ></textarea>
        </div>
        <div className={styles.formControl}>
            <label htmlFor="regularPrice">Regular Price: </label>
            <input 
                type="number" 
                id="regularPrice" 
                value={regularPrice} 
                onChange={(event) => setRegularPrice(Number(event.target.value))} 
                required
            />
        </div>
        <div className={styles.formControl}>
            <label htmlFor="vipPrice">VIP Price: </label>
            <input
                type="number" 
                id="vipPrice" 
                value={vipPrice} 
                onChange={(event) => setVipPrice(Number(event.target.value))} 
                required
            />
        </div>

            <button type="submit" className={styles.submitButton}>{editFestivalData ? 'Edit': 'Create'}</button>
      </form>
    </div>
  )
}

export default FestivalForm
