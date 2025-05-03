import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Schedule } from "../../types/TypesExport"
import api from "../../components/api"
import ScheduleForm from "../../components/forms/ScheduleForm"

const EditSchedule: React.FC = () => {
    const { id } = useParams()
    const [schedule, setSchedule] = useState<Schedule | null>(null)

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


    if (!schedule) {
        return <div>Loading...</div>
    }
    return (
      <div>
        <h1>Edit Schedule</h1>
        <p>This is a schedule item component.</p>

        <ScheduleForm editScheduleData={schedule}/>
      </div>
    )
  }
  
  export default EditSchedule