import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Welcome to Blood Share</h1>
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/signup">Signup</Link></li>
        <li><Link to="/register-donor">Become a Donor</Link></li>
        <li><Link to="/register-hospital">Register as Hospital</Link></li>
      </ul>
    </div>
  )
}


