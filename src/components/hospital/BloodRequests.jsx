// src/components/hospital/BloodRequests.jsx
import React, { useState } from 'react';
import { Clock, User, Phone, CheckCircle, XCircle } from 'lucide-react';
import { MOCK_REQUESTS } from '../../utils/mockData';

const BloodRequests = () => {
  const [requests, setRequests] = useState(MOCK_REQUESTS);

  const handleRequestAction = (requestId, action) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: action === 'accept' ? 'accepted' : 'rejected' }
        : req
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Active Blood Requests</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
          Create New Request
        </button>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <div key={request.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                  request.priority === 'urgent' ? 'bg-red-600' :
                  request.priority === 'high' ? 'bg-orange-500' :
                  request.priority === 'moderate' ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`}>
                  {request.bloodType}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Patient {request.patientId}</h3>
                  <p className="text-sm text-gray-600">{request.department}</p>
                </div>
              </div>
              
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  request.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                  request.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                  request.priority === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {request.priority}
                </span>
                <p className="text-xs text-gray-500 mt-1 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {request.time}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <User className="w-3 h-3 mr-1" />
                  {request.respondingDonors} donors
                </span>
                <span>{request.unitsNeeded} units needed</span>
              </div>
              
              {!request.status && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleRequestAction(request.id, 'accept')}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle className="w-3 h-3 inline mr-1" />
                    Accept
                  </button>
                  <button
                    onClick={() => handleRequestAction(request.id, 'reject')}
                    className="bg-red-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    <XCircle className="w-3 h-3 inline mr-1" />
                    Decline
                  </button>
                </div>
              )}
              
              {request.status && (
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  request.status === 'accepted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {request.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodRequests;
