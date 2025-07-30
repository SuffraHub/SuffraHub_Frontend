// LAYOUT dla zwykłych stron
import { Outlet, Link } from "react-router-dom";
import HeaderHome from "../components/home/HeaderHome.jsx";
import Footer from '../components/Footer.jsx';

const Layout = () => {
  return (
    <>
        <HeaderHome />
        <Outlet />
        <Footer />
    </>
  )
};

export default Layout;
