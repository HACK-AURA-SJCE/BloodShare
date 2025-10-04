// import React, { useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet.heat';

// const donorLocations = [
//   { coords: [28.7041, 77.1025], count: 50 },
//   { coords: [19.076, 72.8777], count: 35 },
//   { coords: [13.0827, 80.2707], count: 20 },
//   { coords: [22.5726, 88.3639], count: 15 },
//   { coords: [12.9716, 77.5946], count: 40 },
// ];

// const fulfilledRequestsPoints = [
//   [28.7041, 77.1025, 0.5],
//   [19.076, 72.8777, 0.8],
//   [13.0827, 80.2707, 0.4],
//   [22.5726, 88.3639, 0.3],
//   [12.9716, 77.5946, 0.6],
// ];

// const HeatmapLayer = ({ points }) => {
//   const map = useMap();
//   useEffect(() => {
//     const heatLayer = L.heatLayer(points, {
//       radius: 25,
//       blur: 20,
//       maxZoom: 17,
//       max: 1.0,
//       gradient: { 0.1: 'blue', 0.4: 'lime', 0.7: 'orange', 1.0: 'red' },
//     });
//     heatLayer.addTo(map);
//     return () => {
//       heatLayer.remove();
//     };
//   }, [map, points]);
//   return null;
// };

// export default function MapHeatmapVisuals() {
//   const center = [20.5937, 78.9629]; // Center India

//   return (
//     <div className="h-[600px] w-full rounded-xl shadow-lg overflow-hidden max-w-7xl mx-auto">
//       <MapContainer center={center} zoom={5} style={{ height: '100%', width: '100%' }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="&copy; OpenStreetMap contributors"
//         />

//         {donorLocations.map((loc, idx) => (
//           <Marker key={idx} position={loc.coords}>
//             <Popup>🩸 Donors: {loc.count}</Popup>
//           </Marker>
//         ))}

//         <Circle center={center} radius={50000} pathOptions={{ color: 'red', fillOpacity: 0.1 }}>
//           <Popup>SOS Alert Zone (50km)</Popup>
//         </Circle>

//         <HeatmapLayer points={fulfilledRequestsPoints} />
//       </MapContainer>
//     </div>
//   );
// }



import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';
import { Search, Filter, MapPin, Users, Activity, Heart, Hospital, Phone, Navigation, X } from 'lucide-react';

// Enhanced data with more details
const donorLocations = [
  { id: 1, coords: [28.7041, 77.1025], count: 50, city: 'Delhi', bloodTypes: ['A+', 'B+', 'O+'], active: 45 },
  { id: 2, coords: [19.076, 72.8777], count: 35, city: 'Mumbai', bloodTypes: ['A+', 'O+', 'AB+'], active: 30 },
  { id: 3, coords: [13.0827, 80.2707], count: 20, city: 'Chennai', bloodTypes: ['B+', 'O-', 'A+'], active: 18 },
  { id: 4, coords: [22.5726, 88.3639], count: 15, city: 'Kolkata', bloodTypes: ['A-', 'B+', 'O+'], active: 12 },
  { id: 5, coords: [12.9716, 77.5946], count: 40, city: 'Bangalore', bloodTypes: ['A+', 'AB+', 'O+'], active: 35 },
  { id: 6, coords: [23.0225, 72.5714], count: 25, city: 'Ahmedabad', bloodTypes: ['B+', 'A+', 'O+'], active: 22 },
  { id: 7, coords: [17.385, 78.4867], count: 30, city: 'Hyderabad', bloodTypes: ['A+', 'O+', 'B-'], active: 27 },
  { id: 8, coords: [26.9124, 75.7873], count: 18, city: 'Jaipur', bloodTypes: ['O+', 'A+', 'B+'], active: 15 },
];

