import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // try to fetch current session
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/me', {
          method: 'GET',
          headers: { 'x-client': 'React' },
          credentials: 'include'
        })
        if (res.ok) {
          const data = await res.json()
          if (data.authenticated) setUser(data.user)
        }
      } catch {}
      setLoading(false)
    }
    fetchSession()
  }, [])

  const value = useMemo(() => ({ user, setUser, loading }), [user, loading])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}


