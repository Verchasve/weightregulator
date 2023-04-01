
import React from "react";
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";

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

function App() {
    
  return (
      <>
     
      
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/operation" element={<OperationPanel/>}/>
        <Route exact path="/admin" element={<AdminPortal/>}/>
        <Route exact path="/prodTable" element={<ProdTable/>}/>
        <Route exact path="/adminServerPortal" element={<AdminServerPortal/>}/>
        <Route exact path="/settingss" element={<Setting/>}/>
        <Route exact path="/setProdEntries" element={<SetProdEntries/>}/>
        <Route exact path="/correction" element={<Correction/>}/>
        <Route exact path="/header" element={<Header/>}/>
        <Route exact path="/footer" element={<Footer/>}/>


      </Routes>
      </BrowserRouter>
      {/* <Setting/> */}
      {/* <BSLC/> */}
      {/* <ProdTable/> */}
      </>
  );
}

export default App;
