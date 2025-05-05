import { useEffect, useState } from "react"
import api from "../../components/api"
import { Ticket } from "../../types/TypesExport"
import { Link } from "react-router-dom"

const MyFestivalsPage: React.FC = () => {
  const [myTickets, setMyTickets] = useState<Ticket[]>([])

  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        const res = await api.get('tickets/my-tickets')
        setMyTickets(res.data)
      } catch (error) {
        console.error("Error fetching my tickets:", error)
      }
    }
    fetchMyTickets()
  }, [])

  if (myTickets.length === 0) {
    return <p>You have no tickets.</p>
  }


  return (
    <div>
      <h1>My Festivals</h1>
      <p>This is the My Festivals page.</p>
      <div>
      <h1>My Festivals</h1>
      {myTickets.map((myTicket) => (
        <div key={myTicket._id} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
          <h3><Link to={`/festivals/${myTicket.festivalId._id}`}>{myTicket.festivalId.name}</Link></h3>
          <p><strong>Location:</strong> {myTicket.festivalId.location}</p>
          <p><strong>Date:</strong> {myTicket.festivalId.date}</p>
          <p><strong>Ticket Type:</strong> {myTicket.ticketType}</p>
          <p><strong>Quantity:</strong> {myTicket.quantity}</p>
          <p><strong>Total Paid:</strong> {myTicket.price} EUR</p>
        </div>
      ))}
    </div>

    </div>
  )
}

export default MyFestivalsPage