import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import api from "../../components/api"

const EditProfile: React.FC = () => {
    const { user, updateUser } = useAuth()
    const navigate = useNavigate()

    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const [age, setAge] = useState<number>(0)
    const [username, setUsername] = useState<string>('')

    useEffect(() => {
        if (user) {
            setName(user.name)
            setSurname(user.surname)
            setAge(user.age)
            setUsername(user.username)
        }
    }, [user])

    const UpdateHandler = async (event: React.FormEvent) => {
        event.preventDefault()

        const updatedUser = {
            name,
            surname,
            age,
            username
        }

        try {
            await api.put(`/users/${user?.userId}`, updatedUser)
            updateUser(updatedUser)
            
            alert("Profile updated successfully!")
            navigate('/profile')
        } catch (error) {
            console.error("Error updating profile:", error)
            alert("Failed to update profile. Please try again.")
        }
    }
  return (
    <div>
      <h1>Edit Profile</h1>

      <form onSubmit={UpdateHandler}>
        <div className="form-control">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="surname">Surname: </label>
          <input
            type="text"
            id="surname"
            value={surname}
            onChange={(event) => setSurname(event.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="age">Age: </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(event) => setAge(Number(event.target.value))}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>

        <button type="submit">Edit</button>

      </form>
    </div>
  )
}

export default EditProfile