// src/components/donor/DonorStats.jsx
import React from 'react';
import { Heart, Calendar, TrendingUp, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { isEligibleToDonate, getDaysUntilEligible, calculateDaysSinceLastDonation } from '../../utils/helpers';

const DonorStats = () => {
  const { user } = useAuth();
  const daysSinceLastDonation = calculateDaysSinceLastDonation(user.lastDonation);
  const isEligible = isEligibleToDonate(user.lastDonation, user.gender);
  const daysUntilEligible = getDaysUntilEligible(user.lastDonation, user.gender);

  const stats = [
    {
      title: 'Total Donations',
      value: user.totalDonations || 0,
      icon: Heart,
      color: 'red',
      subtitle: 'Lives saved'
    },
    {
      title: 'Blood Type',
      value: user.bloodType,
      icon: TrendingUp,
      color: 'blue',
      subtitle: 'Universal type'
    },
    {
      title: 'Days Since Last',
      value: daysSinceLastDonation ? `${daysSinceLastDonation} days` : 'First time',
      icon: Calendar,
      color: 'green',
      subtitle: 'Last donation'
    },
    {
      title: 'Donation Status',
      value: isEligible ? 'Eligible' : `${daysUntilEligible} days`,
      icon: MapPin,
      color: isEligible ? 'green' : 'orange',
      subtitle: isEligible ? 'Ready to donate' : 'Until eligible'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
            </div>
            <div className={`w-12 h-12 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
              <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DonorStats;
