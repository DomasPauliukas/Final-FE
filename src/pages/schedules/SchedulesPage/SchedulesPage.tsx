import { useEffect, useState } from "react"
import { Schedule } from "../../../types/TypesExport"
import api from "../../../components/api"
import { Link } from "react-router-dom"
import OnlyAdmin from "../../../components/privateroute/OnlyAdmin"
import "./SchedulesPage.css"

const SchedulesPage: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[] | null>(null)
  const [searchByFestival, setSearchByFestival] = useState<string>('')

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const res = await api.get("/schedules")
        setSchedules(res.data)
      } catch (error) {
        console.error("Error fetching schedules:", error)
      }
    }
    fetchSchedules()
  }, [])

  if (!schedules) return <div>Loading...</div>

  const filteredSchedules = schedules.filter(schedule => schedule.festivalId.name.toLowerCase().includes(searchByFestival.toLowerCase()))

  return (
    <div>
      <h1>Schedules</h1>
      <OnlyAdmin>
        <Link to="/create-schedule" className="btn-link">+ Create Schedule</Link>
      </OnlyAdmin>

      <input
        type="text"
        placeholder="Search by festival name..."
        value={searchByFestival}
        onChange={(event) => setSearchByFestival(event.target.value)}
        className="search-input"
      />

      <div className="schedule-list">
        {filteredSchedules.length === 0 && <p>No schedules found for the given festival name.</p>}
        {filteredSchedules.map((schedule) => (
          <div key={schedule._id} className="schedule-card">
            <h3>{schedule.festivalId.name}</h3>
            <p><strong>Stage:</strong> {schedule.stageId.name}</p>
            <p><strong>Artist:</strong> {schedule.artistId.name}</p>
            <p><strong>Time:</strong> {schedule.startTime} - {schedule.endTime}</p>
            <Link to={`/schedules/${schedule._id}`}>More details</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SchedulesPage
