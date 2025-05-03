import { useEffect, useState } from "react"
import { Stage } from "../../types/TypesExport"
import api from "../../components/api"
import { Link } from "react-router-dom"

const StagesPage: React.FC = () => {
    const [stages, setStages] = useState<Stage[] | null>(null)

    useEffect(() => {
        const fetchStages = async () => {
            try {
                const res = await api.get('/stages')
                setStages(res.data)
            } catch (error) {
                console.error("Error fetching stages:", error)
            }
        }
        fetchStages()
    }, [])

    if (!stages) {
        return <div>Loading...</div>
    }

    console.log(stages)
  return (
    <div>
      <h1>Stages Page</h1>
      <Link to="/create-stage">Create Stage</Link>
      <p>This is the Stages page.</p>

      {stages.map((stage) => (
        <div key={stage._id}>
          <h2><Link to={`/stages/${stage._id}`}>*{stage.name}*</Link></h2>
          <p>Capacity: {stage.capacity}</p>
          <p>Festival: <Link to={`/festivals/${stage.festivalId._id}`}>{stage.festivalId.name}</Link> ({stage.festivalId.date})</p>
        </div>
      ))}
    </div>
  )
}

export default StagesPage