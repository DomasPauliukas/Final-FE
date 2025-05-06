import { useEffect, useState } from "react"
import { Festival } from "../../../types/TypesExport"
import api from "../../../components/api"
import { Link } from "react-router-dom"
import UserNavigator from "../../../components/usernavigator/UserNavigator"
import OnlyAdmin from "../../../components/privateroute/OnlyAdmin"
import styles from "./FestivalsPage.module.css"

const FestivalsPage: React.FC = () => {
  const [festivals, setFestivals] = useState<Festival[]>([])

useEffect(() => {
  const fetchFestivals = async () => {
    try {
      const res = await api.get('/festivals')
      setFestivals(res.data)
    } catch (error) {
      console.error("Error fetching festivals:", error)
    }
  }
  fetchFestivals()
}, [])

  return (
    <div>
      <h1>Festival Page</h1>
      <OnlyAdmin>
        <Link to="/create-festival" className={styles.btnLink}>+ Create New Festival</Link>
      </OnlyAdmin>
      
      <div className={styles.festivalGrid}>
          {festivals.map((festival) => (
            <div key={festival._id} className={styles.festivalCard}>
              <h2>{festival.name}</h2>
              <p>{festival.description}</p>
              <p>Date: {festival.date}</p>
              <p>Location: {festival.location}</p>
              <img src={festival.image} alt={festival.name} className={styles.festivalImage} />
              <div>
              <Link to={`/festivals/${festival._id}`}>View Details</Link>
              </div>
            </div>
          ))}
      </div>

        <UserNavigator />
    </div>
  )
}


export default FestivalsPage