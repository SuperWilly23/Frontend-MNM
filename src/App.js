import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';  // Halaman registrasi
import Login from './components/Login';
import UserProfile from './components/UserProfile'; // Halaman profil pengguna

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile />} /> {/* Tambahkan route ke UserProfile */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
