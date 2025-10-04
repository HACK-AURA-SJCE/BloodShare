// import 'leaflet/dist/leaflet.css'
// import { useEffect, useState } from 'react'
// import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'

// export default function HospitalDashboard() {
//   const [data, setData] = useState(null)
//   const [showStockForm, setShowStockForm] = useState(false)
//   const [showEmergencyForm, setShowEmergencyForm] = useState(false)
//   const [showCampForm, setShowCampForm] = useState(false)
//   const [showDonationForm, setShowDonationForm] = useState(false)
//   const [stockForm, setStockForm] = useState({ bloodGroup: 'A+', units: '0' })
//   const [emergencyForm, setEmergencyForm] = useState({ bloodGroup: 'A+', unitsNeeded: '1', msg: '' })
//   const [campForm, setCampForm] = useState({ name: '', organizer: '', address: '', date: '', timeFrom: '', timeTo: '' })
//   const [donationForm, setDonationForm] = useState({ aadhar: '', bloodGroup: 'A+', units: '1' })
//   const [campPos, setCampPos] = useState(null)

//   // Load data
//   useEffect(() => {
//     const load = async () => {
//       const res = await fetch('http://localhost:1000/hospital/hospitaldash', {
//         headers: { 'x-client': 'React' },
//         credentials: 'include'
//       })
//       const json = await res.json()
//       setData(json)
//     }
//     load()
//   }, [])

//   // Actions
//   const updateStock = async (e) => {
//     e.preventDefault()
//     await fetch('http://localhost:1000/hospital/stock/update', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', 'x-client': 'React' },
//       credentials: 'include',
//       body: JSON.stringify(stockForm)
//     })
//     reload()
//     setShowStockForm(false)
//   }

//   const createEmergency = async (e) => {
//     e.preventDefault()
//     await fetch('http://localhost:1000/hospital/emergency', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', 'x-client': 'React' },
//       credentials: 'include',
//       body: JSON.stringify(emergencyForm)
//     })
//     reload()
//     setShowEmergencyForm(false)
//   }

//   const createCamp = async (e) => {
//     e.preventDefault()
//     if (!campPos) return alert('Pick a location on map')
//     await fetch('http://localhost:1000/hospital/bloodcamp', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', 'x-client': 'React' },
//       credentials: 'include',
//       body: JSON.stringify({ ...campForm, latitude: String(campPos[0]), longitude: String(campPos[1]) })
//     })
//     reload()
//     setShowCampForm(false)
//   }

//   const addDonation = async (e) => {
//     e.preventDefault()
//     await fetch('http://localhost:1000/hospital/donations', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', 'x-client': 'React' },
//       credentials: 'include',
//       body: JSON.stringify(donationForm)
//     })
//     reload()
//     setShowDonationForm(false)
//   }

//   const actOnRequest = async (id, action) => {
//     await fetch(`http://localhost:1000/hospital/notifications/${id}/action`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', 'x-client': 'React' },
//       credentials: 'include',
//       body: JSON.stringify({ action })
//     })
//     reload()
//   }

//   const reload = async () => {
//     const res = await fetch('http://localhost:1000/hospital/hospitaldash', { headers: { 'x-client': 'React' }, credentials: 'include' })
//     setData(await res.json())
//   }

//   if (!data) return <div className="p-8 text-center">Loading...</div>

//   return (
//     <div className="min-h-screen bg-gray-50 pt-16">
//       <div className="max-w-7xl mx-auto px-6 py-8">
//         {/* Header */}
//         <h1 className="text-3xl font-bold text-gray-900">Hospital Dashboard</h1>
//         <p className="text-gray-600 mt-2">Manage blood inventory and connect with donors</p>

//         {/* Blood Stocks */}
//         <section className="mt-8 bg-white shadow rounded-lg p-6">
//           <h2 className="text-xl font-semibold mb-4">Blood Stocks</h2>
//           {data.stocks?.length ? (
//             <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//               {data.stocks.map(s => (
//                 <li key={s.bloodGroup} className="border rounded p-3 text-center">
//                   <div className="font-bold">{s.bloodGroup}</div>
//                   <div>{s.units} units</div>
//                   <div className="text-sm text-gray-500">Updated: {s.lastUpdated ? new Date(s.lastUpdated).toDateString() : 'N/A'}</div>
//                 </li>
//               ))}
//             </ul>
//           ) : <p>No stocks available</p>}
//           <button onClick={() => setShowStockForm(!showStockForm)} className="mt-4 bg-red-600 text-white px-4 py-2 rounded">
//             Update Stock
//           </button>
//           {showStockForm && (
//             <form onSubmit={updateStock} className="mt-4 grid gap-3">
//               <input placeholder="Blood Group" value={stockForm.bloodGroup} onChange={e => setStockForm({ ...stockForm, bloodGroup: e.target.value })} className="border p-2 rounded" />
//               <input placeholder="Units" value={stockForm.units} onChange={e => setStockForm({ ...stockForm, units: e.target.value })} className="border p-2 rounded" />
//               <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
//             </form>
//           )}
//         </section>

