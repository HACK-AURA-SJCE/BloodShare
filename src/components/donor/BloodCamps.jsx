// src/components/donor/BloodCamps.jsx
import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { MOCK_BLOOD_CAMPS } from '../../utils/mockData';

const BloodCamps = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Upcoming Blood Camps</h2>
        <Users className="w-6 h-6 text-blue-500" />
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {MOCK_BLOOD_CAMPS.map((camp) => (
          <div key={camp.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-all">
            <h3 className="font-semibold text-gray-900 mb-2">{camp.name}</h3>
            
            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3 h-3" />
                <span>{camp.location}</span>
                <span className="text-blue-600">({camp.distance})</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="w-3 h-3" />
                <span>{camp.date}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="w-3 h-3" />
                <span>{camp.time}</span>
              </div>
            </div>
            
            <p className="text-xs text-gray-500 mb-3">
              Organized by: {camp.organizer}
            </p>
            
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-blue-700 transition-colors">
                Register
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodCamps;
