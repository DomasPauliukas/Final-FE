import { Link } from "react-router-dom"
import LoginForm from "../../components/forms/LoginForm"

const LoginPage: React.FC = () => {
    return (
        <div className="form-page-container">
            <h1 className="form-title">Login</h1>
            <LoginForm />
            <Link to="/register" className="form-link">Don't have an account? Register</Link>
        </div>
    )
}

export default LoginPage