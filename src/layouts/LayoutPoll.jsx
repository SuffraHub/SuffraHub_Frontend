import { Outlet, Link, useLocation } from "react-router-dom";
import SidebarPoll from '../components/poll/SidebarPoll.jsx';
import Footer from '../components/Footer.jsx';
import HeaderHome from '../components/home/HeaderHome.jsx';
import { useState } from "react";

const LayoutPoll = () => {
  const location = useLocation();
  const { state } = location; 

  return (
    <>
    <HeaderHome />
        <div className="container-fluid">
          <div className="row">
            <SidebarPoll data={state}/>
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 d-flex">
              <Outlet/>
            </main>
          </div>
        </div>
        <Footer />
    </>
  );
};

export default LayoutPoll;
