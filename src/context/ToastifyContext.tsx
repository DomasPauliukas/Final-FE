import { createContext, ReactNode, useContext } from 'react'
import { toast } from 'react-toastify'


interface ToastifyContextType {
  showSuccess: (msg: string) => void
  showError: (msg: string) => void
}

const ToastifyContext = createContext<ToastifyContextType | undefined>(undefined)

interface NotificationProviderProps {
    children: ReactNode
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const showSuccess = (msg: string) => toast.success(msg)
  const showError = (msg: string) => toast.error(msg)

  return (
    <ToastifyContext.Provider value={{ showSuccess, showError }}>
      {children}
    </ToastifyContext.Provider>
  )
}

export const useNotification = () => {
  const context = useContext(ToastifyContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}