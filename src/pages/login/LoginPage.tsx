import { Link } from "react-router-dom"
import LoginForm from "../../components/forms/LoginForm"

const LoginPage: React.FC = () => {
    return (
        <div>
            <h1>Login</h1>
            <LoginForm />
            <Link to="/register">Don't have an account? Register</Link>
        </div>
    )
}

export default LoginPage