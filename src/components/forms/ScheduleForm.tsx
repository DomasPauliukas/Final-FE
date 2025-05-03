import { useEffect, useState } from "react";
import { Artist, Schedule, Stage } from "../../types/TypesExport";
import api from "../api";
import { useNavigate } from "react-router-dom";

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

        const newSchedule = {
            artistId,
            stageId,
            startTime,
            endTime,
        }

        if (editScheduleData) {
            try {
                await api.put(`/schedules/${editScheduleData._id}`, newSchedule)
                alert("Schedule updated successfully!")
                navigate(`/schedules/${editScheduleData._id}`)
            } catch (error) {
                console.error("Error updating schedule:", error)
                alert('Failed to update schedule. Please try again.')
            }
        } else {
            try {
                await api.post('/schedules', newSchedule)
                alert('Schedule created successfully!')
                navigate('/schedules')
            } catch (error) {
                console.error("Error creating schedule:", error)
                alert('Failed to create schedule. Please try again.')
            }
        }
    }

  return (
    <div>
      <h1>Schedule Form</h1>

      <form onSubmit={submitHandler}>
        <div className="form-control">
            <label htmlFor="artist">Artist: </label>
            <select id="artist" name="artistId" onChange={(event) => setArtistId(event.target.value)} required>
                {artist.map((artist) => (
                <option key={artist._id} value={artist._id}>
                    {artist.name}
                </option>
                ))}
            </select>
        </div>
        <div className="form-control">
            <label htmlFor="stage">Stage: </label>
            <select id="stage" name="stageId" onChange={(event) => setStageId(event.target.value)} required>
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
                type="datetime-local" 
                id="startTime" 
                name="startTime" 
                onChange={(event) => setStartTime(event.target.value)} 
                placeholder="6 PM"
                required 
                />
        </div>
        <div className="form-control">
            <label htmlFor="endTime">End Time: </label>
            <input 
                type="datetime-local" 
                id="endTime" 
                name="endTime" 
                onChange={(event) => setEndTime(event.target.value)} 
                placeholder="7 PM"
                required 
                />
        </div>

        <button type="submit">Create Schedule</button>
      </form>
    </div>
  )
}

export default ScheduleForm;