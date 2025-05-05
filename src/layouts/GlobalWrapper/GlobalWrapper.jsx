import React from "react";  
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";  

const GlobalWrapper = () => {
  return (
    <div className="global-layout"> 
      <Sidebar></Sidebar> 
      <main className="main-content"> 
        {/** The Outlet component will render the children routes */}
        <Outlet />
      </main>
    </div> 
  );
};

export default GlobalWrapper;
