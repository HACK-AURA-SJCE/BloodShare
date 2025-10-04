// src/components/home/StatsSection.jsx
import React from 'react';
import { TrendingUp, Users, Building, Heart } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: '25,847',
      label: 'Active Donors',
      description: 'Verified blood donors ready to help',
      color: 'blue'
    },
    {
      icon: Building,
      value: '1,234',
      label: 'Partner Hospitals',
      description: 'Verified healthcare facilities',
      color: 'green'
    },
    {
      icon: Heart,
      value: '89,562',
      label: 'Lives Saved',
      description: 'Successful blood donations completed',
      color: 'red'
    },
    {
      icon: TrendingUp,
      value: '98.5%',
      label: 'Success Rate',
      description: 'Successful donor-hospital matches',
      color: 'purple'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Making a Real Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how BloodConnect is transforming blood donation and saving lives across communities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className={`w-16 h-16 bg-${stat.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
              </div>
              
              <div className="space-y-2">
                <div className={`text-4xl lg:text-5xl font-bold text-${stat.color}-600 mb-2`}>
                  {stat.value}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {stat.label}
                </h3>
                <p className="text-gray-600 text-sm">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h3>
          <p className="text-red-100 mb-6 text-lg">
            Join our community and help save lives in your area today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-red-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
              Become a Donor
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-red-600 transition-colors">
              Register Hospital
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
