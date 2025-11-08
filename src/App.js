import './App.css';
import Login from "./components/Login.jsx";
import Notification from './components/Notification.jsx';
import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/notifications" element={<Notification />} />
      </Routes>
    </BrowserRouter>

    );
}

export default App;
