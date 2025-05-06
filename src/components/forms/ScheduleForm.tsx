import { useEffect, useState } from "react";
import { Artist, Schedule, Stage } from "../../types/TypesExport";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../context/ToastifyContext";

type ScheduleFormProps = {
    editScheduleData?: Schedule
}


const ScheduleForm: React.FC<ScheduleFormProps> = ( {editScheduleData}) => {
    const [artist, setArtist] = useState<Artist[]>([])
    const [stages, setStages] = useState<Stage[]>([])
    const [startTime, setStartTime] = useState<string>('')
    const [endTime, setEndTime] = useState<string>('')
    const [artistId, setArtistId] = useState<string>('')
    const [stageId, setStageId] = useState<string>('')

    const { showSuccess, showError } = useNotification()

    const navigate = useNavigate()

    useEffect(() => {
        const fetchArtistsAndStages = async () => {
            try {
                const res = await api.get('/artists')
                const res2 = await api.get('/stages')
                setArtist(res.data)
                setStages(res2.data)
            } catch (error) {
                console.error("Error fetching artists:", error)
            }
        }
        fetchArtistsAndStages()
    }, [])

    useEffect(() => {
        if (editScheduleData) {
            setArtistId(editScheduleData.artistId._id)
            setStageId(editScheduleData.stageId._id)
            setStartTime(editScheduleData.startTime)
            setEndTime(editScheduleData.endTime)
        }
    }, [editScheduleData])

    const submitHandler = async (event: React.FormEvent) => {
        event.preventDefault()

        const selectedStage = stages.find((stage) => stage._id === stageId)
        if (!selectedStage) {
            showError("Stage not found!")
            return
        }

        const newSchedule = {
            artistId,
            stageId,
            startTime,
            endTime,
            festivalId: selectedStage.festivalId._id,
        }

        if (editScheduleData) {
            try {
                await api.put(`/schedules/${editScheduleData._id}`, newSchedule)
                showSuccess("Schedule updated successfully!")
                navigate(`/schedules/${editScheduleData._id}`)
            } catch (error) {
                console.error("Error updating schedule:", error)
                showError("Failed to update schedule. Please try again.")
            }
        } else {
            try {
                await api.post('/schedules', newSchedule)
                showSuccess("Schedule created successfully!")
                navigate('/schedules')
            } catch (error) {
                console.error("Error creating schedule:", error)
                showError("Failed to create schedule. Please try again.")
            }
        }
    }

  return (
    <div>
      <h1>Schedule Form</h1>

      <form onSubmit={submitHandler}>
        <div className="form-control">
            <label htmlFor="artist">Artist: </label>
            <select id="artist" name="artistId" value={artistId} onChange={(event) => setArtistId(event.target.value)} required>
                {artist.map((artist) => (
                <option key={artist._id} value={artist._id}>
                    {artist.name}
                </option>
                ))}
            </select>
        </div>
        <div className="form-control">
            <label htmlFor="stage">Stage: </label>
            <select id="stage" name="stageId" value={stageId} onChange={(event) => setStageId(event.target.value)} required>
                {stages.map((stage) => (
                <option key={stage._id} value={stage._id}>
                    {stage.name} ({stage.festivalId.name})
                </option>
                ))}
            </select>
        </div>
        <div className="form-control">
            <label htmlFor="startTime">Start Time: </label>
            <input 
                type="text" 
                id="startTime" 
                name="startTime" 
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)} 
                placeholder="6 PM"
                required 
                />
        </div>
        <div className="form-control">
            <label htmlFor="endTime">End Time: </label>
            <input 
                type="text" 
                name="endTime" 
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)} 
                placeholder="7 PM"
                required 
                />
        </div>

        <button type="submit">{editScheduleData ? 'Edit' : 'Create'}</button>
      </form>
    </div>
  )
}

export default ScheduleForm;