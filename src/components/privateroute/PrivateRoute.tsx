import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const PrivateRoute: React.FC = () => {
    const { user, loading, logoutUser } = useAuth()

    if (loading) {
       return <p>Loading...</p>
    }

    if (!user) {
        return <Navigate to={'/login'} />
    }

    const isExpired = user.exp * 1000 < Date.now()

    if (isExpired) {
        logoutUser()
        return <Navigate to={'/login'}/>
    }
    
    return (
        <Outlet />
    )
}
export default PrivateRoute