const hospitals = [
  { id: 1, coords: [28.6139, 77.2090], name: 'AIIMS Delhi', phone: '+91-11-2658-8500', type: 'Government' },
  { id: 2, coords: [19.0760, 72.8777], name: 'Lilavati Hospital', phone: '+91-22-2645-8989', type: 'Private' },
  { id: 3, coords: [13.0475, 80.2179], name: 'Apollo Chennai', phone: '+91-44-2829-3333', type: 'Private' },
  { id: 4, coords: [12.9716, 77.6412], name: 'Manipal Hospital', phone: '+91-80-2502-4444', type: 'Private' },
];

const fulfilledRequestsPoints = [
  [28.7041, 77.1025, 0.8],
  [19.076, 72.8777, 0.9],
  [13.0827, 80.2707, 0.6],
  [22.5726, 88.3639, 0.4],
  [12.9716, 77.5946, 0.7],
  [23.0225, 72.5714, 0.5],
  [17.385, 78.4867, 0.65],
  [26.9124, 75.7873, 0.45],
];

// Custom map icons
const createCustomIcon = (color, icon) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">
      <span style="color: white; font-size: 16px;">${icon}</span>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const HeatmapLayer = ({ points, show }) => {
  const map = useMap();
  const heatLayerRef = useRef(null);

  useEffect(() => {
    if (show && points.length > 0) {
      heatLayerRef.current = L.heatLayer(points, {
        radius: 30,
        blur: 25,
        maxZoom: 17,
        max: 1.0,
        gradient: { 0.1: '#3b82f6', 0.4: '#10b981', 0.7: '#f59e0b', 1.0: '#ef4444' },
      });
      heatLayerRef.current.addTo(map);
    }
    
    return () => {
      if (heatLayerRef.current) {
        heatLayerRef.current.remove();
      }
    };
  }, [map, points, show]);

  return null;
};

const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 10);
    },
  });

  return position === null ? null : (
    <Circle
      center={position}
      radius={5000}
      pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.2 }}
    >
      <Popup>You are here</Popup>
    </Circle>
  );
};

const MapController = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom || 12);
    }
  }, [center, zoom, map]);
  return null;
};

