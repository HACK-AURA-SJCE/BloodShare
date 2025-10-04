// src/components/donor/QuickActions.jsx
import React from 'react';
import { Heart, Calendar, Search, Bell } from 'lucide-react';

const QuickActions = () => {
  const actions = [
    {
      title: 'Schedule Donation',
      description: 'Book your next donation',
      icon: Calendar,
      color: 'red',
      action: () => console.log('Schedule donation')
    },
    {
      title: 'Find Blood Banks',
      description: 'Locate nearby centers',
      icon: Search,
      color: 'blue',
      action: () => console.log('Find blood banks')
    },
    {
      title: 'Emergency Response',
      description: 'Join emergency list',
      icon: Heart,
      color: 'green',
      action: () => console.log('Emergency response')
    },
    {
      title: 'Notification Settings',
      description: 'Manage alerts',
      icon: Bell,
      color: 'yellow',
      action: () => console.log('Notifications')
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="p-4 border border-gray-100 rounded-lg hover:shadow-md transition-all group"
          >
            <div className={`w-8 h-8 bg-${action.color}-100 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <action.icon className={`w-4 h-4 text-${action.color}-600`} />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm mb-1">{action.title}</h3>
            <p className="text-xs text-gray-600">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
