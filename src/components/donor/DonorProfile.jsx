// src/components/donor/DonorProfile.jsx
import React, { useState } from 'react';
import { User, Edit3, Phone, Mail, MapPin, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../utils/helpers';
import Modal from '../common/Modal';

const DonorProfile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);
  const [editData, setEditData] = useState({
    phone: user.phone,
    address: user.address,
    emergencyContact: user.emergencyContact || ''
  });

  const handleSave = () => {
    updateUser(editData);
    setIsEditing(false);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">My Profile</h2>
          <button 
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Edit3 className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
          <p className="text-gray-600">{user.bloodType} Donor</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Availability</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                checked={isAvailable} 
                onChange={(e) => setIsAvailable(e.target.checked)}
                className="sr-only peer" 
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <Phone className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{user.phone}</span>
          </div>

          <div className="flex items-center space-x-3">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{user.email}</span>
          </div>

          <div className="flex items-center space-x-3">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">{user.address}</span>
          </div>

          <div className="flex items-center space-x-3">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              Born: {formatDate(user.dob)}
            </span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Profile Completion</span>
            <span className="text-sm text-gray-900">85%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-red-600 h-2 rounded-full" style={{width: '85%'}}></div>
          </div>
        </div>
      </div>

      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)} title="Edit Profile">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={editData.phone}
              onChange={(e) => setEditData({...editData, phone: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <textarea
              value={editData.address}
              onChange={(e) => setEditData({...editData, address: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
            <input
              type="tel"
              value={editData.emergencyContact}
              onChange={(e) => setEditData({...editData, emergencyContact: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-4 pt-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DonorProfile;
