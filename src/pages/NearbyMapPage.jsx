import React from 'react';
import MapHeatmapVisuals from '../components/about/MapHeatmapVisuals';

const NearbyMapPage = () => (
  <main className="min-h-screen pt-28 max-w-7xl mx-auto px-4">
    <h1 className="text-4xl font-bold mb-6">Nearby Donors and Hospitals Map</h1>
    <MapHeatmapVisuals />
  </main>
);

export default NearbyMapPage;
