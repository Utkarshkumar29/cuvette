import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUpPage';
import Feed from './pages/feed';
import UserSignUp from './pages/userSignUp';
import CompanyDashboard from './pages/company';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/signUp" />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/user/signUp" element={<UserSignUp />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/companyDashboard" element={<CompanyDashboard />} />
      </Routes>
    </Router>
  );
}

export default App; 
