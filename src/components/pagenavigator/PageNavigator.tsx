import { NavLink } from "react-router-dom"
import './PageNavigator.css'
import { useAuth } from "../../context/AuthContext"

const PageNavigator: React.FC = () => {
    const { user } = useAuth()
    return (
        <div className="page-navigator">
            <NavLink to={'/'}>Home Page</NavLink>
            <NavLink to={'/festivals'}>Festivals</NavLink>
            <NavLink to={'/artists'}>Artists</NavLink>

            <NavLink to={'/stages'}>Stages</NavLink>
            <NavLink to={'/schedules'}>Schedules</NavLink>

            <NavLink to={'/users'}>Users</NavLink>

        {!user ? (
            <>
                <NavLink to={'/login'}>Login</NavLink>
                <NavLink to={'/register'}>Register</NavLink>
            </>
        ) : (
            <>
                <NavLink to={'/profile'}>My profile</NavLink>
                <NavLink to={'/my-festivals'}>My Festivals</NavLink>
            </>
        )}
        </div>
    )
}

export default PageNavigator