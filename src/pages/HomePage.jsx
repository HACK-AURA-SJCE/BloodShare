import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import StatsSection from '../components/home/StatsSection';

const HomePage = () => {
  return (
    <div className="pt-16">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
    </div>
  );
};

export default HomePage;