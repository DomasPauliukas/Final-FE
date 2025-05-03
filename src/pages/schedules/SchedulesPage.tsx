import { useEffect, useState } from "react"
import { Schedule } from "../../types/TypesExport"
import api from "../../components/api"
import { Link } from "react-router-dom"

const SchedulesPage: React.FC = () => {
    const [schedules, setSchedules] = useState<Schedule[] | null>(null)

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const res = await api.get('/schedules')
                setSchedules(res.data)
            } catch (error) {
                console.error("Error fetching schedules:", error)
            }
        }
        fetchSchedules()
    }, [])


    if (!schedules) {
        return <div>Loading...</div>
    }

  return (
    <div>
      <h1>Schedules</h1>
      <p>Schedules page content goes here.</p>

      <Link to={`/create-schedule`}>Create</Link>

        {schedules.map((schedule) => (
            <div key={schedule._id}>
            <h2>{schedule.festivalId.name}</h2>
            <p>Stage: {schedule.stageId.name}</p>
            <p>Artist: {schedule.artistId.name}</p>
            <p>Time: {schedule.startTime} - {schedule.endTime} <Link to={`/schedules/${schedule._id}`} ><span> - More Details</span></Link>
            </p>
            </div>
        ))}
    </div>
  )
}

export default SchedulesPage