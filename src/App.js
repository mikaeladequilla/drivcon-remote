import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Portal from "./components/Portal";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import OurTeam from "./components/OurTeam";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle user login
  const handleLogin = () => {
    // Perform login logic and set isLoggedIn to true if login is successful
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        {isLoggedIn ? (
          <Route path="/portal" element={<Portal />} />
        ) : (
          <Route path="/portal" element={<Navigate to="/login" />} />
        )}
        <Route path="/our-team" element={<OurTeam />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
