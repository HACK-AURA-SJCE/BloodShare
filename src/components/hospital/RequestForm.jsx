// src/components/hospital/RequestForm.jsx
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { BLOOD_TYPES } from '../../utils/mockData';
import { useNotifications } from '../../context/NotificationContext';

const RequestForm = ({ isOpen, onClose }) => {
  const { addNotification } = useNotifications();
  const [requestData, setRequestData] = useState({
    bloodType: '',
    units: 1,
    urgency: 'moderate',
    patientId: '',
    department: '',
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addNotification({
      type: 'success',
      message: `Blood request sent for ${requestData.units} unit(s) of ${requestData.bloodType}`
    });
    onClose();
    setRequestData({ bloodType: '', units: 1, urgency: 'moderate', patientId: '', department: '', description: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Blood Request</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type *</label>
              <select
                required
                value={requestData.bloodType}
                onChange={(e) => setRequestData({...requestData, bloodType: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select type</option>
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
                required
                value={requestData.units}
                onChange={(e) => setRequestData({...requestData, units: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
            <select
              value={requestData.urgency}
              onChange={(e) => setRequestData({...requestData, urgency: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="scheduled">Scheduled</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Patient ID</label>
              <input
                type="text"
                value={requestData.patientId}
                onChange={(e) => setRequestData({...requestData, patientId: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="#12345"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <input
                type="text"
                value={requestData.department}
                onChange={(e) => setRequestData({...requestData, department: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="ICU, Surgery, etc."
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={requestData.description}
              onChange={(e) => setRequestData({...requestData, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Additional details about the request..."
            />
          </div>
          
          <div className="flex space-x-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Request
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
