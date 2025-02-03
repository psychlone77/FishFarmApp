import useAuth from '../hooks/useAuth'

const roles = {
  SuperAdmin: 1,
  Admin: 2,
  Employee: 3,
}

export default function Authorize({
  children,
  requiredAccess,
}: {
  children: React.ReactNode
  requiredAccess: number
}) {
  const { role } = useAuth()
  if (roles[role as keyof typeof roles] <= requiredAccess) {
    return children
  } else {
    return null
  }
}

export function checkAccess(requiredAccess: number) : boolean {
  const { role } = useAuth()
  return roles[role as keyof typeof roles] <= requiredAccess
}