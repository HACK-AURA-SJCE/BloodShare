import 'leaflet/dist/leaflet.css';
import { Heart, Hospital } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { BLOOD_TYPES } from '../utils/constants';

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addNotification } = useNotifications();

  const [signupType, setSignupType] = useState('donor');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // donor fields
  const [donorData, setDonorData] = useState({
    name: '', email: '', phone: '', bloodType: '', dob: '', gender: '',
    address: '', password: '', lat: '', lng: '', aadhar: ''
  });

  // hospital fields
  const [hospitalData, setHospitalData] = useState({
    hospitalName: '', regNumber: '', contactPerson: '', email: '', phone: '',
    emergencyContact: '', address: '', type: '', beds: '', password: '',
    lat: '', lng: ''
  });

  const [center, setCenter] = useState([20, 78]);
  const [picked, setPicked] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setCenter([pos.coords.latitude, pos.coords.longitude]);
      });
    }
  }, []);

  // --------- SUBMIT HANDLER ---------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const payload = signupType === 'donor'
      ? {
        role: 'Donor',
        email: donorData.email,
        password: donorData.password,
        name: donorData.name,
        mobile: donorData.phone,
        bloodGroup: donorData.bloodType,
        aadhar: donorData.aadhar,
        permanentAddress: donorData.address,
        permanentLat: donorData.lat,
        permanentLng: donorData.lng
      }
      : {
        role: 'Hospital',
        email: hospitalData.email,
        password: hospitalData.password,
        name: hospitalData.hospitalName,
        mobile: hospitalData.phone,
        hospitalAddress: hospitalData.address,
        hospitalLat: hospitalData.lat,
        hospitalLng: hospitalData.lng
      };

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-client': 'React' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) throw new Error('Unexpected server response');

      const data = await res.json();
      if (!data.success) {
        setError(data.error || 'Signup failed');
        return;
      }

      login({ ...data.user, profile: data.profile }, data.user.role.toLowerCase());
      addNotification({ type: 'success', message: 'Registration successful!' });

      if (data.user.role === 'Donor') navigate('/donor/dashboard');
      else navigate('/hospital/dashboard');

    } catch (err) {
      setError(err.message || 'Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 py-20 px-4 pt-24">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl mx-auto p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Join BloodConnect</h2>

        {/* Error */}
        {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

        {/* Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
          <button
            onClick={() => setSignupType('donor')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${signupType === 'donor'
              ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            <Heart className="w-5 h-5 inline mr-2" />
            I'm a Donor
          </button>
          <button
            onClick={() => setSignupType('hospital')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${signupType === 'hospital'
              ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900'
              }`}
          >
            <Hospital className="w-5 h-5 inline mr-2" />
            I'm a Hospital
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {signupType === 'donor' ? (
            <>
              {/* donor fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <input className="input" placeholder="Full Name" required
                  value={donorData.name} onChange={(e) => setDonorData({ ...donorData, name: e.target.value })} />
                <input className="input" type="email" placeholder="Email" required
                  value={donorData.email} onChange={(e) => setDonorData({ ...donorData, email: e.target.value })} />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <input className="input" placeholder="Phone" required
                  value={donorData.phone} onChange={(e) => setDonorData({ ...donorData, phone: e.target.value })} />
                <select className="input" required
                  value={donorData.bloodType} onChange={(e) => setDonorData({ ...donorData, bloodType: e.target.value })}>
                  <option value="">Blood Type</option>
                  {BLOOD_TYPES.map(b => <option key={b}>{b}</option>)}
                </select>
              </div>

              <input className="input" placeholder="Aadhar Number" required
                value={donorData.aadhar} onChange={(e) => setDonorData({ ...donorData, aadhar: e.target.value })} />

              <textarea className="input" placeholder="Permanent Address" required
                value={donorData.address} onChange={(e) => setDonorData({ ...donorData, address: e.target.value })} />

              {/* Map */}
              <div>
                <label className="block mb-2">Pick Location</label>
                <div className="h-64">
                  <MapPicker
                    center={center}
                    value={picked}
                    onChange={(lat, lng) => { setPicked([lat, lng]); setDonorData({ ...donorData, lat: String(lat), lng: String(lng) }) }}
                    address={donorData.address}
                  />
                </div>
              </div>

              <input className="input" type="password" placeholder="Password" required
                value={donorData.password} onChange={(e) => setDonorData({ ...donorData, password: e.target.value })} />
            </>
          ) : (
            <>
              {/* hospital fields */}
              <input className="input" placeholder="Hospital Name" required
                value={hospitalData.hospitalName} onChange={(e) => setHospitalData({ ...hospitalData, hospitalName: e.target.value })} />
              <input className="input" placeholder="Email" type="email" required
                value={hospitalData.email} onChange={(e) => setHospitalData({ ...hospitalData, email: e.target.value })} />

              <input className="input" placeholder="Phone" required
                value={hospitalData.phone} onChange={(e) => setHospitalData({ ...hospitalData, phone: e.target.value })} />

              <textarea className="input" placeholder="Hospital Address" required
                value={hospitalData.address} onChange={(e) => setHospitalData({ ...hospitalData, address: e.target.value })} />

              <div className="h-64">
                <MapPicker
                  center={center}
                  value={picked}
                  onChange={(lat, lng) => { setPicked([lat, lng]); setHospitalData({ ...hospitalData, lat: String(lat), lng: String(lng) }) }}
                  address={hospitalData.address}
                />
              </div>

              <input className="input" type="password" placeholder="Password" required
                value={hospitalData.password} onChange={(e) => setHospitalData({ ...hospitalData, password: e.target.value })} />
            </>
          )}

          <button type="submit" disabled={loading}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg">
            {loading ? 'Registering…' : signupType === 'donor' ? 'Register as Donor' : 'Register Hospital'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-red-600 hover:text-red-500 font-medium">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

// ---------------- Map Component -----------------
function MapPicker({ center, value, onChange, address }) {
  return (
    <MapContainer center={center} zoom={13} style={{ height: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapInner center={center} value={value} onChange={onChange} address={address} />
    </MapContainer>
  );
}

function MapInner({ center, value, onChange }) {
  const map = useMap();
  const markerRef = useRef(null);
  const [pos, setPos] = useState(value || center);

  useEffect(() => { if (center) map.setView(center, 13) }, [center, map]);

  useMapEvents({
    click(e) {
      const coords = [e.latlng.lat, e.latlng.lng];
      setPos(coords);
      onChange(coords[0], coords[1]);
      if (markerRef.current) markerRef.current.setLatLng(e.latlng);
    }
  });

  return <Marker position={pos} draggable ref={markerRef} eventHandlers={{
    dragend() {
      const m = markerRef.current;
      if (m) {
        const { lat, lng } = m.getLatLng();
        setPos([lat, lng]);
        onChange(lat, lng);
      }
    }
  }} />;
}
