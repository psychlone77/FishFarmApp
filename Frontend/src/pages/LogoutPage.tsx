import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export default function LogoutPage() {
  const navigate = useNavigate()

  useEffect(() => {
    document.cookie = '.AspNetCore.Identity.Application=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    navigate('/login')
  }, [navigate])

  return null
}
