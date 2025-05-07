import { Link } from "react-router-dom"
import styles from "./AdminDashboard.module.css"


const AdminDashboard: React.FC = () => {
  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Admin Dashboard</h1>
      <ul className={styles.linkGrid}>
        <li><Link to="/users" className={styles.dashboardLink}>Manage Users</Link></li>
        <li><Link to="/tickets" className={styles.dashboardLink}>Manage Tickets</Link></li>
        <li><Link to="/festivals" className={styles.dashboardLink}>Manage Festivals</Link></li>
        <li><Link to="/create-festival" className={styles.dashboardLink}>Create Festival</Link></li>
        <li><Link to="/artists" className={styles.dashboardLink}>Manage Artists</Link></li>
        <li><Link to="/create-artist" className={styles.dashboardLink}>Create Artist</Link></li>
        <li><Link to="/stages" className={styles.dashboardLink}>Manage Stages</Link></li>
        <li><Link to="/create-stage" className={styles.dashboardLink}>Create Stage</Link></li>
        <li><Link to="/schedules" className={styles.dashboardLink}>Manage Schedules</Link></li>
        <li><Link to="/create-schedule" className={styles.dashboardLink}>Create Schedule</Link></li>
      </ul>
    </div>
  )
}

export default AdminDashboard