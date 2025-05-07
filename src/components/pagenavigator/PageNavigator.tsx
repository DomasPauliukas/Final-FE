import { NavLink } from "react-router-dom"
import './PageNavigator.css'
import { useAuth } from "../../context/AuthContext"
import OnlyAdmin from "../privateroute/OnlyAdmin"

const PageNavigator: React.FC = () => {
    const { user } = useAuth()
    return (
        <div className="page-navigator">
            <NavLink to={'/'}>Home Page</NavLink>
            <NavLink to={'/festivals'}>Festivals</NavLink>
            <NavLink to={'/artists'}>Artists</NavLink>

            <NavLink to={'/stages'}>Stages</NavLink>
        {!user ? (
            <>
                <NavLink to={'/login'}>Login</NavLink>
                <NavLink to={'/register'}>Register</NavLink>
            </>
        ) : (
            <>
                <NavLink to={'/profile'}>My profile</NavLink>
            {user.role === 'USER' && (
                <NavLink to={'/my-festivals'}>My Festivals</NavLink>
            )}
            </>
        )}
        
        <OnlyAdmin>
            <NavLink to={'/admin'}>Admin</NavLink>
        </OnlyAdmin>
        </div>
    )
}

export default PageNavigator