export default function MapHeatmapVisuals() {
  const [selectedBloodType, setSelectedBloodType] = useState('all');
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showDonors, setShowDonors] = useState(true);
  const [showHospitals, setShowHospitals] = useState(true);
  const [showSOSZone, setShowSOSZone] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]);
  const [zoom, setZoom] = useState(5);
  const [stats, setStats] = useState({ totalDonors: 0, activeDonors: 0, cities: 0 });
  const mapRef = useRef(null);

  useEffect(() => {
    const total = donorLocations.reduce((sum, loc) => sum + loc.count, 0);
    const active = donorLocations.reduce((sum, loc) => sum + loc.active, 0);
    setStats({ totalDonors: total, activeDonors: active, cities: donorLocations.length });
  }, []);

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  const filteredDonors = donorLocations.filter(donor => {
    const matchesBloodType = selectedBloodType === 'all' || donor.bloodTypes.includes(selectedBloodType);
    const matchesSearch = donor.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBloodType && matchesSearch;
  });

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setMapCenter(location.coords);
    setZoom(12);
  };

  const handleFindMe = () => {
    if (mapRef.current) {
      mapRef.current.locate();
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Donors</p>
              <p className="text-3xl font-bold">{stats.totalDonors}</p>
            </div>
            <Users className="w-12 h-12 opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Active Donors</p>
              <p className="text-3xl font-bold">{stats.activeDonors}</p>
            </div>
            <Activity className="w-12 h-12 opacity-80" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Cities Covered</p>
              <p className="text-3xl font-bold">{stats.cities}</p>
            </div>
            <MapPin className="w-12 h-12 opacity-80" />
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-white p-4 rounded-lg shadow-lg space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Blood Type:</span>
          <button
            onClick={() => setSelectedBloodType('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedBloodType === 'all'
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          {bloodTypes.map(type => (
            <button
              key={type}
              onClick={() => setSelectedBloodType(type)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedBloodType === type
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Toggle Controls */}
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showDonors}
              onChange={(e) => setShowDonors(e.target.checked)}
              className="w-4 h-4 text-red-500 rounded focus:ring-2 focus:ring-red-500"
            />
            <span className="text-sm text-gray-700">Show Donors</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showHospitals}
              onChange={(e) => setShowHospitals(e.target.checked)}
              className="w-4 h-4 text-blue-500 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Show Hospitals</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showHeatmap}
              onChange={(e) => setShowHeatmap(e.target.checked)}
              className="w-4 h-4 text-orange-500 rounded focus:ring-2 focus:ring-orange-500"
            />
            <span className="text-sm text-gray-700">Show Heatmap</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showSOSZone}
              onChange={(e) => setShowSOSZone(e.target.checked)}
              className="w-4 h-4 text-purple-500 rounded focus:ring-2 focus:ring-purple-500"
            />
            <span className="text-sm text-gray-700">SOS Alert Zone</span>
          </label>
          <button
            onClick={handleFindMe}
            className="ml-auto flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Navigation className="w-4 h-4" />
            <span>Find My Location</span>
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="h-[600px] w-full rounded-xl shadow-lg overflow-hidden relative">
        <MapContainer
          center={mapCenter}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          
          <MapController center={mapCenter} zoom={zoom} />
          <LocationMarker />

          {showDonors && filteredDonors.map((loc) => (
            <Marker
              key={loc.id}
              position={loc.coords}
              icon={createCustomIcon('#ef4444', '🩸')}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <h3 className="font-bold text-lg mb-2 flex items-center">
                    <Heart className="w-5 h-5 mr-2 text-red-500" />
                    {loc.city}
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Total Donors:</strong> {loc.count}</p>
                    <p><strong>Active Now:</strong> {loc.active}</p>
                    <p><strong>Blood Types:</strong> {loc.bloodTypes.join(', ')}</p>
                  </div>
                  <button
                    onClick={() => handleLocationClick(loc)}
                    className="mt-2 w-full bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors text-sm"
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}

          {showHospitals && hospitals.map((hospital) => (
            <Marker
              key={hospital.id}
              position={hospital.coords}
              icon={createCustomIcon('#3b82f6', '🏥')}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <h3 className="font-bold text-lg mb-2 flex items-center">
                    <Hospital className="w-5 h-5 mr-2 text-blue-500" />
                    {hospital.name}
                  </h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Type:</strong> {hospital.type}</p>
                    <p className="flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      {hospital.phone}
                    </p>
                  </div>
                  <button className="mt-2 w-full bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 transition-colors text-sm">
                    Get Directions
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}

          {showSOSZone && (
            <Circle
              center={mapCenter}
              radius={50000}
              pathOptions={{ color: '#8b5cf6', fillColor: '#8b5cf6', fillOpacity: 0.15 }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold">Emergency Alert Zone</h3>
                  <p className="text-sm">50km radius for urgent requests</p>
                </div>
              </Popup>
            </Circle>
          )}

          {showHeatmap && <HeatmapLayer points={fulfilledRequestsPoints} show={showHeatmap} />}
        </MapContainer>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg z-[1000]">
          <h4 className="font-bold text-sm mb-2">Legend</h4>
          <div className="space-y-1 text-xs">
            {showDonors && (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span>Donor Locations</span>
              </div>
            )}
            {showHospitals && (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span>Hospitals</span>
              </div>
            )}
            {showHeatmap && (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 via-green-500 to-red-500 rounded"></div>
                <span>Request Density</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Selected Location Details */}
      {selectedLocation && (
        <div className="bg-white p-6 rounded-lg shadow-lg relative">
          <button
            onClick={() => setSelectedLocation(null)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
          <h3 className="text-2xl font-bold mb-4">{selectedLocation.city}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-red-500">{selectedLocation.count}</p>
              <p className="text-sm text-gray-600">Total Donors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-500">{selectedLocation.active}</p>
              <p className="text-sm text-gray-600">Active Donors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-500">{selectedLocation.bloodTypes.length}</p>
              <p className="text-sm text-gray-600">Blood Types</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-purple-500">{selectedLocation.bloodTypes.join(', ')}</p>
              <p className="text-sm text-gray-600">Available Types</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};