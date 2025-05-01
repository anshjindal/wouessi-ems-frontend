import React from "react"; 
import Sidebar from "../components/layout/Sidebar";
import { Outlet } from "react-router-dom";  

const GlobalWrapper = () => {
  return (
    <div className="global-layout"> 
      <Sidebar></Sidebar> 
      <section className="section1"> 
        {/** The Outlet component will render the children routes */}
        <Outlet />
      </section>
    </div> 
  );
};

export default GlobalWrapper;
