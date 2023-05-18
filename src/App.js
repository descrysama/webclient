import NavbarComponent from "./components/NavbarComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import Competitors from "./views/Competitors";

function App() {
  return (
    <BrowserRouter>
      <NavbarComponent/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/competitors" element={<Competitors />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
