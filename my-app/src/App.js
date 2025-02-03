import React from 'react';
import LandPage from './LandPage/LandPage';  // Correct import for the file inside LandPage folder



function App() {
  return (
    <div>
          {/* Navbar */}
    <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#profile">My Profile</a></li>
          <li><a href="#search">Search</a></li>
          <li><a href="#calendar">Calendar</a></li>
          <li><a href="#DM">DM</a></li>
        </ul>
      </nav>

    <LandPage />  {/* Render the LandingPage component */}
  </div>
);
}

export default App;
