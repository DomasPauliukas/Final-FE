import { Link } from "react-router-dom"

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li><Link to="/users">Manage Users</Link></li>
        <li><Link to="/festivals">Manage Festivals</Link></li>
        <li><Link to="/create-festival">Create Festival</Link></li>
        <li><Link to="/artists">Manage Artists</Link></li>
        <li><Link to="/create-artist">Create Artist</Link></li>
        <li><Link to="/stages">Manage Stages</Link></li>
        <li><Link to="/create-stage">Create Stage</Link></li>
        <li><Link to="/schedules">Manage Schedules</Link></li>
        <li><Link to="/create-schedule">Create Schedule</Link></li>
      </ul>
    </div>
  )
}

export default AdminDashboard