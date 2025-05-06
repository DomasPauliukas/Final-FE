import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import api from "../../../components/api"
import { Festival } from "../../../types/TypesExport"
import FestivalForm from "../../../components/forms/FestivalForm"

const EditFestival: React.FC = () => {
    const { id } = useParams()
    const [festival, setFestival] = useState<Festival | null>(null)
    useEffect(() => {
        const fetchFestival = async () => {
            try {
                const res = await api.get(`/festivals/${id}`)
                setFestival(res.data)
            } catch (error) {
                console.error("Error fetching festival:", error)
            }
        }
        fetchFestival()

    }, [id])

    if (!festival) {
        return <div>Loading...</div>
    }

  return (
    <div className="form-page-container">
      <h1 className="form-title">Edit Festival</h1>
      <FestivalForm editFestivalData={festival}/>
    </div>
  )
}

export default EditFestival