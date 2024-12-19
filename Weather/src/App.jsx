import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import LandingPage from "./pages/LandingPage/LandingPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import History from "./pages/History/History";
import Mador from "./pages/Mador/Mador";

const App = () => {
  
  return (
    <div className="body">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/history" element={<History/>}/>
          <Route path="/home" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mador" element={<Mador />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
