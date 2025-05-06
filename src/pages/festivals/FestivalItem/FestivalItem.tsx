import { Link, useNavigate, useParams } from "react-router-dom"
import { Festival } from "../../../types/TypesExport"
import { useEffect, useState } from "react"
import api from "../../../components/api"
import UserNavigator from "../../../components/usernavigator/UserNavigator"
import OnlyAdmin from "../../../components/privateroute/OnlyAdmin"
import { useAuth } from "../../../context/AuthContext"
import { useNotification } from "../../../context/ToastifyContext"

const FestivalItem: React.FC = () => {

    const { id } = useParams()
    const [festival, setFestival] = useState<Festival | null>(null)
    const navigate = useNavigate()
    const { user } = useAuth()
    const [showTicketForm, setShowTicketForm] = useState(false)
    const [ticketType, setTicketType] = useState('Regular')
    const [quantity, setQuantity] = useState(1)
    const [totalPrice, setTotalPrice] = useState<number>(0)

    const { showSuccess, showError } = useNotification()

    useEffect(() => {
        const fetchFestival = async () => {
            try {
                const res = await api.get(`/festivals/${id}`)
                setFestival(res.data)
            } catch (error) {
                console.error("Error fetching festival:", error)
            }
        }
        fetchFestival()
    }, [id])

    useEffect(() => {
      if (!festival) return

      let totalPrice = 0
      if (ticketType === 'VIP') {
          totalPrice = festival.vipPrice * quantity
      } else if (ticketType === 'Regular') {
          totalPrice = festival.regularPrice * quantity
      }
      setTotalPrice(totalPrice)
    }, [ticketType, quantity, festival])

    const deleteFestival = async (id: string) => {
        try {
            await api.delete(`/festivals/${id}`)
            showSuccess("Festival deleted successfully")
            navigate('/festivals')
        } catch (error) {
            console.error("Error deleting festival:", error)
            showError("Error deleting festival")
        }
    }

    if (!festival) {
        return <p>Loading...</p>
    }

    const submitHandler = async (event: React.FormEvent) => {
      event.preventDefault();

      const newTicket = {
          festivalId: id,
          ticketType,
          quantity,
      }

      try {
          await api.post('/tickets/buy', newTicket);
          alert("Ticket purchased successfully!");
          setShowTicketForm(false)
          navigate('/my-festivals')
      } catch (error) {
          console.error("Error buying ticket", error);
          alert("Failed to purchase ticket");
      }
  }

    return (
    <div>
      <h1>{festival.name}</h1>
      <OnlyAdmin>
        <div>
            <Link to={`/edit-festival/${id}`}>Edit</Link>
            <button onClick={() => deleteFestival(id ?? '')}>Delete</button>
        </div>
      </OnlyAdmin>

      <img src={festival.image} alt={festival.name} width="400" />
      <p><strong>Location:</strong> {festival.location}</p>
      <p>
        <strong>Date: </strong>
        {festival.date}
      </p>
      <p>{festival.description}</p>

      <div style={{ marginTop: "20px" }}>
        <Link to={`/festivals/${id}/artists`}>
          <button>View All Artists</button>
        </Link>
        <Link to={`/festivals/${id}/schedule`} style={{ marginLeft: "10px" }}>
          <button>View Festival Schedule</button>
        </Link>
      </div>

      {!showTicketForm && user && (
          <button onClick={() => setShowTicketForm(true)} style={{ marginTop: "20px" }}>
              Buy Ticket
          </button>
      )}

      {showTicketForm && (
          <form onSubmit={submitHandler} style={{ marginTop: "20px" }}>
              <div>
                  <label>Ticket Type: </label>
                  <select value={ticketType} onChange={(event) => setTicketType(event.target.value)}>
                      <option value="Regular">Regular</option>
                      <option value="VIP">VIP</option>
                  </select>
              </div>

              <div>
                  <label>Quantity: </label>
                  <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(event) => setQuantity(Number(event.target.value))}
                  />
              </div>
              {ticketType && (
                <>
                <p><strong>Price per Ticket:</strong> {ticketType === 'VIP' ? festival.vipPrice : festival.regularPrice} EUR</p>
                <p><strong>Total Price:</strong> {totalPrice} EUR</p>
                </>
              )}

              <button type="submit">Buy Ticket</button>
          </form>
      )}


        <UserNavigator />
    </div>
  )
}

export default FestivalItem