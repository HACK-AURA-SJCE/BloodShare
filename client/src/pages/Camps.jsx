import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Camps() {
  const [camps, setCamps] = useState([])

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/camps', {
        headers: { 'x-client': 'React' },
        credentials: 'include'
      })
      const json = await res.json()
      setCamps(json.camps || [])
    }
    load()
  }, [])

  return (
    <div style={{ padding: 24 }}>
      <h2>Blood Camps</h2>
      <ul>
        {camps.map(c => (
          <li key={c._id}>
            <Link to={`/camps/${c._id}`}>{c.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}