//         {/* Grid Layout */}
//         <div className="grid lg:grid-cols-3 gap-8 mt-8">
//           {/* Left side */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* Emergencies */}
//             <section className="bg-white shadow rounded-lg p-6">
//               <h2 className="text-xl font-semibold mb-4">Emergency Requests</h2>
//               {data.sentRequests?.length ? data.sentRequests.map(sr => (
//                 <div key={sr._id} className="border rounded p-4 mb-4">
//                   <h3 className="font-bold text-red-600">🆘 {sr.bloodGroup} ({sr.unitsNeeded} units)</h3>
//                   <p>{sr.msg}</p>
//                 </div>
//               )) : <p>No emergencies created</p>}
//               <button onClick={() => setShowEmergencyForm(!showEmergencyForm)} className="mt-3 bg-red-600 text-white px-4 py-2 rounded">
//                 Create Emergency
//               </button>
//               {showEmergencyForm && (
//                 <form onSubmit={createEmergency} className="mt-4 grid gap-3">
//                   <input placeholder="Blood Group" value={emergencyForm.bloodGroup} onChange={e => setEmergencyForm({ ...emergencyForm, bloodGroup: e.target.value })} className="border p-2 rounded" />
//                   <input placeholder="Units Needed" value={emergencyForm.unitsNeeded} onChange={e => setEmergencyForm({ ...emergencyForm, unitsNeeded: e.target.value })} className="border p-2 rounded" />
//                   <input placeholder="Message" value={emergencyForm.msg} onChange={e => setEmergencyForm({ ...emergencyForm, msg: e.target.value })} className="border p-2 rounded" />
//                   <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Submit</button>
//                 </form>
//               )}
//             </section>

//             {/* Incoming Requests */}
//             <section className="bg-white shadow rounded-lg p-6">
//               <h2 className="text-xl font-semibold mb-4">Incoming Requests</h2>
//               {data.incomingRequests?.length ? data.incomingRequests.map(ir => (
//                 <div key={ir._id} className="border rounded p-4 mb-3">
//                   <p><strong>Hospital:</strong> {ir.emergency?.hospital?.name}</p>
//                   <p><strong>Blood Group:</strong> {ir.emergency?.bloodGroup}</p>
//                   <p><strong>Units:</strong> {ir.emergency?.unitsNeeded}</p>
//                   <div className="mt-2">
//                     <button onClick={() => actOnRequest(ir._id, 'accept')} className="bg-green-600 text-white px-3 py-1 rounded mr-2">Accept</button>
//                     <button onClick={() => actOnRequest(ir._id, 'reject')} className="bg-gray-400 text-white px-3 py-1 rounded">Reject</button>
//                   </div>
//                 </div>
//               )) : <p>No incoming requests</p>}
//             </section>

//             {/* Donations */}
//             <section className="bg-white shadow rounded-lg p-6">
//               <h2 className="text-xl font-semibold mb-4">Donations</h2>
//               {data.donations?.length ? data.donations.slice(0, 5).map(d => (
//                 <div key={d._id} className="border rounded p-4 mb-3">
//                   <p><strong>Aadhar:</strong> {d.aadhar}</p>
//                   <p><strong>Total Donations:</strong> {d.totalDonations}</p>
//                 </div>
//               )) : <p>No donations recorded</p>}
//               <button onClick={() => setShowDonationForm(!showDonationForm)} className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">Add Donation</button>
//               {showDonationForm && (
//                 <form onSubmit={addDonation} className="mt-4 grid gap-3">
//                   <input placeholder="Aadhar" value={donationForm.aadhar} onChange={e => setDonationForm({ ...donationForm, aadhar: e.target.value })} className="border p-2 rounded" />
//                   <input placeholder="Blood Group" value={donationForm.bloodGroup} onChange={e => setDonationForm({ ...donationForm, bloodGroup: e.target.value })} className="border p-2 rounded" />
//                   <input placeholder="Units" value={donationForm.units} onChange={e => setDonationForm({ ...donationForm, units: e.target.value })} className="border p-2 rounded" />
//                   <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save</button>
//                 </form>
//               )}
//             </section>
//           </div>

