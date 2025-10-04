import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function Signup({ defaultRole }) {
  const [role, setRole] = useState(defaultRole || 'Donor')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [bloodGroup, setBloodGroup] = useState('A+')
  const [aadhar, setAadhar] = useState('')
  const [permanentAddress, setPermanentAddress] = useState('')
  const [permanentLat, setPermanentLat] = useState('')
  const [permanentLng, setPermanentLng] = useState('')
  const [hospitalAddress, setHospitalAddress] = useState('')
  const [hospitalLat, setHospitalLat] = useState('')
  const [hospitalLng, setHospitalLng] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const [center, setCenter] = useState([20, 78])
  const [picked, setPicked] = useState(null)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCenter([pos.coords.latitude, pos.coords.longitude])
      })
    }
  }, [])

  useEffect(() => {
    // when role changes, clear picked and lat/lng
    setPicked(null)
    setPermanentAddress(''); setPermanentLat(''); setPermanentLng('')
    setHospitalAddress(''); setHospitalLat(''); setHospitalLng('')
  }, [role])

  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const payload = role === 'Donor'
      ? { role, email, password, name, mobile, bloodGroup, aadhar, permanentAddress, permanentLat, permanentLng }
      : { role, email, password, name, mobile, hospitalAddress, hospitalLat, hospitalLng }
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-client': 'React' },
        credentials: 'include',
        body: JSON.stringify(payload)
      })
      const contentType = res.headers.get('content-type') || ''
      if (!contentType.includes('application/json')) {
        throw new Error('Unexpected response from server')
      }
      const data = await res.json()
      if (!data.success) {
        setError(data.error || 'Signup failed')
        return
      }
      setUser(data.user)
      if (data.user.role === 'Donor') navigate('/donor')
      else navigate('/hospital')
    } catch (err) {
      setError(err.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 520, margin: '40px auto' }}>
      <h2>Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <div>
          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option>Donor</option>
            <option>Hospital</option>
          </select>
        </div>
        <div>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </div>
        <div>
          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </div>
        <div>
          <label>Mobile</label>
          <input value={mobile} onChange={(e) => setMobile(e.target.value)} required />
        </div>
        {role === 'Donor' ? (
          <>
            <div>
              <label>Blood Group</label>
              <input value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required />
            </div>
            <div>
              <label>Aadhar</label>
              <input value={aadhar} onChange={(e) => setAadhar(e.target.value)} required />
            </div>
            <div>
              <label>Permanent Address</label>
              <input id="donorAddress" value={permanentAddress} onChange={(e) => setPermanentAddress(e.target.value)} />
            </div>
            <div style={{ marginTop: 12 }}>
              <label>Pick Permanent Location</label>
              <div style={{ height: 300, marginTop: 8 }}>
                <MapPicker
                  center={center}
                  value={picked}
                  onChange={(lat, lng) => { setPicked([lat, lng]); setPermanentLat(String(lat)); setPermanentLng(String(lng)); }}
                  address={permanentAddress}
                />
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <input placeholder="Permanent Lat" value={permanentLat} onChange={(e) => setPermanentLat(e.target.value)} />
                <input placeholder="Permanent Lng" value={permanentLng} onChange={(e) => setPermanentLng(e.target.value)} />
              </div>
              <p>Selected Coordinates: {permanentLat && permanentLng ? `Lat: ${permanentLat}, Lng: ${permanentLng}` : 'None'}</p>
            </div>
          </>
        ) : (
          <>
            <div>
              <label>Hospital Address</label>
              <input id="hospitalAddress" value={hospitalAddress} onChange={(e) => setHospitalAddress(e.target.value)} />
            </div>
            <div style={{ marginTop: 12 }}>
              <label>Pick Hospital Location</label>
              <div style={{ height: 300, marginTop: 8 }}>
                <MapPicker
                  center={center}
                  value={picked}
                  onChange={(lat, lng) => { setPicked([lat, lng]); setHospitalLat(String(lat)); setHospitalLng(String(lng)); }}
                  address={hospitalAddress}
                />
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <input placeholder="Hospital Lat" value={hospitalLat} onChange={(e) => setHospitalLat(e.target.value)} />
                <input placeholder="Hospital Lng" value={hospitalLng} onChange={(e) => setHospitalLng(e.target.value)} />
              </div>
              <p>Selected Coordinates: {hospitalLat && hospitalLng ? `Lat: ${hospitalLat}, Lng: ${hospitalLng}` : 'None'}</p>
            </div>
          </>
        )}
        <button type="submit" disabled={loading}>{loading ? 'Creating…' : 'Create account'}</button>
      </form>
    </div>
  )
}

function MapPicker({ center, value, onChange, address }) {
  return (
    <MapContainer center={center} zoom={13} style={{ height: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapInner center={center} value={value} onChange={onChange} address={address} />
    </MapContainer>
  )
}

function MapInner({ center, value, onChange, address }) {
  const map = useMap()
  const markerRef = useRef(null)
  const [pos, setPos] = useState(value || center)

  useEffect(() => { if (center) map.setView(center, 13) }, [center, map])

  useMapEvents({
    click(e) {
      const coords = [e.latlng.lat, e.latlng.lng]
      setPos(coords)
      onChange(coords[0], coords[1])
      if (markerRef.current) markerRef.current.setLatLng(e.latlng)
    }
  })

  const debouncedAddr = useDebounce(address, 800)
  useEffect(() => {
    const search = async () => {
      if (!debouncedAddr) return
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(debouncedAddr)}`)
        const data = await res.json()
        if (data && data.length > 0) {
          const lat = parseFloat(data[0].lat)
          const lng = parseFloat(data[0].lon)
          const coords = [lat, lng]
          setPos(coords)
          onChange(lat, lng)
          map.setView(coords, 15)
          if (markerRef.current) markerRef.current.setLatLng({ lat, lng })
        }
      } catch {}
    }
    search()
  }, [debouncedAddr, map, onChange])

  const eventHandlers = useMemo(() => ({
    dragend() {
      const m = markerRef.current
      if (m) {
        const { lat, lng } = m.getLatLng()
        setPos([lat, lng])
        onChange(lat, lng)
      }
    }
  }), [onChange])

  return <Marker position={pos} draggable eventHandlers={eventHandlers} ref={markerRef} />
}

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}


