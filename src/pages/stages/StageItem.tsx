import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Stage } from "../../types/TypesExport";
import api from "../../components/api";

const StageItem: React.FC = () => {
    const { id } = useParams()
    const navigate = useNavigate()  
    const [stage, setStage] = useState<Stage | null>(null)

    useEffect(() => {
        const fetchStage = async () => {
            try {
                const res = await api.get(`/stages/${id}`)
                setStage(res.data)
            } catch (error) {
                console.error("Error fetching stage:", error)
            }
        }
        fetchStage()
    }, [id])

    const deleteStage = async (id: string) => {
        try {
            await api.delete(`/stages/${id}`)
            alert("Stage deleted successfully!")
            navigate('/stages')
        } catch (error) {
            console.error("Error deleting stage:", error)
        }
    }




    if (!stage) {
        return <div>Loading...</div>
    }
  return (
    <div className="stage-item">
      <h2>Stage Item</h2>
      <p>This is a placeholder for the stage item component.</p>
      <h3>{stage.name}</h3>
      <Link to={`/edit-stage/${stage._id}`}>Edit</Link>
      <button onClick={() => deleteStage(id ?? '')}>Delete</button>
        <p>Capacity: {stage.capacity}</p>
        <p>Festival: <Link to={`/festivals/${stage.festivalId._id}`}>{stage.festivalId.name}</Link></p>
        <p>Festival Date & Location: {stage.festivalId.date} - {stage.festivalId.location}</p>
    </div>
  )
}

export default StageItem;