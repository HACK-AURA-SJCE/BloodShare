// src/components/hospital/HospitalStats.jsx
import React from 'react';
import { Users, Calendar, TrendingUp, Heart } from 'lucide-react';

const HospitalStats = () => {
  const stats = [
    {
      title: 'Active Donors',
      value: '247',
      icon: Users,
      color: 'blue',
      change: '+12 this week'
    },
    {
      title: 'Monthly Requests',
      value: '68',
      icon: Calendar,
      color: 'green',
      change: '+5 from last month'
    },
    {
      title: 'Success Rate',
      value: '94%',
      icon: TrendingUp,
      color: 'purple',
      change: '+2% improvement'
    },
    {
      title: 'Lives Saved',
      value: '1,234',
      icon: Heart,
      color: 'red',
      change: 'All time'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Hospital Statistics</h2>
      
      <div className="space-y-6">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-right">{stat.change}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <button className="w-full text-blue-600 hover:text-blue-700 font-medium text-sm">
          View Detailed Analytics →
        </button>
      </div>
    </div>
  );
};

export default HospitalStats;
