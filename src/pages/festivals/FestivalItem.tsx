import { Link, useNavigate, useParams } from "react-router-dom"
import { Festival } from "../../types/TypesExport"
import { useEffect, useState } from "react"
import api from "../../components/api"
import UserNavigator from "../../components/usernavigator/UserNavigator"

const FestivalItem: React.FC = () => {

    const { id } = useParams()
    const [festival, setFestival] = useState<Festival | null>(null)
    const navigate = useNavigate()
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

    const deleteFestival = async (id: string) => {
        try {
            await api.delete(`/festivals/${id}`)
            alert("Festival deleted successfully!")
            navigate('/festivals')
        } catch (error) {
            console.error("Error deleting festival:", error)
        }
    }

    if (!festival) {
        return <p>Loading...</p>
    }

    return (
    <div>
      <h1>{festival.name}</h1>
      <div>
        <Link to={`/edit-festival/${id}`}>Edit</Link>
        <button onClick={() => deleteFestival(id ?? '')}>Delete</button>
      </div>

      <img src={festival.image} alt={festival.name} width="400" />
      <p><strong>Location:</strong> {festival.location}</p>
      <p>
        <strong>Date: </strong>
        {festival.date}
      </p>
      <p>{festival.description}</p>

      <div style={{ marginTop: "20px" }}>
        <Link to={`/festivals/${id}/artists`}>
          <button>View All Artists</button>
        </Link>
        <Link to={`/festivals/${id}/schedule`} style={{ marginLeft: "10px" }}>
          <button>View Festival Schedule</button>
        </Link>
      </div>


        <UserNavigator />
    </div>
  )
}

export default FestivalItem