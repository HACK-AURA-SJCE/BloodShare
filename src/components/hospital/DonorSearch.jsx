// src/components/hospital/DonorSearch.jsx
import React, { useState } from 'react';
import { Search, MapPin, Phone, User, Filter } from 'lucide-react';
import { MOCK_DONORS, BLOOD_TYPES } from '../../utils/mockData';

const DonorSearch = () => {
  const [searchFilters, setSearchFilters] = useState({
    bloodType: '',
    location: '',
    availability: 'all'
  });
  const [searchResults, setSearchResults] = useState(MOCK_DONORS);

  const handleSearch = () => {
    let filtered = MOCK_DONORS;
    
    if (searchFilters.bloodType) {
      filtered = filtered.filter(donor => donor.bloodType === searchFilters.bloodType);
    }
    
    if (searchFilters.location) {
      filtered = filtered.filter(donor => 
        donor.location.toLowerCase().includes(searchFilters.location.toLowerCase())
      );
    }
    
    if (searchFilters.availability === 'eligible') {
      filtered = filtered.filter(donor => donor.status === 'eligible');
    }
    
    setSearchResults(filtered);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Find Donors</h2>
        <Filter className="w-6 h-6 text-gray-400" />
      </div>

      {/* Search Filters */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
          <select
            value={searchFilters.bloodType}
            onChange={(e) => setSearchFilters({...searchFilters, bloodType: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Types</option>
            {BLOOD_TYPES.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={searchFilters.location}
            onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            placeholder="Enter location"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
          <select
            value={searchFilters.availability}
            onChange={(e) => setSearchFilters({...searchFilters, availability: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Donors</option>
            <option value="eligible">Available Now</option>
          </select>
        </div>
        
        <div className="flex items-end">
          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <Search className="w-4 h-4 inline mr-2" />
            Search
          </button>
        </div>
      </div>

      {/* Search Results */}
      <div className="space-y-3">
        <h3 className="font-medium text-gray-900">
          {searchResults.length} donor(s) found
        </h3>
        
        {searchResults.map((donor) => (
          <div key={donor.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600 font-bold text-sm">{donor.bloodType}</span>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900">{donor.name}</h4>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                  <span className="flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {donor.location}
                  </span>
                  <span className="flex items-center">
                    <User className="w-3 h-3 mr-1" />
                    {donor.totalDonations} donations
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                donor.status === 'eligible' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {donor.status}
              </span>
              
              <button className="text-blue-600 hover:text-blue-700 p-2">
                <Phone className="w-4 h-4" />
              </button>
              
              <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-700 transition-colors">
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonorSearch;
