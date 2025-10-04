// src/components/hospital/NearbyHospitalsList.jsx
import React from 'react';
import { MapPin, Phone, Share } from 'lucide-react';

const NearbyHospitalsList = () => {
  const nearbyHospitals = [
    {
      id: 1,
      name: 'Central Medical Center',
      distance: '2.3 km',
      needs: ['O-', 'AB+'],
      surplus: ['A+', 'B+'],
      contact: '0612-2234571'
    },
    {
      id: 2,
      name: 'Regional Hospital',
      distance: '4.1 km',
      needs: ['A-', 'O+'],
      surplus: ['AB-'],
      contact: '0612-2234572'
    },
    {
      id: 3,
      name: 'Emergency Care Center',
      distance: '6.7 km',
      needs: ['B-'],
      surplus: ['O+', 'A+'],
      contact: '0612-2234573'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Nearby Hospitals</h2>
        <Share className="w-6 h-6 text-blue-500" />
      </div>

      <div className="space-y-4">
        {nearbyHospitals.map((hospital) => (
          <div key={hospital.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
              <span className="text-sm text-gray-500 flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {hospital.distance}
              </span>
            </div>
            
            {hospital.needs.length > 0 && (
              <div className="mb-2">
                <p className="text-xs text-gray-600 mb-1">Needs:</p>
                <div className="flex flex-wrap gap-1">
                  {hospital.needs.map((bloodType) => (
                    <span key={bloodType} className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                      {bloodType}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {hospital.surplus.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-gray-600 mb-1">Can share:</p>
                <div className="flex flex-wrap gap-1">
                  {hospital.surplus.map((bloodType) => (
                    <span key={bloodType} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                      {bloodType}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500 flex items-center">
                <Phone className="w-3 h-3 mr-1" />
                {hospital.contact}
              </span>
              <div className="flex space-x-2">
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-blue-700 transition-colors">
                  Connect
                </button>
                <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-xs font-medium hover:bg-gray-50 transition-colors">
                  Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyHospitalsList;
