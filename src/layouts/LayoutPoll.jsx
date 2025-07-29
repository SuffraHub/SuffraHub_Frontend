import { Outlet } from "react-router-dom";
import SidebarPoll from '../components/poll/SidebarPoll.jsx';
import Footer from '../components/Footer.jsx';

const LayoutAdmin = () => {
  return (
    <>
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
