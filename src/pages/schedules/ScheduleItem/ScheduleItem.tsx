import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Schedule } from "../../../types/TypesExport"
import api from "../../../components/api"
import OnlyAdmin from "../../../components/privateroute/OnlyAdmin"
import { useNotification } from "../../../context/ToastifyContext"

const ScheduleItem: React.FC = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [schedule, setSchedule] = useState<Schedule | null>(null)
    const { showSuccess, showError } = useNotification()

    useEffect(() => {
      const fetchSchedule = async () => {
        try {
          const res = await api.get(`/schedules/${id}`)
          setSchedule(res.data)
        } catch (error) {
          console.error("Error fetching schedule:", error)
        }
      }
        fetchSchedule() 
    }, [id])

    const deleteSchedule = async (id: string) => {
        try {
            await api.delete(`/schedules/${id}`)
            showSuccess("Schedule deleted successfully")
            navigate('/schedules')
        } catch (error) {
            console.error("Error deleting artist:", error)
            showError("Error deleting artist")
        }
    }

    if (!schedule) {
      return <div>Loading...</div>
    }
    console.log(schedule)
  return (
    <div>
        <h2>Festival: <Link to={`/festivals/${schedule.festivalId._id}`}>{schedule.festivalId.name}</Link></h2>
        <p>Stage: <Link to={`/stages/${schedule.stageId._id}`}>{schedule.stageId.name}</Link></p>
        <p>Artist: <Link to={`/artists/${schedule.artistId._id}`}>{schedule.artistId.name}</Link></p>
        <p>Time: {schedule.startTime} - {schedule.endTime}</p>
        <OnlyAdmin>
          <Link to={`/edit-schedule/${id}`}>Edit</Link>
          <button onClick={() => deleteSchedule(id ?? '')}>Delete</button>
        </OnlyAdmin>
    </div>
  )
}

export default ScheduleItem