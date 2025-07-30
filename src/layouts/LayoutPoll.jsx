import { Outlet, Link } from "react-router-dom";
import SidebarPoll from '../components/poll/SidebarPoll.jsx';
import Footer from '../components/Footer.jsx';
import HeaderHome from '../components/home/HeaderHome.jsx';

const LayoutAdmin = () => {
  return (
    <>
    <HeaderHome />
        <div className="container-fluid">
          <div className="row">
            <SidebarPoll />
            <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 d-flex">
              <Outlet />
              
            </main>
          </div>
        </div>
        <Footer />
    </>
  );
};

export default LayoutAdmin;
