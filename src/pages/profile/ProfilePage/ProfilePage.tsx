import { Navigate, NavLink } from "react-router-dom"
import { useAuth } from "../../../context/AuthContext"
import { useEffect, useState } from "react"
import api from "../../../components/api"
import styles from "./ProfilePage.module.css"

interface LoggedUser {
    name: string
    surname: string
    age: number
    username: string
    email: string
    userId: string
    role: string
    _id: string
}

const ProfilePage: React.FC = () => {
    const [loggedUser, setLoggedUser] = useState<LoggedUser | null>(null)
    const { user, loading, logoutUser } = useAuth()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await api.get(`/users/${user?.userId}`)
                setLoggedUser(res.data)
            } catch (error) {
                console.error("Error fetching user data:", error)
            }
        }
        if (user) {
        fetchUser()
        }
    }, [user])
    
    if (loading) {
        return <p>Loading...</p>
    }

    if (!user) {
        return <Navigate to="/login"/>
    }

    const isExpired = user.exp * 1000 < Date.now()
    if (isExpired) {
        logoutUser()
        return <Navigate to="/login"/>
    }
    
    if (!loggedUser) {
        return <p>Loading user data...</p>
    } 
    
    return (
    <div className={styles.profileContainer}>
      <h1 className={styles.profileTitle}>Profile Page</h1>
      
      <div className={styles.profileInfo}>
        <p><strong>Name:</strong> {loggedUser.name}</p>
        <p><strong>Surname:</strong> {loggedUser.surname}</p>
        <p><strong>Age:</strong> {loggedUser.age}</p>
        <p><strong>Username:</strong> {loggedUser.username}</p>
        <p><strong>Email:</strong> {loggedUser.email}</p>
        <p><strong>Role:</strong> {loggedUser.role}</p>
      </div>

      <div className={styles.actions}>
        <button onClick={logoutUser} className={styles.deleteBtn}>Logout</button>
        <NavLink to={`/profile-edit`} className={styles.btnLink}>Edit</NavLink>
      </div>
    </div>
  )
}

export default ProfilePage