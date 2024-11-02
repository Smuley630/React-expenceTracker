// App.js
// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DataFetchingComponent from './DataFetchingComponent';
import EmployeeDetails from './EmployeeDetails'
import OTPVerification from './OTP/OTP';
import Home from './Home'
import Signup from './OTP/Signup';
import AddReview from './Review/AddReview'
import SeeReview from './Review/SeeReview'
import ProtectedRoute from './Authenticator/ProtectedRoute';
import { AuthProvider } from './Authenticator/AuthProvider ';

const About = () => {
  return (
      <div>
          <h2>About Screen</h2>
          <Link to="/">Go to Home</Link>
      </div>
  );
};


// Details Screen


const App = () => {
  return (
      <AuthProvider>
          <Router>
              <Routes>
                  <Route path="/" element={<OTPVerification />} />
                  <Route path="/about" element={<DataFetchingComponent />} />
                  <Route path="/home" element={
                          <ProtectedRoute>
                              <Home />
                          </ProtectedRoute>
                      }
                  />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/signup/home" element={<Home />} />
                  <Route path="/home/addReview" element={<AddReview />} />
                  <Route path="/home/seeReview" element={<SeeReview />} />
                  <Route path="/home/details" element={<EmployeeDetails />} />
              </Routes>
          </Router>
      </AuthProvider>
  );
};


export default App;
