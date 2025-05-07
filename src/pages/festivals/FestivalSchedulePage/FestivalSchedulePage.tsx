import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import api from "../../../components/api"
import { Festival, Schedule, Stage } from "../../../types/TypesExport"
import styles from "./FestivalSchedulePage.module.css"


const timeOrder: { [key: string]: number } = {
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
  "12 AM": 24,
}

const FestivalSchedulePage: React.FC = () => {
  const { id } = useParams()
  const [ schedules, setSchedules ] = useState<Schedule[]>([])
  const [ stages, setStages ] = useState<Stage[]>([])
  const [festival, setFestival] = useState<Festival | null>(null)

  useEffect(() => {
    const fetchStagesAndSchedule = async () => {
      try{
        const res = await api.get(`/schedules/festival/${id}`)
        const res2 = await api.get(`stages/festival/${id}`)
        const res3 = await api.get(`/festivals/${id}`)
        setSchedules(res.data)
        setStages(res2.data)
        setFestival(res3.data)
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
    <div className={styles.scheduleContainer}>

      <h2 className={styles.scheduleHeader}>
        {festival ? `${festival.name} Schedule` : 'Festival Schedule'}
      </h2>
      
      <div style={{textAlign: "center"}}>
        <Link to={`/festivals/${id}`} className={styles.backLink}>
          Back to Festival
        </Link>
      </div>
  
      {stages.map((stage) => (
        <div key={stage._id} className={styles.stageSection}>
          <h3 className={styles.stageTitle}>{stage.name}</h3>
          {schedules.length > 0 ? (
            <ul className={styles.scheduleList}>
              {schedules
                .filter((schedule) => schedule.stageId._id === stage._id)
                .sort((a, b) => timeOrder[a.startTime] - timeOrder[b.startTime])
                .map((schedule) => (
                  <li key={schedule._id} className={styles.scheduleItem}>
                    <strong>
                      {schedule.startTime} - {schedule.endTime} |
                    </strong>{' '}
                    {schedule.artistId.name} ({schedule.artistId.country})
                    <Link to={`/edit-schedule/${schedule._id}`}>Edit</Link>
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