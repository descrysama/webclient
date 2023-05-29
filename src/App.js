import NavbarComponent from "./components/NavbarComponent";
import { createContext, useState, useEffect } from "react";
import authServices from './services/authService';
import { ProtectedRoute } from "./middlewares/ProtectedRoute";
import { ProtectLogin } from "./middlewares/ProtectLogin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Competitors from "./views/Competitors";
import EditSku from "./views/competitors/EditSku";
import Suppliers from "./views/Suppliers";


export const appContext = createContext(null);

function App() {

  const [loading, setLoading] = useState(true);
  const [userStatus, setUserStatus] = useState({
    connected: false,
    status: ""
  })

  useEffect(() => {
    checkAuth().then(() => {
      setLoading(false)
    });
  }, [])
  
  const checkAuth = async() => {
    await authServices.check().then((res) => {
      setUserStatus({
        connected: res.status
      })
    })
  }
  
  const appContextContent = {
    connected: userStatus.connected,
    checkAuth
  };

  return (
    !loading ? 
    <appContext.Provider value={appContextContent}>
        <BrowserRouter>
        <ProtectedRoute><NavbarComponent/></ProtectedRoute>
          <Routes>
            <Route path="/" element={<ProtectLogin><Login /></ProtectLogin> } />
            <Route path="/competitors" element={<ProtectedRoute><Competitors /></ProtectedRoute>} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/sku/edit/:SkuId" element={<EditSku />} />
          </Routes>
        </BrowserRouter>
    </appContext.Provider> : null
  );
}

export default App;
