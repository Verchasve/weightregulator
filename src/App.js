import React , { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Home from "./component/Home";
import About from "./component/About";
import AdminPortal from "./component/AdminPortal"
import OperationPanel from "./component/OperationPanel";
import ProdTable from "./component/ProdTable";
import AdminServerPortal from "./component/AdminServerPortal";
import Setting from "./component/Setting";
import SetProdEntries from "./component/SetProdEntries";
import Correction from "./component/Correction";
import Header from "./component/Header";
import Footer from "./component/Footer";
import SetBrandList from "./component/SetBrandList";
import SetSizeList from "./component/SetSizeList";
import SetLayerList from "./component/SetLayerList";
import SetColorList from "./component/SetColorList";
import SetOperatorList from "./component/SetOperatorList";
import DataReport from "./component/DataReport";
import Configuration from "./component/Configuration";
import Port from "./component/Port";


function App() {
  const [drnNumber, setDrnNumber] = useState(0);
  useEffect(() => {
    const savedDrnNumber = localStorage.getItem('drnNumber');
    if (savedDrnNumber) {
      setDrnNumber(parseInt(savedDrnNumber, 10));
    }
  }, []);
  const incrementDrnNumber = () => {
    const newDrnNumber = drnNumber + 1;
    setDrnNumber(newDrnNumber);
    localStorage.setItem('drnNumber', newDrnNumber);
  };

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/operation" element={<OperationPanel incrementDrnNumber={incrementDrnNumber} />} />
          <Route exact path="/admin" element={<AdminPortal />} />
          <Route exact path="/prodTable" element={<ProdTable drnNumber={drnNumber}/>} />
          <Route exact path="/adminServerPortal" element={<AdminServerPortal />} />
          <Route exact path="/settingss" element={<Setting />} />
          <Route exact path="/setProdEntries" element={<SetProdEntries />} />
          <Route exact path="/correction" element={<Correction />} />
          <Route exact path="/header" element={<Header />} />
          <Route exact path="/footer" element={<Footer />} />
          <Route exact path="/setBrandList/*" element={<SetBrandList />} />
          <Route exact path="/setSizeList/*" element={<SetSizeList />} />
          <Route exact path="/setLayerList/*" element={<SetLayerList />} />
          <Route exact path="/setColorList/*" element={<SetColorList />} />
          <Route exact path="/setOperatorList/*" element={<SetOperatorList />} />
          <Route exact path="/dataReport" element={<DataReport />} />
          <Route exact path="/configuration" element={<Configuration />} />
          <Route exact path="/port" element={<Port />} />
         
          
        </Routes>
        
      </Router>

     
    </>
  );
}

export default App;

