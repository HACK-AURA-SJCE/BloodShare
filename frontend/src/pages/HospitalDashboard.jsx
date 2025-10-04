import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'

export default function HospitalDashboard() {
  const [data, setData] = useState(null)
  const [showStockForm, setShowStockForm] = useState(false)
  const [showEmergencyForm, setShowEmergencyForm] = useState(false)
  const [showCampForm, setShowCampForm] = useState(false)
  const [showDonationForm, setShowDonationForm] = useState(false)
  const [stockForm, setStockForm] = useState({ bloodGroup: 'A+', units: '0' })
  const [emergencyForm, setEmergencyForm] = useState({ bloodGroup: 'A+', unitsNeeded: '1', msg: '' })
  const [campForm, setCampForm] = useState({ name: '', organizer: '', address: '', date: '', timeFrom: '', timeTo: '' })
  const [donationForm, setDonationForm] = useState({ aadhar: '', bloodGroup: 'A+', units: '1' })
  const [campPos, setCampPos] = useState(null)

  // Load data
  useEffect(() => {
    const load = async () => {
      const res = await fetch('http://localhost:1000/hospital/hospitaldash', {
        headers: { 'x-client': 'React' },
        credentials: 'include'
      })
      const json = await res.json()
      setData(json)
    }
    load()
  }, [])

  // Actions
  const updateStock = async (e) => {
    e.preventDefault()
    await fetch('http://localhost:1000/hospital/stock/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-client': 'React' },
      credentials: 'include',
      body: JSON.stringify(stockForm)
    })
    reload()
    setShowStockForm(false)
  }

  const createEmergency = async (e) => {
    e.preventDefault()
    await fetch('http://localhost:1000/hospital/emergency', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-client': 'React' },
      credentials: 'include',
      body: JSON.stringify(emergencyForm)
    })
    reload()
    setShowEmergencyForm(false)
  }

  const createCamp = async (e) => {
    e.preventDefault()
    if (!campPos) return alert('Pick a location on map')
    await fetch('http://localhost:1000/hospital/bloodcamp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-client': 'React' },
      credentials: 'include',
      body: JSON.stringify({ ...campForm, latitude: String(campPos[0]), longitude: String(campPos[1]) })
    })
    reload()
    setShowCampForm(false)
  }

  const addDonation = async (e) => {
    e.preventDefault()
    await fetch('http://localhost:1000/hospital/donations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-client': 'React' },
      credentials: 'include',
      body: JSON.stringify(donationForm)
    })
    reload()
    setShowDonationForm(false)
  }

  const actOnRequest = async (id, action) => {
    await fetch(`http://localhost:1000/hospital/notifications/${id}/action`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-client': 'React' },
      credentials: 'include',
      body: JSON.stringify({ action })
    })
    reload()
  }

  const reload = async () => {
    const res = await fetch('http://localhost:1000/hospital/hospitaldash', { headers: { 'x-client': 'React' }, credentials: 'include' })
    setData(await res.json())
  }

  if (!data) return <div className="p-8 text-center">Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900">Hospital Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage blood inventory and connect with donors</p>

        {/* Blood Stocks */}
        <section className="mt-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Blood Stocks</h2>
          {data.stocks?.length ? (
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.stocks.map(s => (
                <li key={s.bloodGroup} className="border rounded p-3 text-center">
                  <div className="font-bold">{s.bloodGroup}</div>
                  <div>{s.units} units</div>
                  <div className="text-sm text-gray-500">Updated: {s.lastUpdated ? new Date(s.lastUpdated).toDateString() : 'N/A'}</div>
                </li>
              ))}
            </ul>
          ) : <p>No stocks available</p>}
          <button onClick={() => setShowStockForm(!showStockForm)} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
            Update Stock
          </button>
          {showStockForm && (
            <form onSubmit={updateStock} className="mt-4 grid gap-3">
              <input placeholder="Blood Group" value={stockForm.bloodGroup} onChange={e => setStockForm({ ...stockForm, bloodGroup: e.target.value })} className="border p-2 rounded" />
              <input placeholder="Units" value={stockForm.units} onChange={e => setStockForm({ ...stockForm, units: e.target.value })} className="border p-2 rounded" />
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
            </form>
          )}
        </section>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Left side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Emergencies */}
            <section className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Emergency Requests</h2>
              {data.sentRequests?.length ? data.sentRequests.map(sr => (
                <div key={sr._id} className="border rounded p-4 mb-4">
                  <h3 className="font-bold text-red-600">🆘 {sr.bloodGroup} ({sr.unitsNeeded} units)</h3>
                  <p>{sr.msg}</p>
                </div>
              )) : <p>No emergencies created</p>}
              <button onClick={() => setShowEmergencyForm(!showEmergencyForm)} className="mt-3 bg-red-600 text-white px-4 py-2 rounded">
                Create Emergency
              </button>
              {showEmergencyForm && (
                <form onSubmit={createEmergency} className="mt-4 grid gap-3">
                  <input placeholder="Blood Group" value={emergencyForm.bloodGroup} onChange={e => setEmergencyForm({ ...emergencyForm, bloodGroup: e.target.value })} className="border p-2 rounded" />
                  <input placeholder="Units Needed" value={emergencyForm.unitsNeeded} onChange={e => setEmergencyForm({ ...emergencyForm, unitsNeeded: e.target.value })} className="border p-2 rounded" />
                  <input placeholder="Message" value={emergencyForm.msg} onChange={e => setEmergencyForm({ ...emergencyForm, msg: e.target.value })} className="border p-2 rounded" />
                  <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
                </form>
              )}
            </section>

            {/* Incoming Requests */}
            <section className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Incoming Requests</h2>
              {data.incomingRequests?.length ? data.incomingRequests.map(ir => (
                <div key={ir._id} className="border rounded p-4 mb-3">
                  <p><strong>Hospital:</strong> {ir.emergency?.hospital?.name}</p>
                  <p><strong>Blood Group:</strong> {ir.emergency?.bloodGroup}</p>
                  <p><strong>Units:</strong> {ir.emergency?.unitsNeeded}</p>
                  <div className="mt-2">
                    <button onClick={() => actOnRequest(ir._id, 'accept')} className="bg-green-600 text-white px-3 py-1 rounded mr-2">Accept</button>
                    <button onClick={() => actOnRequest(ir._id, 'reject')} className="bg-gray-400 text-white px-3 py-1 rounded">Reject</button>
                  </div>
                </div>
              )) : <p>No incoming requests</p>}
            </section>

            {/* Donations */}
            <section className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Donations</h2>
              {data.donations?.length ? data.donations.slice(0, 5).map(d => (
                <div key={d._id} className="border rounded p-4 mb-3">
                  <p><strong>Aadhar:</strong> {d.aadhar}</p>
                  <p><strong>Total Donations:</strong> {d.totalDonations}</p>
                </div>
              )) : <p>No donations recorded</p>}
              <button onClick={() => setShowDonationForm(!showDonationForm)} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">Add Donation</button>
              {showDonationForm && (
                <form onSubmit={addDonation} className="mt-4 grid gap-3">
                  <input placeholder="Aadhar" value={donationForm.aadhar} onChange={e => setDonationForm({ ...donationForm, aadhar: e.target.value })} className="border p-2 rounded" />
                  <input placeholder="Blood Group" value={donationForm.bloodGroup} onChange={e => setDonationForm({ ...donationForm, bloodGroup: e.target.value })} className="border p-2 rounded" />
                  <input placeholder="Units" value={donationForm.units} onChange={e => setDonationForm({ ...donationForm, units: e.target.value })} className="border p-2 rounded" />
                  <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
                </form>
              )}
            </section>
          </div>

          {/* Right side */}
          <div className="space-y-6">
            {/* Camps */}
            <section className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Blood Camps</h2>
              {data.bloodCamps?.length ? data.bloodCamps.slice(0, 5).map(bc => (
                <div key={bc._id} className="border rounded p-4 mb-3">
                  <p><strong>{bc.name}</strong> - {new Date(bc.date).toDateString()}</p>
                  <p>{bc.organizer}</p>
                  <p>{bc.address}</p>
                </div>
              )) : <p>No camps created</p>}
              <button onClick={() => setShowCampForm(!showCampForm)} className="mt-3 bg-purple-600 text-white px-4 py-2 rounded">Create Camp</button>
              {showCampForm && (
                <form onSubmit={createCamp} className="mt-4 grid gap-3">
                  <input placeholder="Name" value={campForm.name} onChange={e => setCampForm({ ...campForm, name: e.target.value })} className="border p-2 rounded" />
                  <input placeholder="Organizer" value={campForm.organizer} onChange={e => setCampForm({ ...campForm, organizer: e.target.value })} className="border p-2 rounded" />
                  <input placeholder="Address" value={campForm.address} onChange={e => setCampForm({ ...campForm, address: e.target.value })} className="border p-2 rounded" />
                  <input type="date" value={campForm.date} onChange={e => setCampForm({ ...campForm, date: e.target.value })} className="border p-2 rounded" />
                  <input type="time" value={campForm.timeFrom} onChange={e => setCampForm({ ...campForm, timeFrom: e.target.value })} className="border p-2 rounded" />
                  <input type="time" value={campForm.timeTo} onChange={e => setCampForm({ ...campForm, timeTo: e.target.value })} className="border p-2 rounded" />
                  <div style={{ height: 200 }} className="mt-3">
                    <MapContainer center={[20, 78]} zoom={4} style={{ height: '100%' }}>
                      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                      {campPos && <Marker position={campPos} />}
                      <ClickToPick onPick={(lat, lng) => setCampPos([lat, lng])} />
                    </MapContainer>
                  </div>
                  <button type="submit" disabled={!campPos} className="bg-green-600 text-white px-4 py-2 rounded mt-2">Save</button>
                </form>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

function ClickToPick({ onPick }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng)
    }
  })
  return null
}
