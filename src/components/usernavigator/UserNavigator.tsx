import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const UserNavigator: React.FC = () => {
    const { user } = useAuth()

  return (
    <div>
    {!user && 
        <>
        <p>Only logged users can buy festival tickets and see personal 'My festival' page!</p>
        <div style={{ display: 'flex', gap: '16px' }}>
            <Link to={'/login'}>Login</Link>
            <Link to={'/register'}>Register</Link>
        </div>
        </>
    }
    </div>
  )
}

export default UserNavigator