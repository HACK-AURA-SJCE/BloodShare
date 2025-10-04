// src/components/donor/EmergencyAlerts.jsx
import React from 'react';
import { AlertTriangle, Clock, MapPin, Phone } from 'lucide-react';

const EmergencyAlerts = () => {
  const emergencies = [
    {
      id: 1,
      bloodType: 'O-',
      hospital: 'City General Hospital',
      distance: '1.2 km',
      urgency: 'Critical',
      time: '5 mins ago',
      description: 'Road accident victim needs immediate blood transfusion'
    },
    {
      id: 2,
      bloodType: 'A+',
      hospital: 'Metro Hospital',
      distance: '2.8 km',
      urgency: 'High',
      time: '18 mins ago',
      description: 'Surgery patient requires blood units'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Emergency Alerts</h2>
        <AlertTriangle className="w-6 h-6 text-red-500" />
      </div>

      <div className="space-y-4">
        {emergencies.map((emergency) => (
          <div key={emergency.id} className="border-l-4 border-red-500 bg-red-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-4">
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {emergency.bloodType}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  emergency.urgency === 'Critical' ? 'bg-red-100 text-red-800' :
                  emergency.urgency === 'High' ? 'bg-orange-100 text-orange-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {emergency.urgency}
                </span>
              </div>
              <span className="text-xs text-gray-500 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {emergency.time}
              </span>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-1">{emergency.hospital}</h3>
            <p className="text-sm text-gray-600 mb-3">{emergency.description}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {emergency.distance}
              </span>
              <div className="flex space-x-2">
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
                  Respond Now
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  <Phone className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyAlerts;
