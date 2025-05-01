import { jwtDecode } from "jwt-decode";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface DecodedUser {
    userId: string
    email: string
    role: string
    name: string
    surname: string
    age: number
    username: string
    exp: number
    iat: number
}

interface AuthContextType {
    user: DecodedUser | null
    loginUser: (token: string) => void
    logoutUser: () => void
    updateUser: (updatedUser: Partial<DecodedUser>) => void
    loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<DecodedUser | null>(null)
    const [loading, setLoading] = useState(true)

useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
        try {
            const decoded = jwtDecode<DecodedUser>(token)

            if (decoded.exp * 1000 > Date.now()) {
                setUser(decoded)
            } else {
                localStorage.removeItem('token')
            }
        } catch {
            localStorage.removeItem('token')
        }
    }
    setLoading(false)
}, [])

    const loginUser = (token: string) => {
        localStorage.setItem('token', token)
        const decoded = jwtDecode<DecodedUser>(token)
        setUser(decoded)
    }

    const logoutUser = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    const updateUser = (updatedUser: Partial<DecodedUser>) => {
        setUser(prevState => {
            if (!prevState) return prevState
            return {
                ...prevState,
                ...updatedUser
            }
        })
    }

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser, updateUser, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}