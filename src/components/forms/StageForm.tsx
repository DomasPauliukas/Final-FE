import { useEffect, useState } from "react"
import { Festival, Stage } from "../../types/TypesExport"
import api from "../api"
import { useNavigate } from "react-router-dom"
import { useNotification } from "../../context/ToastifyContext"


type StageFormProps = {
    editStageData?: Stage
}

const StageForm: React.FC<StageFormProps> = ( {editStageData}) => {
    const [festivals, setFestivals] = useState<Festival[]>([])
    const navigate = useNavigate()
    const [name, setName] = useState<string>('')
    const [capacity, setCapacity] = useState<number>(0)
    const [festivalId, setFestivalId] = useState<string>('')

    const { showSuccess, showError } = useNotification()

    useEffect(() => {
        const fetchFestivals = async () => {
            try {
                const res = await api.get('/festivals')
                setFestivals(res.data)
            } catch (error) {
                console.error("Error fetching festivals:", error)
            }
        }
        fetchFestivals()
    }, [])

    useEffect(() => {
        if (editStageData) {
            setName(editStageData.name)
            setCapacity(editStageData.capacity)
            setFestivalId(editStageData.festivalId._id)
        }
    }, [editStageData])

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()
        const newStage = {
            name,
            capacity,
            festivalId
        }

        if (editStageData) {
            try {
                await api.put(`/stages/${editStageData._id}`, newStage)
                showSuccess("Stage updated successfully!")
                navigate(`/stages/${editStageData._id}`)
            } catch (error) {
                console.error("Error updating stage:", error)
                showError("Error updating stage")
            }
        } else {
            try {
                await api.post('/stages', newStage)
                showSuccess("Stage created successfully!")
                navigate(`/stages`)
            } catch (error) {
                console.error("Error creating stage:", error)
                showError("Error creating stage")
            }
        }
    }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="form-control">
            <label htmlFor="name">Name</label>
            <input 
                type="text" 
                id="name" 
                value={name}
                onChange={(event) => setName(event.target.value)}
                required 
            />
        </div>
        <div className="form-control">
            <label htmlFor="capacity">Capacity</label>
            <input 
                type="number" 
                id="capacity" 
                value={capacity}
                onChange={(event) => setCapacity(Number(event.target.value))}
                required 
            />
        </div>
        <div className="form-control">
            <label htmlFor="festivalId">Festival</label>
            <select 
                id="festivalId" 
                value={festivalId}
                onChange={(event) => setFestivalId(event.target.value)}
                required 
            >
                <option value="">Select a festival</option>
                {festivals.map((festival) => (
                    <option key={festival._id} value={festival._id}>
                        {festival.name} ({festival.date})
                    </option>
                ))}
            </select>
        </div>

        <button type="submit">{editStageData? 'Edit' : 'Create'}</button>
      </form>

    </div>
  )
}

export default StageForm