import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Nav() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  const logout = async () => {
    await fetch('/api/logout', { headers: { 'x-client': 'React' }, credentials: 'include' })
    setUser(null)
    navigate('/login')
  }

  return (
    <nav style={{ display: 'flex', gap: 12, padding: 12, borderBottom: '1px solid #eee' }}>
      <Link to="/camps">Camps</Link>
      {user?.role === 'Donor' && <>
        <Link to="/donor">Donor Dashboard</Link>
        <Link to="/donor/location">My Location</Link>
      </>}
      {user?.role === 'Hospital' && <>
        <Link to="/hospital">Hospital Dashboard</Link>
        <Link to="/hospital/stocks">Stocks</Link>
        <Link to="/hospital/donations">Donations</Link>
        <Link to="/hospital/requests">Requests</Link>
        <Link to="/hospital/emergency">Emergency</Link>
        <Link to="/hospital/camp/create">Create Camp</Link>
        <Link to="/hospital/location">Hospital Location</Link>
      </>}
      <span style={{ marginLeft: 'auto' }} />
      {!user ? <Link to="/login">Login</Link> : <button onClick={logout}>Logout</button>}
    </nav>
  )
}
