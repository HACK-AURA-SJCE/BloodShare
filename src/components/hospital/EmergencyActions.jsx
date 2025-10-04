// src/components/hospital/EmergencyActions.jsx
import React, { useState } from 'react';
import { AlertTriangle, Megaphone, Send } from 'lucide-react';
import { BLOOD_TYPES } from '../../utils/mockData';
import { useNotifications } from '../../context/NotificationContext';
import Modal from '../common/Modal';

const EmergencyActions = () => {
  const { addNotification } = useNotifications();
  const [isSOSOpen, setIsSOSOpen] = useState(false);
  const [sosData, setSOSData] = useState({
    bloodType: '',
    urgency: 'high',
    units: 1,
    description: '',
    radius: 10
  });

  const handleSOSBroadcast = () => {
    addNotification({
      type: 'success',
      message: `Emergency broadcast sent to all ${sosData.bloodType} donors within ${sosData.radius}km`
    });
    setIsSOSOpen(false);
    setSOSData({ bloodType: '', urgency: 'high', units: 1, description: '', radius: 10 });
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Emergency Actions</h2>
          <AlertTriangle className="w-6 h-6 text-red-500" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={() => setIsSOSOpen(true)}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-xl hover:shadow-xl transition-all transform hover:scale-105 group"
          >
            <Megaphone className="w-8 h-8 mb-3 group-hover:animate-pulse" />
            <h3 className="font-bold text-lg mb-2">Emergency SOS</h3>
            <p className="text-sm opacity-90">Broadcast urgent need to all matching donors in area</p>
          </button>

          <button className="border-2 border-dashed border-orange-300 text-orange-600 p-6 rounded-xl hover:bg-orange-50 transition-all group">
            <Send className="w-8 h-8 mb-3 group-hover:animate-bounce" />
            <h3 className="font-bold text-lg mb-2">Request Network</h3>
            <p className="text-sm">Send request to nearby hospitals for blood sharing</p>
          </button>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800">Emergency Protocol</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Use SOS broadcast only for critical situations. This will send immediate alerts to all eligible donors.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isSOSOpen} onClose={() => setIsSOSOpen(false)} title="Emergency SOS Broadcast">
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type Required *</label>
              <select
                value={sosData.bloodType}
                onChange={(e) => setSOSData({...sosData, bloodType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                required
              >
                <option value="">Select blood type</option>
                {BLOOD_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Units Needed</label>
              <input
                type="number"
                min="1"
                value={sosData.units}
                onChange={(e) => setSOSData({...sosData, units: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
              <select
                value={sosData.urgency}
                onChange={(e) => setSOSData({...sosData, urgency: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              >
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="moderate">Moderate</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Radius (km)</label>
              <select
                value={sosData.radius}
                onChange={(e) => setSOSData({...sosData, radius: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              >
                <option value="5">5 km</option>
                <option value="10">10 km</option>
                <option value="25">25 km</option>
                <option value="50">50 km</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={sosData.description}
              onChange={(e) => setSOSData({...sosData, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              rows="3"
              placeholder="Brief description of the emergency situation..."
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <button
              onClick={handleSOSBroadcast}
              disabled={!sosData.bloodType}
              className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send Emergency Broadcast
            </button>
            <button
              onClick={() => setIsSOSOpen(false)}
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

export default EmergencyActions;
