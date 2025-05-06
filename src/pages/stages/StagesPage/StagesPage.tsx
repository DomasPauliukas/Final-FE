import { useEffect, useState } from "react"
import { Stage } from "../../../types/TypesExport"
import api from "../../../components/api"
import { Link } from "react-router-dom"
import OnlyAdmin from "../../../components/privateroute/OnlyAdmin"
import styles from "./StagesPage.module.css"

const StagesPage: React.FC = () => {
  const [stages, setStages] = useState<Stage[] | null>(null)
  const [searchByFestival, setSearchByFestival] = useState<string>('')

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const res = await api.get("/stages")
        setStages(res.data)
      } catch (error) {
        console.error("Error fetching stages:", error)
      }
    }
    fetchStages()
  }, [])

  if (!stages) return <div>Loading...</div>

  const filteredStages = stages.filter(stage => stage.festivalId.name.toLowerCase().includes(searchByFestival.toLowerCase()))

  return (
    <div>
      <h1>Stages</h1>
      <OnlyAdmin>
        <Link to="/create-stage" className={styles.btnLink}>+ Create New Stage</Link>
      </OnlyAdmin>

      <input
        type="text"
        placeholder="Search by festival name..."
        value={searchByFestival}
        onChange={(event) => setSearchByFestival(event.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.stageGrid}>
        {filteredStages.length === 0 && <p>No stages found for the given festival name.</p>}
        {filteredStages.map((stage) => (
          <div key={stage._id} className={styles.stageCard}>
            <h2>
              <Link to={`/stages/${stage._id}`}>{stage.name}</Link>
            </h2>
            <p><strong>Capacity:</strong> {stage.capacity}</p>
            <p>
              <strong>Festival: </strong>
              <Link to={`/festivals/${stage.festivalId._id}`}>
                {stage.festivalId.name} 
              </Link>
              <span> ({stage.festivalId.date})</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StagesPage
