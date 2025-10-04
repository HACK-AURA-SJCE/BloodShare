import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function CampDetail() {
  const { id } = useParams()
  const [camp, setCamp] = useState(null)

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/camps/${id}`, {
        headers: { 'x-client': 'React' },
        credentials: 'include'
      })
      const json = await res.json()
      setCamp(json.camp)
    }
    load()
  }, [id])

  if (!camp) return <div>Loading...</div>

  return (
    <div style={{ padding: 24 }}>
      <h2>{camp.name}</h2>
      <p>{camp.address}</p>
      <p>{new Date(camp.date).toLocaleDateString()}</p>
    </div>
  )
}


