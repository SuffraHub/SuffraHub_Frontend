import { Outlet, Link } from "react-router-dom";
import SidebarPoll from '../components/poll/SidebarPoll.jsx';
import Footer from '../components/Footer.jsx';

const LayoutAdmin = () => {
  return (
    <>
    <nav className="navbar bg-body-tertiary border">
      <div className="container-fluid">
        <Link className="navbar-brand align-self-center" to="#">
          <img
            src="/img/icon.png"
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-text-top"
          />
          <b>SuffraHub</b>
        </Link>
      </div>
    </nav>
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
