
import { useEffect, useState } from 'react'
import NearBy from '../components/hospital/NearbyHospitalsList'
import { useAuth } from '../context/AuthContext'

const DonorDashboard = () => {
  const { user } = useAuth()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

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
        } catch (err) {
          console.error('Failed to update location:', err)
        }
      }, () => { }, { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 })
      return () => navigator.geolocation.clearWatch(watchId)
    }
  }, [])

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md border-l-4 border-red-600">
        <div className="text-center">
          <span className="text-6xl mb-4 block">⚠️</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    </div>
  )

  if (!data) return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent"></div>
        <p className="mt-4 text-gray-600 text-lg">Loading your dashboard...</p>
      </div>
    </div>
  )

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
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-red-600">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <span className="text-red-600">❤️</span> Donor Dashboard
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Welcome back, {data.donor?.name || user.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-red-50 to-white border-2 border-red-100 shadow-lg rounded-xl p-6 hover:shadow-xl hover:border-red-300 transition-all transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-gray-600 font-semibold">Total Donations</h2>
              <span className="text-3xl">💉</span>
            </div>
            <p className="text-4xl font-bold text-red-600">{data.totalDonations}</p>
            <p className="text-sm text-gray-500 mt-1">Lives saved</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-blue-100 shadow-lg rounded-xl p-6 hover:shadow-xl hover:border-blue-300 transition-all transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-gray-600 font-semibold">Days Since Last</h2>
              <span className="text-3xl">📅</span>
            </div>
            <p className="text-4xl font-bold text-blue-600">{data.daysSinceLastDonation}</p>
            <p className="text-sm text-gray-500 mt-1">Days elapsed</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-white border-2 border-green-100 shadow-lg rounded-xl p-6 hover:shadow-xl hover:border-green-300 transition-all transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-gray-600 font-semibold">Eligibility Status</h2>
              <span className="text-3xl">{data.isEligible ? '✅' : '❌'}</span>
            </div>
            <p className={`text-4xl font-bold ${data.isEligible ? 'text-green-600' : 'text-red-600'}`}>
              {data.isEligible ? 'Eligible' : 'Not Yet'}
            </p>
            <p className="text-sm text-gray-500 mt-1">{data.isEligible ? 'Ready to donate' : 'Please wait'}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">

            {/* Emergency Requests */}
            <section className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🚨</span>
                <h2 className="text-2xl font-bold text-gray-800">Emergency Requests</h2>
              </div>
              {(!data.requests || data.requests.length === 0) ? (
                <div className="text-center py-8 text-gray-500">
                  <span className="text-4xl mb-2 block">✅</span>
                  <p>No active emergency requests</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {data.requests.map(r => (
                    <li key={r._id} className="bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-red-500 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="space-y-2 mb-4">
                        <p className="text-gray-700">
                          <span className="font-semibold text-gray-900">Blood Needed:</span>{' '}
                          <span className="text-red-600 font-bold text-xl">{r.emergency?.bloodGroup}</span>
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold text-gray-900">Units Required:</span> {r.emergency?.unitsNeeded}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold text-gray-900">Message:</span> {r.message || 'Urgent blood requirement'}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold text-gray-900">Hospital:</span> {r.emergency?.hospital?.name}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold text-gray-900">Status:</span>{' '}
                          <span className={`font-bold ${r.status === 'Accepted' ? 'text-green-600' :
                            r.status === 'Rejected' ? 'text-red-600' :
                              'text-yellow-600'
                            }`}>
                            {r.status}
                          </span>
                        </p>
                      </div>
                      {(r.status === 'Pending' || r.status === 'Sent') && (
                        <div className="flex gap-3">
                          <button
                            onClick={() => actOnRequest(r._id, 'accept')}
                            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                          >
                            ✅ Accept Request
                          </button>
                          <button
                            onClick={() => actOnRequest(r._id, 'reject')}
                            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all"
                          >
                            ❌ Reject
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Donation History */}
            <section className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">📜</span>
                <h2 className="text-2xl font-bold text-gray-800">Donation History</h2>
              </div>
              {(!data.donation || !data.donation.donationHistory?.length) ? (
                <div className="text-center py-8 text-gray-500">
                  <span className="text-4xl mb-2 block">📋</span>
                  <p>No donation history yet</p>
                  <p className="text-sm mt-2">Your donations will appear here</p>
                </div>
              ) : (
                <ul className="space-y-3">
                  {data.donation.donationHistory.map((h, i) => (
                    <li key={i} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
                      <p className="font-semibold text-gray-900">{h.hospital?.name}</p>
                      <p className="text-gray-700 mt-1">
                        <span className="font-semibold">{h.units}</span> units donated
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {h.date ? new Date(h.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : 'Date not available'}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* Blood Camps */}
            <section className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">⛺</span>
                <h2 className="text-2xl font-bold text-gray-800">Upcoming Blood Camps</h2>
              </div>
              {(!data.camps || data.camps.length === 0) ? (
                <div className="text-center py-8 text-gray-500">
                  <span className="text-4xl mb-2 block">🏕️</span>
                  <p>No upcoming blood camps</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {data.camps.slice(0, 5).map(c => (
                    <li key={c._id} className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                      <p className="font-bold text-gray-900 text-lg mb-2">{c.name}</p>
                      <p className="text-gray-700 mb-1">
                        <span className="font-semibold">Organizer:</span> {c.organizer}
                      </p>
                      <p className="text-gray-700 mb-1">
                        <span className="font-semibold">📅 Date:</span>{' '}
                        {new Date(c.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-gray-700 mb-1">
                        <span className="font-semibold">🕐 Time:</span> {c.timeFrom || '10:00 AM'} - {c.timeTo || '4:00 PM'}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">📍 Location:</span> {c.address}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
            </section>

          </div>

          {/* Right Column */}
          <div className="space-y-8">

            {/* Profile Card */}
            <section className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">👤</span>
                <h2 className="text-2xl font-bold text-gray-800">Your Profile</h2>
              </div>
              <div className="space-y-4">
                <div className="pb-3 border-b border-gray-200">
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="text-lg font-semibold text-gray-900">{data.donor?.name}</p>
                </div>
                <div className="pb-3 border-b border-gray-200">
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="text-lg font-semibold text-gray-900">{data.donor?.email}</p>
                </div>
                <div className="pb-3 border-b border-gray-200">
                  <p className="text-sm text-gray-500">Mobile Number</p>
                  <p className="text-lg font-semibold text-gray-900">{data.donor?.mobile}</p>
                </div>
                <div className="pb-3 border-b border-gray-200">
                  <p className="text-sm text-gray-500">Blood Group</p>
                  <p className="text-2xl font-bold text-red-600">{data.donor?.bloodGroup}</p>
                </div>
                <div className="pb-3">
                  <p className="text-sm text-gray-500">Active Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${data.donor?.active
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                      }`}>
                      {data.donor?.active ? '✅ Active' : '❌ Inactive'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={toggleActive}
                  className={`w-full py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105 ${data.donor?.active
                    ? 'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white'
                    : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
                    }`}
                >
                  {data.donor?.active ? 'Deactivate Profile' : 'Activate Profile'}
                </button>
              </div>

            </section>
            <NearBy />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonorDashboard