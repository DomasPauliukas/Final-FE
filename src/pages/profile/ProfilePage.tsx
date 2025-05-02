import { Navigate, NavLink } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useEffect, useState } from "react"
import api from "../../components/api"

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
    console.log(loggedUser)
    return (
    <div>
      <h1>Profile Page</h1>
        <p>Name: {loggedUser.name}</p>
        <p>Surname: {loggedUser.surname}</p>
        <p>Age: {loggedUser.age}</p>
        <p>Username: {loggedUser.username}</p>
        <p>Email: {loggedUser.email}</p>
        <p>User ID: {loggedUser._id}</p>
        <p>Role: {loggedUser.role}</p>
        <button onClick={logoutUser}>Logout</button>
        <NavLink to={`/profile-edit`}>Edit</NavLink>
    </div>
  )
}

export default ProfilePage