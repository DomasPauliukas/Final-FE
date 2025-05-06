import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Stage } from "../../../types/TypesExport"
import api from "../../../components/api"
import StageForm from "../../../components/forms/StageForm"

const EditStage: React.FC = () => {
    const { id } = useParams()
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


    if (!stage) {
        return <div>Loading...</div>
    }
  return (
    <div>
      <h1>Edit Stage</h1>
      <StageForm editStageData={stage} />
    </div>
  )
}

export default EditStage