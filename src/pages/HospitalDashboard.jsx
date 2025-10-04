import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import BloodStockGrid from '../components/hospital/BloodStockGrid';
import EmergencyActions from '../components/hospital/EmergencyActions';
import BloodRequests from '../components/hospital/BloodRequests';
import DonorSearch from '../components/hospital/DonorSearch';
import HospitalStats from '../components/hospital/HospitalStats';
import NearbyHospitalsList from '../components/hospital/NearbyHospitalsList';

const HospitalDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Hospital Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage blood inventory and connect with donors</p>
        </div>

        {/* Blood Stock */}
        <BloodStockGrid />

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <EmergencyActions />
            <BloodRequests />
            <DonorSearch />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <HospitalStats />
            <NearbyHospitalsList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalDashboard;