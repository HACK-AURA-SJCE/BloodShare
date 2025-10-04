// src/components/donor/DonationHistory.jsx
import React from 'react';
import { Calendar, MapPin, Award } from 'lucide-react';
import { MOCK_DONATIONS } from '../../utils/mockData';
import { formatDate } from '../../utils/helpers';

const DonationHistory = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Donation History</h2>
        <Award className="w-6 h-6 text-yellow-500" />
      </div>

      <div className="space-y-4">
        {MOCK_DONATIONS.map((donation) => (
          <div key={donation.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold text-sm">{donation.bloodType}</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{donation.hospital}</h3>
                <p className="text-sm text-gray-600 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {formatDate(donation.date)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                donation.status === 'Completed' ? 'bg-green-100 text-green-800' :
                donation.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {donation.status}
              </span>
              <p className="text-xs text-gray-500 mt-1">{donation.units} unit(s)</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="text-red-600 hover:text-red-700 font-medium text-sm">
          View Complete History →
        </button>
      </div>
    </div>
  );
};

export default DonationHistory;
