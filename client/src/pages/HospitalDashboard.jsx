import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

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

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/hospital/hospitaldash', {
        headers: { 'x-client': 'React' },
        credentials: 'include'
      })
      const json = await res.json()
      setData(json)
    }
    load()
  }, [])

  const updateStock = async (e) => {
    e.preventDefault()
    try {
      await fetch('/api/hospital/stock/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-client': 'React' },
        credentials: 'include',
        body: JSON.stringify(stockForm)
      })
      setShowStockForm(false)
      setStockForm({ bloodGroup: 'A+', units: '0' })
      // reload data
      const res = await fetch('/api/hospital/hospitaldash', { headers: { 'x-client': 'React' }, credentials: 'include' })
      setData(await res.json())
    } catch { alert('Failed to update stock') }
  }

  const createEmergency = async (e) => {
    e.preventDefault()
    try {
      await fetch('/api/hospital/emergency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-client': 'React' },
        credentials: 'include',
        body: JSON.stringify(emergencyForm)
      })
      setShowEmergencyForm(false)
      setEmergencyForm({ bloodGroup: 'A+', unitsNeeded: '1', msg: '' })
      // reload data
      const res = await fetch('/api/hospital/hospitaldash', { headers: { 'x-client': 'React' }, credentials: 'include' })
      setData(await res.json())
    } catch { alert('Failed to create emergency') }
  }

  const createCamp = async (e) => {
    e.preventDefault()
    if (!campPos) return alert('Please select a location on the map')
    try {
      await fetch('/api/hospital/bloodcamp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-client': 'React' },
        credentials: 'include',
        body: JSON.stringify({ ...campForm, latitude: String(campPos[0]), longitude: String(campPos[1]) })
      })
      setShowCampForm(false)
      setCampForm({ name: '', organizer: '', address: '', date: '', timeFrom: '', timeTo: '' })
      setCampPos(null)
      // reload data
      const res = await fetch('/api/hospital/hospitaldash', { headers: { 'x-client': 'React' }, credentials: 'include' })
      setData(await res.json())
    } catch { alert('Failed to create camp') }
  }

  const addDonation = async (e) => {
    e.preventDefault()
    try {
      await fetch('/api/hospital/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-client': 'React' },
        credentials: 'include',
        body: JSON.stringify(donationForm)
      })
      setShowDonationForm(false)
      setDonationForm({ aadhar: '', bloodGroup: 'A+', units: '1' })
      // reload data
      const res = await fetch('/api/hospital/hospitaldash', { headers: { 'x-client': 'React' }, credentials: 'include' })
      setData(await res.json())
    } catch { alert('Failed to add donation') }
  }

  const actOnRequest = async (id, action) => {
    try {
      await fetch(`/api/hospital/notifications/${id}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-client': 'React' },
        credentials: 'include',
        body: JSON.stringify({ action })
      })
      setData(prev => ({ ...prev, incomingRequests: prev.incomingRequests.filter(r => r._id !== id) }))
    } catch { alert('Failed to process request') }
  }

  if (!data) return <div>Loading...</div>

  return (
    <div style={{ padding: 24 }}>
      <h1>Hospital Dashboard</h1>

      <h2>Blood Stocks</h2>
      {(!data.stocks || data.stocks.length === 0) ? (
        <p>No stocks available.</p>
      ) : (
        <ul>
          {data.stocks.map(s => (
            <li key={s.bloodGroup}>
              <strong>{s.bloodGroup}</strong>: {s.units} units (Last updated: {s.lastUpdated ? new Date(s.lastUpdated).toDateString() : 'N/A'})
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => setShowStockForm(!showStockForm)}>Update Stock</button>
      {showStockForm && (
        <form onSubmit={updateStock} style={{ marginTop: 12, padding: 12, border: '1px solid #ccc' }}>
          <div>
            <label>Blood Group</label>
            <input value={stockForm.bloodGroup} onChange={(e) => setStockForm({ ...stockForm, bloodGroup: e.target.value })} />
          </div>
          <div>
            <label>Units</label>
            <input value={stockForm.units} onChange={(e) => setStockForm({ ...stockForm, units: e.target.value })} />
          </div>
          <button type="submit">Update</button>
        </form>
      )}

      <h2>📤 Sent Requests</h2>
      {(!data.sentRequests || data.sentRequests.length === 0) ? (
        <p>No sent requests.</p>
      ) : (
        <div>
          {data.sentRequests.map(sr => (
            <div key={sr._id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#d32f2f' }}>🆘 {sr.bloodGroup} (Units: {sr.unitsNeeded})</h3>
              <p><strong>Created At:</strong> {sr.createdAt ? new Date(sr.createdAt).toDateString() : 'N/A'}</p>
              <p><strong>Message:</strong> {sr.msg || 'Urgent blood requirement'}</p>
              <h4>Notifications:</h4>
              {sr.notifications && sr.notifications.length > 0 ? (
                <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
                  {sr.notifications.map((n, idx) => (
                    <li key={idx} style={{ marginBottom: '5px' }}>
                      <strong>Recipient:</strong> {n.recipientType}
                      {n.recipientId && n.recipientId.name && ` - ${n.recipientId.name}`}
                      | <strong>Status:</strong> <span style={{ 
                        color: n.status === 'Accepted' ? 'green' : n.status === 'Rejected' ? 'red' : 'orange' 
                      }}>{n.status}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No notifications sent.</p>
              )}
            </div>
          ))}
        </div>
      )}

      <h2>Incoming Requests</h2>
      <p>Debug: {data.incomingRequests?.length || 0} requests found</p>
      {(!data.incomingRequests || data.incomingRequests.length === 0) ? (
        <p>No incoming requests. (These are notifications from other hospitals within 5km when they create emergencies)</p>
      ) : (
        <ul>
          {data.incomingRequests.map(ir => (
            <li key={ir._id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
              <div><strong>From Hospital:</strong> {ir.emergency?.hospital?.name}</div>
              <div><strong>Blood Group:</strong> {ir.emergency?.bloodGroup}</div>
              <div><strong>Units Needed:</strong> {ir.emergency?.unitsNeeded}</div>
              <div><strong>Message:</strong> {ir.message || 'Emergency blood request'}</div>
              <div><strong>Status:</strong> {ir.status}</div>
              <div style={{ marginTop: '10px' }}>
                <button onClick={() => actOnRequest(ir._id, 'accept')} style={{ marginRight: '10px', padding: '5px 10px' }}>Accept</button>
                <button onClick={() => actOnRequest(ir._id, 'reject')} style={{ padding: '5px 10px' }}>Reject</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <h2>Donations</h2>
      {(!data.donations || data.donations.length === 0) ? (
        <p>No donations recorded.</p>
      ) : (
        <div>
          <p>Showing {Math.min(data.donations.length, 5)} of {data.donations.length} donations</p>
          <ul>
            {data.donations.slice(0, 5).map(d => (
              <li key={d._id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <div><strong>Aadhar:</strong> {d.aadhar}</div>
                <div><strong>Total Donations:</strong> {d.totalDonations}</div>
                {d.donor && <div><strong>Donor:</strong> {d.donor.name}</div>}
                <div><strong>Last Donation:</strong> {d.lastDonationDate ? new Date(d.lastDonationDate).toDateString() : 'N/A'}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button onClick={() => setShowDonationForm(!showDonationForm)}>Add Donation</button>
      {showDonationForm && (
        <form onSubmit={addDonation} style={{ marginTop: 12, padding: 12, border: '1px solid #ccc' }}>
          <div>
            <label>Aadhar</label>
            <input value={donationForm.aadhar} onChange={(e) => setDonationForm({ ...donationForm, aadhar: e.target.value })} />
          </div>
          <div>
            <label>Blood Group</label>
            <input value={donationForm.bloodGroup} onChange={(e) => setDonationForm({ ...donationForm, bloodGroup: e.target.value })} />
          </div>
          <div>
            <label>Units</label>
            <input value={donationForm.units} onChange={(e) => setDonationForm({ ...donationForm, units: e.target.value })} />
          </div>
          <button type="submit">Add</button>
        </form>
      )}

      <h2>Blood Camps</h2>
      {(!data.bloodCamps || data.bloodCamps.length === 0) ? (
        <p>No blood camps created.</p>
      ) : (
        <div>
          <p>Showing {Math.min(data.bloodCamps.length, 5)} of {data.bloodCamps.length} camps</p>
          <ul>
            {data.bloodCamps.slice(0, 5).map(bc => {
              const campDate = new Date(bc.date);
              const timeFrom = bc.timeFrom || '10:00 AM';
              const timeTo = bc.timeTo || '04:00 PM';
              
              return (
                <li key={bc._id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                  <div><strong>Camp Name:</strong> {bc.name}</div>
                  <div><strong>Organizer:</strong> {bc.organizer}</div>
                  <div><strong>Date:</strong> {campDate.toDateString()}</div>
                  <div><strong>Time:</strong> {timeFrom} - {timeTo}</div>
                  <div><strong>Address:</strong> {bc.address}</div>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <h2>Actions</h2>
      <button onClick={() => setShowEmergencyForm(!showEmergencyForm)}>Create Emergency</button>
      <button onClick={() => setShowCampForm(!showCampForm)}>Create Blood Camp</button>

      {showEmergencyForm && (
        <form onSubmit={createEmergency} style={{ marginTop: 12, padding: 12, border: '1px solid #ccc' }}>
          <div>
            <label>Blood Group</label>
            <input value={emergencyForm.bloodGroup} onChange={(e) => setEmergencyForm({ ...emergencyForm, bloodGroup: e.target.value })} />
          </div>
          <div>
            <label>Units Needed</label>
            <input value={emergencyForm.unitsNeeded} onChange={(e) => setEmergencyForm({ ...emergencyForm, unitsNeeded: e.target.value })} />
          </div>
          <div>
            <label>Message</label>
            <input value={emergencyForm.msg} onChange={(e) => setEmergencyForm({ ...emergencyForm, msg: e.target.value })} />
          </div>
          <button type="submit">Create</button>
        </form>
      )}

      {showCampForm && (
        <form onSubmit={createCamp} style={{ marginTop: 12, padding: 12, border: '1px solid #ccc' }}>
          <div>
            <label>Name</label>
            <input value={campForm.name} onChange={(e) => setCampForm({ ...campForm, name: e.target.value })} />
          </div>
          <div>
            <label>Organizer</label>
            <input value={campForm.organizer} onChange={(e) => setCampForm({ ...campForm, organizer: e.target.value })} />
          </div>
          <div>
            <label>Address</label>
            <input value={campForm.address} onChange={(e) => setCampForm({ ...campForm, address: e.target.value })} />
          </div>
          <div>
            <label>Date</label>
            <input type="date" value={campForm.date} onChange={(e) => setCampForm({ ...campForm, date: e.target.value })} />
          </div>
          <div>
            <label>Time From</label>
            <input type="time" value={campForm.timeFrom} onChange={(e) => setCampForm({ ...campForm, timeFrom: e.target.value })} />
          </div>
          <div>
            <label>Time To</label>
            <input type="time" value={campForm.timeTo} onChange={(e) => setCampForm({ ...campForm, timeTo: e.target.value })} />
          </div>
          <div>
            <label>Pick Location</label>
            <div style={{ height: 300, marginTop: 8 }}>
              <MapContainer center={[20, 78]} zoom={13} style={{ height: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[20, 78]} />
                {campPos && <Marker position={campPos} />}
                <ClickToPick onPick={(lat, lng) => setCampPos([lat, lng])} />
              </MapContainer>
            </div>
          </div>
          <button type="submit" disabled={!campPos}>Create</button>
        </form>
      )}
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


