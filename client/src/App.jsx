import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './auth/AuthContext'
import Nav from './components/Nav'
import Login from './pages/Login'
import Signup from './pages/Signup'
import DonorDashboard from './pages/DonorDashboard'
import HospitalDashboard from './pages/HospitalDashboard'
import Camps from './pages/Camps'
import CampDetail from './pages/CampDetail'
import Home from './pages/Home'

function PrivateRoute({ children, roles }) {
  const { user, loading } = useAuth()
  if (loading) return <div>Loading authentication...</div>
  if (!user || (roles && !roles.includes(user.role))) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register-donor" element={<Signup defaultRole="Donor" />} />
          <Route path="/register-hospital" element={<Signup defaultRole="Hospital" />} />
          <Route path="/donor" element={<PrivateRoute roles={['Donor']}><DonorDashboard /></PrivateRoute>} />
          <Route path="/hospital" element={<PrivateRoute roles={['Hospital']}><HospitalDashboard /></PrivateRoute>} />
          <Route path="/camps" element={<Camps />} />
          <Route path="/camps/:id" element={<CampDetail />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App