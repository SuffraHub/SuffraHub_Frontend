import { Routes, Route, HashRouter } from 'react-router-dom';

// Layouty
import LayoutDefault from './layouts/LayoutDefault.jsx';
import LayoutAdmin from './layouts/LayoutAdmin.jsx';

// Strony publiczne
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
// import RegisterPage from './pages/Register.jsx'; // jeśli chcesz dodać rejestrację

// Strony admina
import AdminHome from './pages/AdminHome.jsx';
import Register from './pages/Register.jsx';
import AdminPolls from './pages/AdminPolls.jsx';
import AdminQuestion from './pages/AdminQuestions.jsx';
import AdminAccount from './pages/AdminAccount.jsx';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Publiczne layouty */}
        <Route element={<LayoutDefault />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>}/>
          {/* <Route path="/register" element={<RegisterPage />} /> */}
        </Route>

        {/* Admin layout */}
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<AdminHome />} />
          <Route path="polls" element={<AdminPolls />} />
          <Route path="questions" element={<AdminQuestion/>}/>
          <Route path="account" element={<AdminAccount/>}/>
        </Route>

      </Routes>
    </HashRouter>
  );
};

export default App;
