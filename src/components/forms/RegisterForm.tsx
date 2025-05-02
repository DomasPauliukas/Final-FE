import { useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api"

const RegisterForm: React.FC = () => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [age, setAge] = useState(0)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const navigate = useNavigate()

const RegisterHandler = async (event: React.FormEvent) => {
    event.preventDefault()

    if (password !== confirmPassword) {
        alert("Passwords do not match!")
        return
    }

    if (!name || !surname || !age || !username || !email || !password) {
        alert("Please fill in all fields!")
        return
    }

    const registerInfo = { 
        name,
        surname,
        age,
        username,
        email,
        password
    }

    try {
        await api.post(`/users/register`, registerInfo)
        alert("Registration successful!")
        navigate('/login')
    } catch (error) {
        console.error("Registration error:", error)
        alert("Registration failed. Please try again.")
    }
}


  return (
    <div>
      <form onSubmit={RegisterHandler}>
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
        <div className="form-control">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            placeholder="*min 5 symbols*"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>

      </form>
    </div>
  )
}

export default RegisterForm