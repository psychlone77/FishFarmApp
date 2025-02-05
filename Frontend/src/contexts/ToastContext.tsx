import { useTheme } from '@mui/material'
import React, { createContext, useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface ToastContextProps {
  notifySuccess: (message: string) => void
  notifyError: (message: string) => void
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined)

export const notifySuccess = (message: string) => {
  toast.success(message)
}

export const notifyError = (message: string) => {
  toast.error(message, {
    toastId: message,
  })
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const theme = useTheme()

  return (
    <ToastContext.Provider value={{ notifySuccess, notifyError }}>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme.palette.mode}
      />
      {children}
    </ToastContext.Provider>
  )
}

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
