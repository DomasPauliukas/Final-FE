import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import api from "../../../components/api"
import { Schedule, Stage } from "../../../types/TypesExport"
import UserNavigator from "../../../components/usernavigator/UserNavigator"

const timeOrder: { [key: string]: number } = {
  "12 AM": 0,
  "1 AM": 1,
  "2 AM": 2,
  "3 AM": 3,
  "4 AM": 4,
  "5 AM": 5,
  "6 AM": 6,
  "7 AM": 7,
  "8 AM": 8,
  "9 AM": 9,
  "10 AM": 10,
  "11 AM": 11,
  "12 PM": 12,
  "1 PM": 13,
  "2 PM": 14,
  "3 PM": 15,
  "4 PM": 16,
  "5 PM": 17,
  "6 PM": 18,
  "7 PM": 19,
  "8 PM": 20,
  "9 PM": 21,
  "10 PM": 22,
  "11 PM": 23,
}

const FestivalSchedulePage: React.FC = () => {
  const { id } = useParams()
  const [ schedules, setSchedules ] = useState<Schedule[]>([])
  const [ stages, setStages ] = useState<Stage[]>([])

  useEffect(() => {
    const fetchStagesAndSchedule = async () => {
      try{
        const res = await api.get(`/schedules/festival/${id}`)
        
        const res2 = await api.get(`stages/festival/${id}`)
        setSchedules(res.data)
        setStages(res2.data)
      } catch (error) {
        console.error("Error fetching festival stages and schedule:", error)
      }
    }
    fetchStagesAndSchedule()
  }, [id])

  if (!stages.length) {
    return <div>
      <p>No stages confirmed for this festival yet. All the information will be updated soon!</p>
      <Link to={`/festivals/${id}`}>Back to Festival</Link>
      </div>
  }

  return (
<div>
      <h2>Festival Schedule</h2>
      <Link to={`/festivals/${id}`}>Back to Festival</Link>

      {stages.map((stage) => (
        <div key={stage._id}>
          <h3>{stage.name}</h3>
            {schedules.length > 0 ? (
              <ul>
              {schedules
                .filter((schedule) => schedule.stageId._id === stage._id)
                .sort((a, b) => timeOrder[a.startTime] - timeOrder[b.startTime])
                .map((schedule) => (
                  <li key={schedule._id}>
                    <strong>{schedule.startTime} - {schedule.endTime} | </strong>
                    {schedule.artistId.name} ({schedule.artistId.country})
                    <span> <Link to={`/edit-schedule/${schedule._id}`}>Edit</Link></span>
                  </li>
                ))}
            </ul>
            ) : (
              <p>No schedules for this stage yet. All the information will be updated soon!</p>
            )}
        </div>
      ))}

      <UserNavigator />
    </div>
  )
}

export default FestivalSchedulePage