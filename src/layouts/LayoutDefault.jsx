// LAYOUT dla zwykłych stron
import { Outlet, Link } from "react-router-dom";
import Footer from '../components/Footer.jsx';

const Layout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  )
};

export default Layout;
