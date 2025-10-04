// src/components/donor/NearbyHospitals.jsx
import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { MOCK_HOSPITALS } from '../../utils/mockData';

const NearbyHospitals = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Nearby Hospitals</h2>
      
      <div className="space-y-4">
        {MOCK_HOSPITALS.map((hospital) => (
          <div key={hospital.id} className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                {hospital.type}
              </span>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin className="w-3 h-3" />
                <span>2.5 km away</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Phone className="w-3 h-3" />
                <span>{hospital.phone}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="w-3 h-3" />
                <span>24/7 Emergency</span>
              </div>
            </div>
            
            <div className="flex space-x-2 mt-4">
              <button className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-red-700 transition-colors">
                Contact
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded text-sm font-medium hover:bg-gray-50 transition-colors">
                Directions
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyHospitals;
