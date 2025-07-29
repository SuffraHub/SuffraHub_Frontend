import { Routes, Route, HashRouter } from 'react-router-dom';

// Layouty
import LayoutDefault from './layouts/LayoutDefault.jsx';
import LayoutAdmin from './layouts/LayoutAdmin.jsx';

// Strony publiczne
import Home from './pages/Home.jsx';
import LoginPage from './pages/Login.jsx';
// import RegisterPage from './pages/Register.jsx'; // jeśli chcesz dodać rejestrację

// Strony admina
import AdminHome from './pages/AdminHome.jsx';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Publiczne layouty */}
        <Route element={<LayoutDefault />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/register" element={<RegisterPage />} /> */}
        </Route>

        {/* Admin layout */}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<AdminHome />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;
