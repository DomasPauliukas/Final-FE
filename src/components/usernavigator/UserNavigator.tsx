import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import styles from './UserNavigator.module.css'

const UserNavigator: React.FC = () => {
    const { user } = useAuth()

  return (
    <div>
    {!user && 
        <div className={styles.wrapper}>
          <p className={styles.message}>Only logged users can buy festival tickets and see personal 'My festival' page!</p>
          <div className={styles.linkRow}>
              <Link to={'/login'} className={styles.link}>Login</Link>
              <Link to={'/register'} className={styles.link}>Register</Link>
          </div>
        </div>
    }
    </div>
  )
}

export default UserNavigator