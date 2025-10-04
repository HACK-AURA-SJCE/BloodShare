import { useEffect, useState } from 'react'
import { useAuth } from '../auth/AuthContext'

export default function DonorDashboard() {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/donor/donordash', {
          headers: { 'x-client': 'React' },
          credentials: 'include'
        })
        if (!res.ok) {
          const isJson = (res.headers.get('content-type') || '').includes('application/json')
          if (isJson) {
            const j = await res.json()
            throw new Error(j.error || 'Failed to load dashboard')
          }
          throw new Error('Failed to load dashboard')
        }
        const json = await res.json()
        setData(json)
      } catch (e) {
        setError(e.message || 'Unexpected error')
      }
    }
    fetchData()
  }, [])

  // background location watcher (declare before any early returns to keep hook order stable)
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(async (pos) => {
        try {
          await fetch('/api/donor/update-location', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-client': 'React' },
            credentials: 'include',
            body: JSON.stringify({ latitude: pos.coords.latitude, longitude: pos.coords.longitude })
          })
        } catch {}
      }, () => {}, { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 })
      return () => navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  if (error) return <div style={{ padding: 24, color: 'red' }}>{error}</div>
  if (!data) return <div style={{ padding: 24 }}>Loading...</div>

  const toggleActive = async () => {
    try {
      const res = await fetch('/api/donor/toggle-active', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-client': 'React' },
        credentials: 'include'
      })
      const json = await res.json()
      setData(prev => ({ ...prev, donor: { ...prev.donor, active: json.active } }))
    } catch (e) {
      alert('Failed to toggle active status')
    }
  }

  const actOnRequest = async (id, action) => {
    try {
      await fetch(`/api/donor/notifications/${id}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-client': 'React' },
        credentials: 'include',
        body: JSON.stringify({ action })
      })
      setData(prev => ({ ...prev, requests: prev.requests.filter(r => r._id !== id) }))
    } catch {
      alert('Failed to process request')
    }
  }

  

  return (
    <div style={{ padding: 24 }}>
      <h1>Donor Dashboard</h1>

      <h2>Profile</h2>
      <p><strong>Name:</strong> {data.donor?.name}</p>
      <p><strong>Email:</strong> {data.donor?.email}</p>
      <p><strong>Mobile:</strong> {data.donor?.mobile}</p>
      <p><strong>Blood Group:</strong> {data.donor?.bloodGroup}</p>
      <p><strong>Active:</strong> <span>{data.donor?.active ? 'Yes' : 'No'}</span></p>
      <button onClick={toggleActive}>{data.donor?.active ? 'Deactivate' : 'Activate'}</button>

      <h2>Eligibility</h2>
      <p><strong>Total Donations:</strong> {data.totalDonations}</p>
      <p><strong>Days Since Last Donation:</strong> {data.daysSinceLastDonation}</p>
      <p><strong>Eligible to Donate:</strong> {data.isEligible ? 'Yes' : 'No'}</p>

      <h2>🚨 Emergency Blood Requests</h2>
      {(!data.requests || data.requests.length === 0) ? (
        <p>No active requests.</p>
      ) : (
        <ul>
          {data.requests.map(r => (
            <li key={r._id} style={{ marginBottom: '15px', padding: '15px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#fff3e0' }}>
              <div style={{ marginBottom: '8px' }}>
                <strong>Blood Group Needed:</strong> <span style={{ color: '#d32f2f', fontWeight: 'bold' }}>{r.emergency?.bloodGroup}</span>
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong>Units:</strong> {r.emergency?.unitsNeeded}
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong>Message:</strong> {r.message || r.emergency?.msg || 'Urgent blood requirement in your area'}
              </div>
              <div style={{ marginBottom: '8px' }}>
                <strong>Hospital:</strong> {r.emergency?.hospital?.name}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <strong>Status:</strong> <span style={{ 
                  color: r.status === 'Accepted' ? 'green' : r.status === 'Rejected' ? 'red' : 'orange',
                  fontWeight: 'bold'
                }}>{r.status}</span>
              </div>
              {(r.status === 'Pending' || r.status === 'Sent') && (
                <div style={{ marginTop: '10px' }}>
                  <button 
                    onClick={() => actOnRequest(r._id, 'accept')} 
                    style={{ 
                      marginRight: '10px', 
                      padding: '8px 15px', 
                      backgroundColor: '#4caf50', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    ✅ Accept
                  </button>
                  <button 
                    onClick={() => actOnRequest(r._id, 'reject')} 
                    style={{ 
                      padding: '8px 15px', 
                      backgroundColor: '#f44336', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    ❌ Reject
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <h2>History</h2>
      {(!data.donation || !data.donation.donationHistory || (data.donation.donationHistory || []).length === 0) ? (
        <p>No donation history.</p>
      ) : (
        <ul>
          {(data.donation.donationHistory || []).map((h, idx) => (
            <li key={idx}><strong>{h.hospital?.name}</strong> - {h.units} units on {h.date ? new Date(h.date).toDateString() : ''}</li>
          ))}
        </ul>
      )}

      <h2>Blood Camps</h2>
      {(!data.camps || data.camps.length === 0) ? (
        <p>No camps available.</p>
      ) : (
        <div>
          <p>Showing {Math.min(data.camps.length, 5)} of {data.camps.length} camps</p>
          <ul>
            {data.camps.slice(0, 5).map(c => {
              const randomDistance = (Math.random() * 5).toFixed(1); // Random distance between 0-5km
              const campDate = new Date(c.date);
              const timeFrom = c.timeFrom || '10:00 AM';
              const timeTo = c.timeTo || '04:00 PM';
              
              return (
                <li key={c._id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                  <div><strong>Camp Name:</strong> {c.name}</div>
                  <div><strong>Organizer:</strong> {c.organizer}</div>
                  <div><strong>Date:</strong> {campDate.toDateString()}</div>
                  <div><strong>Time:</strong> {timeFrom} - {timeTo}</div>
                  <div><strong>Address:</strong> {c.address}</div>
                  <div><strong>Distance:</strong> {randomDistance} km away</div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  )
}


