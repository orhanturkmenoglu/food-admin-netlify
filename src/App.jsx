import React, { useState } from "react";
import { Route, Routes } from "react-router";
import AddFood from "./pages/AddFood/AddFood";
import ListFood from "./pages/ListFood/ListFood";
import Orders from "./pages/Orders/Orders";
import ContactMessages from "./pages/ContactMessages/ContactMessages";
import Sidebar from "./components/Sidebar/Sidebar";
import Menubar from "./components/Menubar/Menubar";

import { ToastContainer } from "react-toastify";

function App() {
  /*toogle buton için yan side menu açılır kapanır durumu kontrolü*/
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebarVisible = () => {
  setSidebarVisible(prev => {
    console.log("Sidebar visible?", !prev);
    return !prev;
  });
};

  return (
    <div>
      <div className="d-flex" id="wrapper">
        <Sidebar sidebarVisible={sidebarVisible} />
        <div id="page-content-wrapper">
          <Menubar toggleSidebar={toggleSidebarVisible} />
          <ToastContainer />
          <div className="container-fluid">
            <Routes>
              <Route path="/add" element={<AddFood />} />
              <Route path="/list" element={<ListFood />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/" element={<ListFood />} />
              <Route path="/contact-messages" element={<ContactMessages />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
