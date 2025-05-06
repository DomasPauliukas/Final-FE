import { Link } from "react-router-dom"
import RegisterForm from "../../components/forms/RegisterForm"

const RegisterPage = () => {

  return (
    <div className="form-page-container">
      <h1 className="form-title">Register Form: </h1>
      <RegisterForm />
      <Link to="/login">Already have an account? Login</Link>
    </div>
  )
}

export default RegisterPage