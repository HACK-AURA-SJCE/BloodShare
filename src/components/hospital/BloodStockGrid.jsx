// src/components/hospital/BloodStockGrid.jsx
import React, { useState } from 'react';
import { Plus, Minus, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import { INITIAL_BLOOD_STOCK, BLOOD_TYPES } from '../../utils/mockData';
import { getStockStatusColor, getStockStatusText } from '../../utils/helpers';

const BloodStockGrid = () => {
  const [bloodStock, setBloodStock] = useState(INITIAL_BLOOD_STOCK);

  const updateStock = (bloodType, change) => {
    setBloodStock(prev => ({
      ...prev,
      [bloodType]: Math.max(0, prev[bloodType] + change)
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Blood Stock Inventory</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Update All Stock
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {BLOOD_TYPES.map((bloodType) => {
          const units = bloodStock[bloodType];
          const statusColor = getStockStatusColor(units);
          const statusText = getStockStatusText(units);
          
          return (
            <div key={bloodType} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-gray-900">{bloodType}</span>
                {units < 10 && (
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                )}
              </div>
              
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-gray-900 mb-1">{units}</div>
                <div className="text-sm text-gray-600">units available</div>
                <div className={`text-xs font-medium mt-1 ${
                  statusColor === 'green' ? 'text-green-600' :
                  statusColor === 'yellow' ? 'text-yellow-600' :
                  statusColor === 'orange' ? 'text-orange-600' :
                  'text-red-600'
                }`}>
                  {statusText}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => updateStock(bloodType, -1)}
                  className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                
                <div className="flex space-x-1">
                  {units > 20 ? <TrendingUp className="w-4 h-4 text-green-500" /> :
                   units < 5 ? <TrendingDown className="w-4 h-4 text-red-500" /> : null}
                </div>
                
                <button 
                  onClick={() => updateStock(bloodType, 1)}
                  className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Total Units:</span>
          <span className="font-semibold text-gray-900">
            {Object.values(bloodStock).reduce((total, units) => total + units, 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BloodStockGrid;
