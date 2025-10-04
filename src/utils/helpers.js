export const calculateDaysSinceLastDonation = (lastDonationDate) => {
  if (!lastDonationDate) return null;
  
  const last = new Date(lastDonationDate);
  const today = new Date();
  const diffTime = Math.abs(today - last);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
};

export const isEligibleToDonate = (lastDonationDate, gender = 'Male') => {
  const daysSince = calculateDaysSinceLastDonation(lastDonationDate);
  
  if (daysSince === null) return true;
  
  // Male donors can donate every 90 days, female donors every 120 days
  const minDays = gender === 'Female' ? 120 : 90;
  
  return daysSince >= minDays;
};

export const getDaysUntilEligible = (lastDonationDate, gender = 'Male') => {
  const daysSince = calculateDaysSinceLastDonation(lastDonationDate);
  
  if (daysSince === null) return 0;
  
  const minDays = gender === 'Female' ? 120 : 90;
  const daysRemaining = minDays - daysSince;
  
  return daysRemaining > 0 ? daysRemaining : 0;
};

export const getStockStatusColor = (units) => {
  if (units >= 20) return 'green';
  if (units >= 10) return 'yellow';
  if (units >= 5) return 'orange';
  return 'red';
};

export const getStockStatusText = (units) => {
  if (units >= 20) return 'Good';
  if (units >= 10) return 'Moderate';
  if (units >= 5) return 'Low';
  return 'Critical';
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

export const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  // Haversine formula for calculating distance between two coordinates
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance.toFixed(1);
};