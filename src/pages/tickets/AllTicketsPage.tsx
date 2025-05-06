import { useEffect, useState } from "react"
import api from "../../components/api"
import { Ticket } from "../../types/TypesExport"
import { useNotification } from "../../context/ToastifyContext"

const AllTicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState([])
  const { showSuccess, showError } = useNotification()

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.get("/tickets")
        setTickets(res.data)
      } catch (error) {
        console.error("Error fetching tickets:", error)
      }
    }

    fetchTickets()
  }, [])

  const deleteTicket = async (ticketId: string) => {
    try {
      await api.delete(`/tickets/${ticketId}`)
      setTickets((prevTickets) => prevTickets.filter((ticket: Ticket) => ticket._id !== ticketId))
      showSuccess("Ticket refunded successfully")
    } catch (error) {
      console.error("Error deleting ticket:", error)
      showError("Error deleting ticket")
    }
  }

  return (
      <div>
        <h1>All Purchased Tickets</h1>
        {tickets.length === 0 ? (
          <p>No tickets have been purchased yet.</p>
        ) : (
          tickets.map((ticket: Ticket) => (
            <div key={ticket._id} style={{ borderBottom: "1px solid #ccc", marginBottom: "1rem", paddingBottom: "1rem" }}>
              <h3>Festival: {ticket.festivalId.name}</h3>
              <p><strong>User:</strong> {ticket.userId?.username} ({ticket.userId?.email})</p>
              <p><strong>Type:</strong> {ticket.ticketType}</p>
              <p><strong>Quantity:</strong> {ticket.quantity}</p>
              <p><strong>Total Price:</strong> {ticket.price} EUR</p>
              <p><strong>Purchased:</strong> {new Date(ticket.purchaseAt).toLocaleString()}</p>

            <button
                onClick={() => deleteTicket(ticket._id)}
                style={{ marginLeft: "10px", color: "red" }}
            >Refund</button>
            
            </div>

          ))
        )}
      </div>
  )
}

export default AllTicketsPage
