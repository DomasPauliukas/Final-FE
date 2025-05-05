import React from "react"
import { useAuth } from "../../context/AuthContext"

const OnlyAdmin: React.FC<{children: React.ReactNode}> = ( {children} ) => {
    const { user } = useAuth()

    if (user?.role === 'ADMIN') {
        return <>{children}</>
    }

  return null
}

export default OnlyAdmin