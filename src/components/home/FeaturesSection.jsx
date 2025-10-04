// src/components/home/FeaturesSection.jsx
import React from 'react';
import { 
  Shield, 
  Zap, 
  Users, 
  MapPin, 
  Bell, 
  Activity,
  Hospital,
  Heart 
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Zap,
      title: 'Instant Matching',
      description: 'Connect with compatible donors or hospitals instantly using smart matching algorithms.',
      color: 'blue'
    },
    {
      icon: MapPin,
      title: 'Location-Based',
      description: 'Find nearby donors and hospitals within your preferred distance radius.',
      color: 'green'
    },
    {
      icon: Bell,
      title: 'Emergency Alerts',
      description: 'Receive immediate notifications for critical blood needs in your area.',
      color: 'red'
    },
    {
      icon: Shield,
      title: 'Verified Network',
      description: 'All donors and hospitals are verified for safety and authenticity.',
      color: 'purple'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join a supportive community of life-savers working together.',
      color: 'yellow'
    },
    {
      icon: Activity,
      title: 'Real-time Tracking',
      description: 'Track blood stock levels and donation history in real-time.',
      color: 'indigo'
    },
    {
      icon: Hospital,
      title: 'Hospital Network',
      description: 'Partner with verified hospitals for streamlined blood management.',
      color: 'cyan'
    },
    {
      icon: Heart,
      title: 'Lives Saved',
      description: 'Track your impact and see the lives you\'ve helped save.',
      color: 'pink'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose BloodConnect?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the most efficient and user-friendly blood donation platform designed to save lives and strengthen communities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
              <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-white rounded-full px-8 py-4 shadow-lg">
            <Heart className="w-6 h-6 text-red-600" fill="currentColor" />
            <span className="text-gray-900 font-medium">Join thousands saving lives every day</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
