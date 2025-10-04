import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import DonorStats from '../components/donor/DonorStats';
import EmergencyAlerts from '../components/donor/EmergencyAlerts';
import DonationHistory from '../components/donor/DonationHistory';
import DonorProfile from '../components/donor/DonorProfile';
import QuickActions from '../components/donor/QuickActions';
import NearbyHospitals from '../components/donor/NearbyHospitals';
import BloodCamps from '../components/donor/BloodCamps';

const DonorDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Donor Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user.name}! Ready to save lives today?</p>
        </div>

        {/* Stats */}
        <DonorStats />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <EmergencyAlerts />
            <BloodCamps />
            <DonationHistory />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <DonorProfile />
            <QuickActions />
            <NearbyHospitals />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboard;