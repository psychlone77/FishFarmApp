import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function LogoutPage() {
  const navigate = useNavigate()

  useEffect(() => {
    document.cookie = 'yourCookieName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    navigate('/login')
  }, [history])

  return null
}
