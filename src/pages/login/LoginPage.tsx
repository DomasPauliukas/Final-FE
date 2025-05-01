import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useState } from "react"
import api from "../../components/api"

const LoginPage: React.FC = () => {
    const { loginUser } = useAuth()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const navigate = useNavigate()

    const LoginHandler = async (event: React.FormEvent) => {
        event.preventDefault()

        try {
            const loginInfo = {email, password}
            const res = await api.post(`/users/login`, loginInfo)
            const { token } = res.data

            if (token) {
                loginUser(token)
                navigate('/profile')
            }
        } catch (error) {
            console.error("Login failed:", error)
            alert("Login failed. Please check your credentials.")
        }
    }

    return (
        <div>
            <h1>Login</h1>

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

export default LoginPage