// src/utils/constants.js

// Blood types
export const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const BLOOD_TYPE_COLORS = {
  'A+': 'bg-red-500',
  'A-': 'bg-red-600',
  'B+': 'bg-blue-500',
  'B-': 'bg-blue-600',
  'AB+': 'bg-purple-500',
  'AB-': 'bg-purple-600',
  'O+': 'bg-green-500',
  'O-': 'bg-green-600',
};

// Priority levels
export const PRIORITY_COLORS = {
  urgent: 'red',
  high: 'orange',
  moderate: 'yellow',
  scheduled: 'blue',
};

// Hospital types
export const HOSPITAL_TYPES = ['Government', 'Private', 'Charitable'];

// Gender types
export const GENDERS = ['Male', 'Female', 'Other'];

// Donation eligibility rules
export const DONATION_ELIGIBILITY_DAYS = {
  Male: 90,
  Female: 120,
};

export const MIN_AGE_TO_DONATE = 18;
export const MAX_AGE_TO_DONATE = 65;

// App routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DONOR_DASHBOARD: '/donor/dashboard',
  HOSPITAL_DASHBOARD: '/hospital/dashboard',
};
