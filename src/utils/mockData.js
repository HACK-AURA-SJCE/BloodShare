export const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const MOCK_DONORS = [
  { 
    id: 1, 
    name: 'Ujjwal Rai', 
    email: 'ujjwal@example.com', 
    bloodType: 'O+', 
    phone: '9876543578', 
    lastDonation: '2024-01-15', 
    status: 'eligible', 
    location: 'Patna, Bihar',
    address: '123 Main Street, Patna',
    dob: '1990-05-15',
    gender: 'Male',
    totalDonations: 7
  },
  { 
    id: 2, 
    name: 'Hema', 
    email: 'hema@example.com', 
    bloodType: 'A+', 
    phone: '9876543756', 
    lastDonation: '2024-03-20', 
    status: 'eligible', 
    location: 'Mysuru, Karnataka',
    address: '456 Park Avenue, Mysuru',
    dob: '2005-08-22',
    gender: 'Female',
    totalDonations: 5
  },
  { 
    id: 3, 
    name: 'Adarsh', 
    email: 'adarsh@example.com', 
    bloodType: 'B+', 
    phone: '9876543212', 
    lastDonation: '2024-02-10', 
    status: 'eligible', 
    location: 'Gujarat, Ahmedabad',
    address: '789 Lake Road, Ahmedabad',
    dob: '2005-12-03',
    gender: 'Male',
    totalDonations: 12
  }
];

export const MOCK_HOSPITALS = [
  { 
    id: 1, 
    name: 'City General Hospital', 
    email: 'city@hospital.com', 
    phone: '0612-2234567', 
    emergencyContact: '0612-2234568',
    location: 'Patna, Bihar',
    address: 'Boring Road, Patna - 800001',
    type: 'Government', 
    beds: 500,
    regNumber: 'HOSP/2020/001'
  },
  { 
    id: 2, 
    name: 'Metro Hospital', 
    email: 'metro@hospital.com', 
    phone: '0612-2234569', 
    emergencyContact: '0612-2234570',
    location: 'Patna, Bihar',
    address: 'Fraser Road, Patna - 800001',
    type: 'Private', 
    beds: 300,
    regNumber: 'HOSP/2019/045'
  }
];

export const INITIAL_BLOOD_STOCK = {
  'A+': 24, 
  'A-': 8, 
  'B+': 18, 
  'B-': 3, 
  'AB+': 12, 
  'AB-': 5, 
  'O+': 31, 
  'O-': 2
};

export const MOCK_REQUESTS = [
  { 
    id: 1, 
    bloodType: 'O-', 
    priority: 'urgent', 
    patientId: '#12847', 
    department: 'ICU', 
    time: '30 mins ago', 
    respondingDonors: 3,
    unitsNeeded: 2,
    hospitalId: 1
  },
  { 
    id: 2, 
    bloodType: 'A+', 
    priority: 'scheduled', 
    patientId: '#12851', 
    department: 'Surgery', 
    time: '2 hours ago', 
    respondingDonors: 1,
    unitsNeeded: 3,
    hospitalId: 1
  }
];

export const MOCK_DONATIONS = [
  {
    id: 1,
    hospital: 'Metro Hospital',
    date: '2024-03-15',
    status: 'Completed',
    units: 1,
    bloodType: 'O+'
  },
  {
    id: 2,
    hospital: 'City General Hospital',
    date: '2024-01-08',
    status: 'Completed',
    units: 1,
    bloodType: 'O+'
  },
  {
    id: 3,
    hospital: 'Central Medical',
    date: '2023-11-22',
    status: 'Completed',
    units: 1,
    bloodType: 'O+'
  }
];

export const MOCK_BLOOD_CAMPS = [
  {
    id: 1,
    name: 'Community Blood Drive',
    location: 'Community Center, Patna',
    date: '2024-10-05',
    time: '9:00 AM - 5:00 PM',
    distance: '1.5 km',
    organizer: 'Red Cross Society'
  },
  {
    id: 2,
    name: 'Corporate Blood Camp',
    location: 'Tech Park, Patna',
    date: '2024-10-12',
    time: '10:00 AM - 4:00 PM',
    distance: '3.2 km',
    organizer: 'Tech Companies Association'
  }
];