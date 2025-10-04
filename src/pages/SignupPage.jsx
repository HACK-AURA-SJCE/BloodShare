import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Hospital } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import { BLOOD_TYPES, HOSPITAL_TYPES, GENDERS } from '../utils/constants';

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addNotification } = useNotifications();
  const [signupType, setSignupType] = useState('donor');
  const [loading, setLoading] = useState(false);

  const [donorData, setDonorData] = useState({
    name: '', email: '', phone: '', bloodType: '', dob: '', gender: '', 
    address: '', lastDonation: '', password: ''
  });

  const [hospitalData, setHospitalData] = useState({
    hospitalName: '', regNumber: '', contactPerson: '', email: '', phone: '', 
    emergencyContact: '', address: '', type: '', beds: '', password: ''
  });

  const handleDonorSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      login({ ...donorData, id: Date.now(), status: 'eligible', totalDonations: 0 }, 'donor');
      addNotification({ type: 'success', message: 'Registration successful! Welcome to BloodConnect.' });
      navigate('/donor/dashboard');
      setLoading(false);
    }, 1000);
  };

  const handleHospitalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      login({ ...hospitalData, id: Date.now() }, 'hospital');
      addNotification({ type: 'success', message: 'Hospital registered successfully!' });
      navigate('/hospital/dashboard');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 py-20 px-4 pt-24">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl mx-auto p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Join BloodConnect</h2>

        {/* Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
          <button
            onClick={() => setSignupType('donor')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
              signupType === 'donor'
                ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Heart className="w-5 h-5 inline mr-2" />
            I'm a Donor
          </button>
          <button
            onClick={() => setSignupType('hospital')}
            className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
              signupType === 'hospital'
                ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Hospital className="w-5 h-5 inline mr-2" />
            I'm a Hospital
          </button>
        </div>

        {/* Donor Form */}
        {signupType === 'donor' && (
          <form onSubmit={handleDonorSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={donorData.name}
                  onChange={(e) => setDonorData({ ...donorData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={donorData.email}
                  onChange={(e) => setDonorData({ ...donorData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={donorData.phone}
                  onChange={(e) => setDonorData({ ...donorData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="10-digit mobile number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type *</label>
                <select
                  required
                  value={donorData.bloodType}
                  onChange={(e) => setDonorData({ ...donorData, bloodType: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Select blood type</option>
                  {BLOOD_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                <input
                  type="date"
                  required
                  value={donorData.dob}
                  onChange={(e) => setDonorData({ ...donorData, dob: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                <select
                  required
                  value={donorData.gender}
                  onChange={(e) => setDonorData({ ...donorData, gender: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">Select gender</option>
                  {GENDERS.map(gender => (
                    <option key={gender} value={gender}>{gender}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
              <textarea
                required
                value={donorData.address}
                onChange={(e) => setDonorData({ ...donorData, address: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                rows="3"
                placeholder="Enter your complete address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Donation Date (Optional)</label>
              <input
                type="date"
                value={donorData.lastDonation}
                onChange={(e) => setDonorData({ ...donorData, lastDonation: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
              <input
                type="password"
                required
                minLength="6"
                value={donorData.password}
                onChange={(e) => setDonorData({ ...donorData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Create a strong password (min 6 characters)"
              />
            </div>

            <div className="flex items-center">
              <input type="checkbox" required className="rounded border-gray-300 text-red-600 focus:ring-red-500" />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the <a href="#" className="text-red-600 hover:text-red-500">Terms of Service</a> and <a href="#" className="text-red-600 hover:text-red-500">Privacy Policy</a>
              </span>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register as Donor'}
            </button>
          </form>
        )}

        {/* Hospital Form */}
        {signupType === 'hospital' && (
          <form onSubmit={handleHospitalSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Name *</label>
                <input
                  type="text"
                  required
                  value={hospitalData.hospitalName}
                  onChange={(e) => setHospitalData({ ...hospitalData, hospitalName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter hospital name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number *</label>
                <input
                  type="text"
                  required
                  value={hospitalData.regNumber}
                  onChange={(e) => setHospitalData({ ...hospitalData, regNumber: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Hospital registration number"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person *</label>
                <input
                  type="text"
                  required
                  value={hospitalData.contactPerson}
                  onChange={(e) => setHospitalData({ ...hospitalData, contactPerson: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Contact person name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  required
                  value={hospitalData.email}
                  onChange={(e) => setHospitalData({ ...hospitalData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Hospital email"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={hospitalData.phone}
                  onChange={(e) => setHospitalData({ ...hospitalData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Hospital phone"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact *</label>
                <input
                  type="tel"
                  required
                  value={hospitalData.emergencyContact}
                  onChange={(e) => setHospitalData({ ...hospitalData, emergencyContact: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="24/7 emergency number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Address *</label>
              <textarea
                required
                value={hospitalData.address}
                onChange={(e) => setHospitalData({ ...hospitalData, address: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="3"
                placeholder="Complete hospital address"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Type *</label>
                <select
                  required
                  value={hospitalData.type}
                  onChange={(e) => setHospitalData({ ...hospitalData, type: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
                  {HOSPITAL_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bed Capacity *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={hospitalData.beds}
                  onChange={(e) => setHospitalData({ ...hospitalData, beds: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Total bed capacity"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
              <input
                type="password"
                required
                minLength="6"
                value={hospitalData.password}
                onChange={(e) => setHospitalData({ ...hospitalData, password: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Create a strong password (min 6 characters)"
              />
            </div>

            <div className="flex items-center">
              <input type="checkbox" required className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
              <span className="ml-2 text-sm text-gray-600">
                I confirm that all information is accurate and agree to the <a href="#" className="text-green-600 hover:text-green-500">Terms of Service</a>
              </span>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register Hospital'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-red-600 hover:text-red-500 font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;