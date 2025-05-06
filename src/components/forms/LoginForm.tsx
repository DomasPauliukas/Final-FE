import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import api from "../api"
import { useNotification } from "../../context/ToastifyContext"

const LoginForm: React.FC = () => {
    const { loginUser } = useAuth()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const { showSuccess, showError } = useNotification()

    const navigate = useNavigate()

    const LoginHandler = async (event: React.FormEvent) => {
        event.preventDefault()

        try {
            const loginInfo = {email, password}
            const res = await api.post(`/users/login`, loginInfo)
            const { token } = res.data

            if (token) {
                loginUser(token)
                showSuccess("Login successful!")
                navigate('/profile')
            }
        } catch (error) {
            console.error("Login failed:", error)
            showError("Login failed!")
        }
    }
  return (
    <div>
        <form onSubmit={LoginHandler}>
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
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
  )
}

export default LoginForm