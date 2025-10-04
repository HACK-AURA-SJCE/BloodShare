import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const DonorDashboard = () => {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  // Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:1000/donor/donordash', {
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

  // Geolocation tracking
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(async (pos) => {
        try {
          await fetch('http://localhost:1000/donor/update-location', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'x-client': 'React' },
            credentials: 'include',
            body: JSON.stringify({ latitude: pos.coords.latitude, longitude: pos.coords.longitude })
          })
        } catch { }
      }, () => { }, { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 })
      return () => navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  if (error) return <div className="p-6 text-red-500">{error}</div>
  if (!data) return <div className="p-6">Loading...</div>

  // Toggle donor active status
  const toggleActive = async () => {
    try {
      const res = await fetch('/api/donor/toggle-active', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-client': 'React' },
        credentials: 'include'
      })
      const json = await res.json()
      setData(prev => ({ ...prev, donor: { ...prev.donor, active: json.active } }))
    } catch {
      alert('Failed to toggle active status')
    }
  }

  // Accept/reject blood requests
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
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Donor Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {data.donor?.name || user.name}!</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-gray-600">Total Donations</h2>
            <p className="text-2xl font-bold">{data.totalDonations}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-gray-600">Days Since Last Donation</h2>
            <p className="text-2xl font-bold">{data.daysSinceLastDonation}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-gray-600">Eligible</h2>
            <p className="text-2xl font-bold">{data.isEligible ? '✅ Yes' : '❌ No'}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">

          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Emergency Requests */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">🚨 Emergency Requests</h2>
              {(!data.requests || data.requests.length === 0) ? (
                <p>No active requests.</p>
              ) : (
                <ul className="space-y-4">
                  {data.requests.map(r => (
                    <li key={r._id} className="p-4 border rounded bg-orange-50">
                      <p><strong>Blood Needed:</strong> <span className="text-red-600 font-bold">{r.emergency?.bloodGroup}</span></p>
                      <p><strong>Units:</strong> {r.emergency?.unitsNeeded}</p>
                      <p><strong>Message:</strong> {r.message || 'Urgent blood requirement'}</p>
                      <p><strong>Hospital:</strong> {r.emergency?.hospital?.name}</p>
                      <p><strong>Status:</strong> <span className={
                        r.status === 'Accepted' ? 'text-green-600' : r.status === 'Rejected' ? 'text-red-600' : 'text-yellow-600'
                      }>{r.status}</span></p>
                      {(r.status === 'Pending' || r.status === 'Sent') && (
                        <div className="mt-3 space-x-3">
                          <button onClick={() => actOnRequest(r._id, 'accept')} className="px-4 py-2 bg-green-500 text-white rounded">✅ Accept</button>
                          <button onClick={() => actOnRequest(r._id, 'reject')} className="px-4 py-2 bg-red-500 text-white rounded">❌ Reject</button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Donation History */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Donation History</h2>
              {(!data.donation || !data.donation.donationHistory?.length) ? (
                <p>No donation history.</p>
              ) : (
                <ul className="list-disc pl-6">
                  {data.donation.donationHistory.map((h, i) => (
                    <li key={i}>{h.hospital?.name} - {h.units} units on {h.date ? new Date(h.date).toDateString() : ''}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Blood Camps */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Blood Camps</h2>
              {(!data.camps || data.camps.length === 0) ? (
                <p>No camps available.</p>
              ) : (
                <ul className="space-y-3">
                  {data.camps.slice(0, 5).map(c => (
                    <li key={c._id} className="p-3 border rounded">
                      <p><strong>{c.name}</strong> - {c.organizer}</p>
                      <p>{new Date(c.date).toDateString()} ({c.timeFrom || '10:00 AM'} - {c.timeTo || '4:00 PM'})</p>
                      <p>{c.address}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>

          </div>

          {/* Right Column */}
          <div className="space-y-6">

            {/* Profile */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Profile</h2>
              <p><strong>Name:</strong> {data.donor?.name}</p>
              <p><strong>Email:</strong> {data.donor?.email}</p>
              <p><strong>Mobile:</strong> {data.donor?.mobile}</p>
              <p><strong>Blood Group:</strong> {data.donor?.bloodGroup}</p>
              <p><strong>Active:</strong> {data.donor?.active ? '✅ Yes' : '❌ No'}</p>
              <button
                onClick={toggleActive}
                className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded"
              >
                {data.donor?.active ? 'Deactivate' : 'Activate'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default DonorDashboard
