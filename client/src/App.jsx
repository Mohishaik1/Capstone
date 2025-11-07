import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { useState } from "react";

//Components
// import animate from "./components/Animation";
import Time from "./components/Time";

//Pages
import Packages from "./pages/Packages";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import { Register, Login } from "./pages";
import PrivateRoutes from "./pages/PrivateRoutes";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = (alert) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/login" element={<Login alert={alert} showAlert={showAlert} />}></Route>
          <Route
            path="/register" element={<Register alert={alert} showAlert={showAlert} />}></Route>

              <Route element={<PrivateRoutes/>}>
              <Route path="/dashboard" element={<Dashboard alert={alert} showAlert={showAlert}/>}></Route>
              <Route path="/admin" element={<Admin time={<Time/>}/>}></Route>
              
               </Route>
        </Routes>

      
      </BrowserRouter>
    </>
  );
};

export default App;
