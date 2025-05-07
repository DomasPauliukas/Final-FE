import { useEffect, useState } from "react"
import { User } from "../../types/TypesExport"
import api from "../../components/api"
import { useNotification } from "../../context/ToastifyContext"
import { Link } from "react-router-dom"
import styles from "./UsersPage.module.css"

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
      <div className={styles.usersContainer}>
          <h1 className={styles.pageTitle}>Users Page</h1>
          
          {users && users.length > 0 ? (
            <div className={styles.usersList}>
              {users.map((user) => (
                <div key={user._id} className={styles.userCard}>
                  <div className={styles.cardHeader}>
                    <h3>{user.username}</h3>
                    <div className={styles.actions}>
                      <button onClick={() => deleteUser(user._id ?? "")} className={styles.deleteBtn}>Delete User</button>
                      <Link to={`/edit-user/${user._id}`} className={styles.btnLink}>Edit User</Link>
                    </div>
                  </div>

                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Surname:</strong> {user.surname}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                  <p><strong>Age:</strong> {user.age}</p>

          {user.tickets && user.tickets.length > 0 && (
            <>
              <h4 className={styles.sectionTitle}>Tickets:</h4>
              <ul className={styles.ticketList}>
                {user.tickets.map((ticket) => (
                  <li key={ticket._id}>
                    <strong>Festival:</strong> {ticket.festivalId?.name} |{" "}
                    <strong>Type:</strong> {ticket.ticketType} |{" "}
                    <strong>Quantity:</strong> {ticket.quantity} |{" "}
                    <strong>Price:</strong> €{ticket.price}
                    <button
                      onClick={() => deleteTicket(ticket._id)}
                      className={styles.refundBtn}>
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