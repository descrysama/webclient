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
import { fetchAllSku } from "./services/skuService";


export const appContext = createContext(null);

function App() {

  const [loading, setLoading] = useState(true);
  const [competitorLinksArray, setCompetitorLinksArray] = useState('');
  const [userStatus, setUserStatus] = useState({
    connected: false,
    status: ""
  })

  const FreshArray = (item) => {
    let copyArray = [...competitorLinksArray];
    let index = copyArray.findIndex(object => {
      return item.id === object.id
    })
    console.log(item)
    console.log(index)
    copyArray.splice(index, 1, item)
    setCompetitorLinksArray(copyArray)
  }

  const addToArray = (item) => {
    let copyArray = [...competitorLinksArray];
    let index = copyArray.findIndex(object => {
      return item.id === object.id
    })
    console.log(item)
    console.log(index)
    copyArray.unshift(item)
    setCompetitorLinksArray(copyArray)
  }

  useEffect(() => {
    checkAuth().then(() => {
      fetchAllSku().then((res) => {
        setLoading(false)
        setCompetitorLinksArray(res.reverse())
      })
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
    competitorLinksArray,
    checkAuth,
    FreshArray,
    addToArray
  };

  return (
    <appContext.Provider value={appContextContent}>
        <BrowserRouter>
        <ProtectedRoute><NavbarComponent/></ProtectedRoute>
          <Routes>
            <Route path="/" element={<ProtectLogin><Login /></ProtectLogin> } />
            {!loading ? <Route path="/competitors" element={<ProtectedRoute><Competitors /></ProtectedRoute>} /> : null}
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/sku/edit/:SkuId" element={<EditSku />} />
          </Routes>
        </BrowserRouter>
    </appContext.Provider>
  );
}

export default App;
