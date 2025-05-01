import { NavLink } from "react-router-dom"
import './PageNavigator.css'

const PageNavigator: React.FC = () => {

    return (
        <div className="page-navigator">
            <NavLink to={'/'}>Home Page</NavLink>
            <NavLink to={'/login'}>Login</NavLink>
            <NavLink to={'/register'}>Register</NavLink>
            <NavLink to={'/profile'}>My profile</NavLink>
            <NavLink to={'/festivals'}>Festivals</NavLink>
            <NavLink to={'/artists'}>Artists</NavLink>
            <NavLink to={'/my-festivals'}>My Festivals</NavLink>
        </div>
    )
}

export default PageNavigator