//           {/* Right side */}
//           <div className="space-y-6">
//             {/* Camps */}
//             <section className="bg-white shadow rounded-lg p-6">
//               <h2 className="text-xl font-semibold mb-4">Blood Camps</h2>
//               {data.bloodCamps?.length ? data.bloodCamps.slice(0, 5).map(bc => (
//                 <div key={bc._id} className="border rounded p-4 mb-3">
//                   <p><strong>{bc.name}</strong> - {new Date(bc.date).toDateString()}</p>
//                   <p>{bc.organizer}</p>
//                   <p>{bc.address}</p>
//                 </div>
//               )) : <p>No camps created</p>}
//               <button onClick={() => setShowCampForm(!showCampForm)} className="mt-3 bg-purple-600 text-white px-4 py-2 rounded">Create Camp</button>
//               {showCampForm && (
//                 <form onSubmit={createCamp} className="mt-4 grid gap-3">
//                   <input placeholder="Name" value={campForm.name} onChange={e => setCampForm({ ...campForm, name: e.target.value })} className="border p-2 rounded" />
//                   <input placeholder="Organizer" value={campForm.organizer} onChange={e => setCampForm({ ...campForm, organizer: e.target.value })} className="border p-2 rounded" />
//                   <input placeholder="Address" value={campForm.address} onChange={e => setCampForm({ ...campForm, address: e.target.value })} className="border p-2 rounded" />
//                   <input type="date" value={campForm.date} onChange={e => setCampForm({ ...campForm, date: e.target.value })} className="border p-2 rounded" />
//                   <input type="time" value={campForm.timeFrom} onChange={e => setCampForm({ ...campForm, timeFrom: e.target.value })} className="border p-2 rounded" />
//                   <input type="time" value={campForm.timeTo} onChange={e => setCampForm({ ...campForm, timeTo: e.target.value })} className="border p-2 rounded" />
//                   <div style={{ height: 200 }} className="mt-3">
//                     <MapContainer center={[20, 78]} zoom={4} style={{ height: '100%' }}>
//                       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                       {campPos && <Marker position={campPos} />}
//                       <ClickToPick onPick={(lat, lng) => setCampPos([lat, lng])} />
//                     </MapContainer>
//                   </div>
//                   <button type="submit" disabled={!campPos} className="bg-green-600 text-white px-4 py-2 rounded mt-2">Save</button>
//                 </form>
//               )}
//             </section>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function ClickToPick({ onPick }) {
//   useMapEvents({
//     click(e) {
//       onPick(e.latlng.lat, e.latlng.lng)
//     }
//   })
//   return null
// }

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

  if (!data) return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent"></div>
        <p className="mt-4 text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50 pt-16">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-l-4 border-red-600">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <span className="text-red-600">🏥</span> Hospital Dashboard
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Manage blood inventory and connect with donors</p>
        </div>

        <section className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow mb-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl">🩸</span>
            <h2 className="text-2xl font-bold text-gray-800">Blood Stocks</h2>
          </div>
          {data.stocks?.length ? (
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.stocks.map(s => (
                <li key={s.bloodGroup} className="bg-gradient-to-br from-red-50 to-white border-2 border-red-100 rounded-xl p-4 text-center hover:shadow-lg hover:border-red-300 transition-all transform hover:-translate-y-1">
                  <div className="text-2xl font-bold text-red-600 mb-2">{s.bloodGroup}</div>
                  <div className="text-3xl font-bold text-gray-800 mb-1">{s.units}</div>
                  <div className="text-sm text-gray-500">units available</div>
                  <div className="text-xs text-gray-400 mt-2">
                    {s.lastUpdated ? new Date(s.lastUpdated).toLocaleDateString() : 'Not updated'}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <span className="text-4xl mb-2 block">📋</span>
              <p>No stocks available</p>
            </div>
          )}
          <button onClick={() => setShowStockForm(!showStockForm)} className="mt-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105">
            {showStockForm ? '✕ Close Form' : '+ Update Stock'}
          </button>
          {showStockForm && (
            <div className="mt-6 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="grid gap-4">
                <input placeholder="Blood Group (e.g., A+)" value={stockForm.bloodGroup} onChange={e => setStockForm({ ...stockForm, bloodGroup: e.target.value })} className="border-2 border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 p-3 rounded-lg outline-none transition-all" />
                <input type="number" placeholder="Units" value={stockForm.units} onChange={e => setStockForm({ ...stockForm, units: e.target.value })} className="border-2 border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 p-3 rounded-lg outline-none transition-all" />
                <button onClick={updateStock} className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all">
                  Save Stock Update
                </button>
              </div>
            </div>
          )}
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">🆘</span>
                <h2 className="text-2xl font-bold text-gray-800">Emergency Requests</h2>
              </div>
              {data.sentRequests?.length ? data.sentRequests.map(sr => (
                <div key={sr._id} className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 rounded-lg p-5 mb-4 shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-red-700 text-lg flex items-center gap-2">
                    <span>🩸</span> {sr.bloodGroup} <span className="text-gray-600">({sr.unitsNeeded} units needed)</span>
                  </h3>
                  <p className="text-gray-700 mt-2">{sr.msg}</p>
                </div>
              )) : (
                <div className="text-center py-8 text-gray-500">
                  <span className="text-4xl mb-2 block">✅</span>
                  <p>No active emergencies</p>
                </div>
              )}
              <button onClick={() => setShowEmergencyForm(!showEmergencyForm)} className="mt-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105">
                {showEmergencyForm ? '✕ Close Form' : '+ Create Emergency'}
              </button>
              {showEmergencyForm && (
                <div className="mt-6 bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="grid gap-4">
                    <input placeholder="Blood Group (e.g., A+)" value={emergencyForm.bloodGroup} onChange={e => setEmergencyForm({ ...emergencyForm, bloodGroup: e.target.value })} className="border-2 border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 p-3 rounded-lg outline-none transition-all" />
                    <input type="number" placeholder="Units Needed" value={emergencyForm.unitsNeeded} onChange={e => setEmergencyForm({ ...emergencyForm, unitsNeeded: e.target.value })} className="border-2 border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 p-3 rounded-lg outline-none transition-all" />
                    <textarea placeholder="Emergency Message" value={emergencyForm.msg} onChange={e => setEmergencyForm({ ...emergencyForm, msg: e.target.value })} className="border-2 border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 p-3 rounded-lg outline-none transition-all resize-none h-24" />
                    <button onClick={createEmergency} className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all">
                      Submit Emergency
                    </button>
                  </div>
                </div>
              )}
            </section>

            <section className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">📨</span>
                <h2 className="text-2xl font-bold text-gray-800">Incoming Requests</h2>
              </div>
              {data.incomingRequests?.length ? data.incomingRequests.map(ir => (
                <div key={ir._id} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-5 mb-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="space-y-2 mb-4">
                    <p className="text-gray-700"><span className="font-semibold text-gray-900">Hospital:</span> {ir.emergency?.hospital?.name}</p>
                    <p className="text-gray-700"><span className="font-semibold text-gray-900">Blood Group:</span> <span className="text-red-600 font-bold">{ir.emergency?.bloodGroup}</span></p>
                    <p className="text-gray-700"><span className="font-semibold text-gray-900">Units Needed:</span> {ir.emergency?.unitsNeeded}</p>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => actOnRequest(ir._id, 'accept')} className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all">
                      ✓ Accept
                    </button>
                    <button onClick={() => actOnRequest(ir._id, 'reject')} className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all">
                      ✕ Reject
                    </button>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-gray-500">
                  <span className="text-4xl mb-2 block">📭</span>
                  <p>No incoming requests</p>
                </div>
              )}
            </section>

            <section className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">💉</span>
                <h2 className="text-2xl font-bold text-gray-800">Donations</h2>
              </div>
              {data.donations?.length ? data.donations.slice(0, 5).map(d => (
                <div key={d._id} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-5 mb-4 shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-gray-700"><span className="font-semibold text-gray-900">Aadhar:</span> {d.aadhar}</p>
                  <p className="text-gray-700 mt-1"><span className="font-semibold text-gray-900">Total Donations:</span> <span className="text-green-700 font-bold">{d.totalDonations}</span></p>
                </div>
              )) : (
                <div className="text-center py-8 text-gray-500">
                  <span className="text-4xl mb-2 block">🎁</span>
                  <p>No donations recorded</p>
                </div>
              )}
              <button onClick={() => setShowDonationForm(!showDonationForm)} className="mt-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105">
                {showDonationForm ? '✕ Close Form' : '+ Add Donation'}
              </button>
              {showDonationForm && (
                <div className="mt-6 bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="grid gap-4">
                    <input placeholder="Aadhar Number" value={donationForm.aadhar} onChange={e => setDonationForm({ ...donationForm, aadhar: e.target.value })} className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg outline-none transition-all" />
                    <input placeholder="Blood Group (e.g., A+)" value={donationForm.bloodGroup} onChange={e => setDonationForm({ ...donationForm, bloodGroup: e.target.value })} className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg outline-none transition-all" />
                    <input type="number" placeholder="Units" value={donationForm.units} onChange={e => setDonationForm({ ...donationForm, units: e.target.value })} className="border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-lg outline-none transition-all" />
                    <button onClick={addDonation} className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all">
                      Save Donation
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl">⛺</span>
                <h2 className="text-2xl font-bold text-gray-800">Blood Camps</h2>
              </div>
              {data.bloodCamps?.length ? data.bloodCamps.slice(0, 5).map(bc => (
                <div key={bc._id} className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-5 mb-4 shadow-sm hover:shadow-md transition-shadow">
                  <p className="font-bold text-gray-900 text-lg mb-2">{bc.name}</p>
                  <p className="text-sm text-gray-600 mb-1">📅 {new Date(bc.date).toDateString()}</p>
                  <p className="text-sm text-gray-600 mb-1">👤 {bc.organizer}</p>
                  <p className="text-sm text-gray-600">📍 {bc.address}</p>
                </div>
              )) : (
                <div className="text-center py-8 text-gray-500">
                  <span className="text-4xl mb-2 block">🏕️</span>
                  <p>No camps scheduled</p>
                </div>
              )}
              <button onClick={() => setShowCampForm(!showCampForm)} className="mt-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all transform hover:scale-105 w-full">
                {showCampForm ? '✕ Close Form' : '+ Create Camp'}
              </button>
              {showCampForm && (
                <div className="mt-6 bg-gray-50 rounded-xl p-6 border border-gray-200">
                  <div className="grid gap-4">
                    <input placeholder="Camp Name" value={campForm.name} onChange={e => setCampForm({ ...campForm, name: e.target.value })} className="border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 p-3 rounded-lg outline-none transition-all" />
                    <input placeholder="Organizer Name" value={campForm.organizer} onChange={e => setCampForm({ ...campForm, organizer: e.target.value })} className="border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 p-3 rounded-lg outline-none transition-all" />
                    <input placeholder="Address" value={campForm.address} onChange={e => setCampForm({ ...campForm, address: e.target.value })} className="border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 p-3 rounded-lg outline-none transition-all" />
                    <input type="date" value={campForm.date} onChange={e => setCampForm({ ...campForm, date: e.target.value })} className="border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 p-3 rounded-lg outline-none transition-all" />
                    <div className="grid grid-cols-2 gap-3">
                      <input type="time" placeholder="From" value={campForm.timeFrom} onChange={e => setCampForm({ ...campForm, timeFrom: e.target.value })} className="border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 p-3 rounded-lg outline-none transition-all" />
                      <input type="time" placeholder="To" value={campForm.timeTo} onChange={e => setCampForm({ ...campForm, timeTo: e.target.value })} className="border-2 border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 p-3 rounded-lg outline-none transition-all" />
                    </div>
                    <div className="border-2 border-gray-300 rounded-lg overflow-hidden" style={{ height: 220 }}>
                      <MapContainer center={[20, 78]} zoom={4} style={{ height: '100%', width: '100%' }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        {campPos && <Marker position={campPos} />}
                        <ClickToPick onPick={(lat, lng) => setCampPos([lat, lng])} />
                      </MapContainer>
                    </div>
                    <p className="text-sm text-gray-600 -mt-2">
                      {campPos ? `✓ Location: ${campPos[0].toFixed(4)}, ${campPos[1].toFixed(4)}` : '⚠️ Click map to select location'}
                    </p>
                    <button onClick={createCamp} disabled={!campPos} className={`px-6 py-3 rounded-lg font-semibold shadow-md transition-all ${campPos ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white hover:shadow-lg' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                      {campPos ? 'Create Blood Camp' : 'Select Location First'}
                    </button>
                  </div>
                </div>
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