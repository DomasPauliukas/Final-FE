import { useEffect, useState } from "react"
import { User } from "../../types/TypesExport"
import api from "../../components/api"
import { useNavigate } from "react-router-dom"

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[] | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get('/users')
                setUsers(res.data)
            } catch (error) {
                console.error("Error fetching users:", error)
            }
        }
        fetchUsers()
    }, [])

    const deleteUser = async (id: string) => {
        try {
            await api.delete(`/users/${id}`)
            setUsers((prevUsers) => prevUsers?.filter((user) => user._id !== id) || null)
        } catch (error) {
            console.error("Error deleting user:", error)
        }
    }



  return (
    <div>
      <h1>Users Page</h1>
      <p>This is the users page.</p>
      {users && users.length > 0 ? (
        <div>
          {users.map((user) => (
            <div key={user._id} style={{ marginBottom: "20px" }}>
              <h3>{user.username} <span><button onClick={() => deleteUser(user._id ?? '')}>Delete</button></span></h3>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Surname:</strong> {user.surname}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Role:</strong> {user.role}</p>
              <p><strong>Age:</strong> {user.age}</p>
            </div>
          ))}
        </div>
        ) : (
          <p>No users found.</p>
        )}
    </div>
    )
}

export default UsersPage