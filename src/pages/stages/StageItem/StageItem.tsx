import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../../components/api";
import OnlyAdmin from "../../../components/privateroute/OnlyAdmin";
import { useNotification } from "../../../context/ToastifyContext";
import { Stage } from "../../../types/TypesExport";
import styles from "./StageItem.module.css";


const StageItem: React.FC = () => {
    const { id } = useParams()
    const navigate = useNavigate()  
    const [stage, setStage] = useState<Stage | null>(null)
    const { showSuccess, showError } = useNotification()

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
            showSuccess("Stage deleted successfully")
            navigate('/stages')
        } catch (error) {
            console.error("Error deleting stage:", error)
            showError("Error deleting stage")
        }
    }




    if (!stage) {
        return <div>Loading...</div>
    }
  return (
    <div className={styles.stageDetails}>
      <h3>{stage.name}</h3>
      
      <OnlyAdmin>
        <div className={styles.adminControls}>
            <Link to={`/edit-stage/${stage._id}`} className={styles.btnLink}>Edit</Link>
            <button onClick={() => deleteStage(id ?? '')} className={styles.deleteBtn}>Delete</button>
        </div>
      </OnlyAdmin>

        <p>Capacity: {stage.capacity}</p>
        <p>Festival: <Link to={`/festivals/${stage.festivalId._id}`}>{stage.festivalId.name}</Link></p>
        <p>Festival Date & Location: {stage.festivalId.date} - {stage.festivalId.location}</p>
    </div>
  )
}

export default StageItem;