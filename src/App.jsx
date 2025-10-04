// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import { NotificationProvider } from './context/NotificationContext';
// import Navbar from './components/common/Navbar';
// import Footer from './components/common/Footer';
// import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
// import DonorDashboard from './pages/DonorDashboard';
// import HospitalDashboard from './pages/HospitalDashboard';

// const PrivateRoute = ({ children, type }) => {
//   const { user, userType } = useAuth();
  
//   if (!user) {
//     return <Navigate to="/login" />;
//   }
  
//   if (type && userType !== type) {
//     return <Navigate to={userType === 'donor' ? '/donor/dashboard' : '/hospital/dashboard'} />;
//   }
  
//   return children;
// };

// function App() {
//   return (
//     <AuthProvider>
//       <NotificationProvider>
//         <Router>
//           <div className="min-h-screen bg-gray-50 flex flex-col">
//             <Navbar />
//             <main className="flex-grow">
//               <Routes>
//                 <Route path="/" element={<HomePage />} />
//                 <Route path="/login" element={<LoginPage />} />
//                 <Route path="/signup" element={<SignupPage />} />
//                 <Route 
//                   path="/donor/dashboard" 
//                   element={
//                     <PrivateRoute type="donor">
//                       <DonorDashboard />
//                     </PrivateRoute>
//                   } 
//                 />
//                 <Route 
//                   path="/hospital/dashboard" 
//                   element={
//                     <PrivateRoute type="hospital">
//                       <HospitalDashboard />
//                     </PrivateRoute>
//                   } 
//                 />
//                 <Route path="*" element={<Navigate to="/" />} />
//               </Routes>
//             </main>
//             <Footer />
//           </div>
//         </Router>
//       </NotificationProvider>
//     </AuthProvider>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DonorDashboard from './pages/DonorDashboard';
import HospitalDashboard from './pages/HospitalDashboard';

// Import the new info pages
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import BloodFactsPage from './pages/BloodFactsPage';
import HelpPage from './pages/HelpPage';
import FaqPage from './pages/FaqPage';
import NearbyMapPage from './pages/NearbyMapPage';

const PrivateRoute = ({ children, type }) => {
  const { user, userType } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (type && userType !== type) {
    return <Navigate to={userType === 'donor' ? '/donor/dashboard' : '/hospital/dashboard'} />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* Private donor and hospital dashboard routes */}
                <Route
                  path="/donor/dashboard"
                  element={
                    <PrivateRoute type="donor">
                      <DonorDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/hospital/dashboard"
                  element={
                    <PrivateRoute type="hospital">
                      <HospitalDashboard />
                    </PrivateRoute>
                  }
                />

                {/* Quick info pages */}
                <Route path="/about" element={<AboutPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/blood-facts" element={<BloodFactsPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/faq" element={<FaqPage />} />
                 <Route path="/nearby" element={<NearbyMapPage />} />

                {/* Fallback redirect */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
