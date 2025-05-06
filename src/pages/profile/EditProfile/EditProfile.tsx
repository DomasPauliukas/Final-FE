import { useEffect, useState } from "react"
import { useAuth } from "../../../context/AuthContext"
import { useNavigate, useParams } from "react-router-dom"
import api from "../../../components/api"
import { useNotification } from "../../../context/ToastifyContext"
import styles from '../../../components/forms/Form.module.css'

const EditProfile: React.FC = () => {
    const { user, updateUser } = useAuth()
    const navigate = useNavigate()

    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const [age, setAge] = useState<number>(0)
    const [username, setUsername] = useState<string>('')

    const { userId } = useParams()
    const isAdminEditing = user?.role === 'ADMIN' && userId && userId !== user?.userId
    const targetUserId = isAdminEditing ? userId : user?.userId


    const { showSuccess, showError } = useNotification()

    useEffect(() => {
        const fetchUserData = async () => {
          if (isAdminEditing && targetUserId) {
            try {
                const res = await api.get(`/users/${targetUserId}`)
                setName(res.data.name)
                setSurname(res.data.surname)
                setAge(res.data.age)
                setUsername(res.data.username)
            } catch (error) {
                console.error("Error fetching user data:", error)
            }
          } else if (user) {
            setName(user.name)
            setSurname(user.surname)
            setAge(user.age)
            setUsername(user.username)
          }
        }
        fetchUserData()
    }, [user, targetUserId, isAdminEditing])

    const UpdateHandler = async (event: React.FormEvent) => {
        event.preventDefault()

        const updatedUser = {
            name,
            surname,
            age,
            username
        }

        try {
            await api.put(`/users/${targetUserId}`, updatedUser)
            if (!isAdminEditing) {
              updateUser(updatedUser)
              showSuccess("Profile updated successfully")
              navigate('/profile')
            } else {
              showSuccess("User updated successfully")
              navigate('/users')
            }
        } catch (error) {
            console.error("Error updating profile:", error)
            showError("Error updating profile")
        }
    }
  return (
    <div className="form-page-container">
      <h1>Edit Profile</h1>

      <div className={styles.formWrapper}>
        <form onSubmit={UpdateHandler}>
          <div className={styles.formControl}>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="surname">Surname: </label>
            <input
              type="text"
              id="surname"
              value={surname}
              onChange={(event) => setSurname(event.target.value)}
              required
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="age">Age: </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(event) => setAge(Number(event.target.value))}
              required
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>Edit</button>

        </form>
      </div>
    </div>
  )
}

export default EditProfile