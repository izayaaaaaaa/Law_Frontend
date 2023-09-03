// app.js 

import React from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './scenes/loginPage';
import Navbar from './scenes/navbar';
import RegisterPage from './scenes/registerPage';
import SearchPage from './scenes/searchPage';
import SearchResultsPage from './scenes/searchResultsPage';
import LawContentPage from './scenes/lawContentPage';
import UserProfile from './scenes/userProfilePage/UserProfile';
import AdminDashboard from './scenes/adminDashboardPage/adminDashboard';
import './styles/components.css';
import './styles/general.css';

const hostUrl = "http:///192.168.100.7"; 

const BackgroundWrapper = ({ children }) => {
  const location = useLocation();

  // Conditionally apply the appropriate background class based on the route
  const getBackgroundClass = () => {
    if (location.pathname === '/search-results') {
      return 'white-bg'; // For search results page
    } else if (location.pathname === '/search') {
      return 'search-bg'; // For search page
    } else {
      return 'default-bg'; // Use the default class for other pages
    }
  };

  // Conditionally apply padding for search results page
  const getContentStyles = () => {
    if (location.pathname === '/search-results') {
      return { paddingTop: '10vh' }; // For search results page
    } else if (location.pathname === '/register') {
      return { paddingTop: '13vh' }; // For register page
    } else if (location.pathname === '/search') {
      return { paddingTop: '0' }; // For search page
    } else {
      return { paddingTop: '25vh' }; // Padding for loginPage
    }
  };

  return (
    <div className={`App ${getBackgroundClass()}`}>
      <div style={getContentStyles()}>{children}</div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <BackgroundWrapper>
          <div className="NavbarPosition">
            <Navbar />
          </div>
          <Routes>
            <Route path="/" element={<LoginPage hostUrl={hostUrl} />} />
            <Route path="/register" element={<RegisterPage hostUrl={hostUrl} />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/search-results" element={<SearchResultsPage />} />
            <Route path="/law-content/:lawId" element={<LawContentPage />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/admin-dashboard" element={<AdminDashboard hostUrl={hostUrl} />} />
          </Routes>
        </BackgroundWrapper>
      </div>
    </BrowserRouter>
  );
}

export default App;