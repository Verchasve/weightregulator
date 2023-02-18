
import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";

import Home from "./component/Home";
import About from "./component/About";
import AdminPortal from "./component/AdminPortal"
import OperationPanel from "./component/OperationPanel";

function App() {
    
  return (
      <>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/operation" element={<OperationPanel/>}/>
        <Route exact path="/admin" element={<AdminPortal/>}/>
      </Routes>
      </BrowserRouter>
      </>
  );
}

export default App;
