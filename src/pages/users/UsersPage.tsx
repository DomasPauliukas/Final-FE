import { useEffect, useState } from "react"
import { User } from "../../types/TypesExport"
import api from "../../components/api"
import { useNotification } from "../../context/ToastifyContext"

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[] | null>(null)
    const { showSuccess, showError } = useNotification()

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
            showSuccess("User deleted successfully")
        } catch (error) {
            console.error("Error deleting user:", error)
            showError("Error deleting user")
        }
    }

    const deleteTicket = async (ticketId: string) => {
      try {
        await api.delete(`/tickets/${ticketId}`)
        const res = await api.get('/users')
        setUsers(res.data)
        showSuccess("Ticket refunded successfully")
      } catch (error) {
        console.error("Error deleting ticket:", error)
        showError("Error deleting ticket")
      }
    }

    return (
      <div>
          <h1>Users Page</h1>
          <p>This is the users page.</p>
          {users && users.length > 0 ? (
            <div>
              {users.map((user) => (
                <div key={user._id} style={{ marginBottom: "30px", border: "1px solid #ccc", padding: "15px" }}>
                  <h3>
                    {user.username}{" "}
                    <button onClick={() => deleteUser(user._id ?? "")}>Delete User</button>
                  </h3>
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Surname:</strong> {user.surname}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                  <p><strong>Age:</strong> {user.age}</p>

          {user.tickets && user.tickets.length > 0 && (
            <>
              <h4>Tickets: </h4>
              <ul>
                {user.tickets.map((ticket) => (
                  <li key={ticket._id}>
                    <strong>Festival:</strong> {ticket.festivalId?.name} |{" "}
                    <strong>Type:</strong> {ticket.ticketType} |{" "}
                    <strong>Qty:</strong> {ticket.quantity} |{" "}
                    <strong>Price:</strong> €{ticket.price}
                    <button
                      onClick={() => deleteTicket(ticket._id)}
                      style={{ marginLeft: "10px", color: "red" }}
                    >
                      Refund
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
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