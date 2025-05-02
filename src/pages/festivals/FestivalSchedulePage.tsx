import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import api from "../../components/api"
import { Schedule, Stage } from "../../types/TypesExport"

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
    return <div>No stages confirmed for this festival yet. All the information will be updated soon!</div>;
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
                .map((schedule) => (
                  <li key={schedule._id}>
                    <strong>{schedule.startTime} - {schedule.endTime} | </strong>
                    {schedule.artistId.name} ({schedule.artistId.country})
                  </li>
                ))}
            </ul>
            ) : (
              <p>No schedules for this stage yet. All the information will be updated soon!</p>
            )}
        </div>
      ))}
    </div>
  )
}

export default FestivalSchedulePage