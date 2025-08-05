import { Routes, Route, HashRouter } from 'react-router-dom';

// Layouty
import LayoutLogin from './layouts/LayoutLogin.jsx';
import LayoutAdmin from './layouts/LayoutAdmin.jsx';
import LayoutPoll from './layouts/LayoutPoll.jsx';
import LayoutHome from './layouts/LayoutHome.jsx';

// Strona domowa
import Home from './pages/Home.jsx';

// Strony logowania
import Login from './pages/user/Login.jsx';
import Register from './pages/user/Register.jsx';
import RegisterToTenant from './pages/user/RegisterToTenant.jsx';

// Strony polls
import PollPage from './pages/Poll.jsx';
import PollSummary from './pages/PollSummary.jsx';

// Dashboard
import AdminAccount from './pages/admin/Account.jsx';
import AdminHome from './pages/admin/Home.jsx';
import AdminPolls from './pages/admin/Polls.jsx';
import AdminQuestion from './pages/admin/Questions.jsx';
import AdminTenant from './pages/admin/Tenant.jsx';
import QuestionEdit from './pages/admin/QuestionEdit.jsx';
import AnswerOptions from './pages/admin/AnswerOptions.jsx';
import VoteCodes from './pages/admin/VoteCodes.jsx';
import AdminReports from './pages/admin/Reports.jsx';
import PollEdit from './pages/admin/PollEdit.jsx';
import PollReport from './pages/admin/PollReport.jsx';

import ProtectedRoute from './components/ProtectedRoute.jsx';

const App = () => {
  return (
    <HashRouter>
      <Routes>

        {/* Publiczne layouty */}
        <Route element={<LayoutHome />}>
          <Route path="/" element={<Home />} />
          <Route path="poll/summary" element={<PollSummary />} />


          <Route path="user" element={<LayoutLogin />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="admin/register_to_tenant" element={<RegisterToTenant />} />
          </Route>
        </Route>

        {/* Layout 'głosowanie' */}
        <Route element={<LayoutPoll />}>
          <Route path="poll" element={<PollPage />} />
        </Route>

        {/* Layout Admin */}
        <Route path="admin" element={<LayoutAdmin />}>

          {/* Standard user */}
          <Route
            path="account"
            element={
              <ProtectedRoute allowedPermissions={[0, 1, 2, 3, 4, 5, 6]}>
                <AdminAccount />
              </ProtectedRoute>
            }
          />
          <Route
            index
            element={
              <ProtectedRoute allowedPermissions={[0, 1, 2, 3, 4, 5, 6]}>
                <AdminHome />
              </ProtectedRoute>
            }
          />

          {/* Viewer+ */}
          <Route
            path="reports"
            element={
              <ProtectedRoute allowedPermissions={[1, 2, 3, 4, 5, 6]}>
                <AdminReports />
              </ProtectedRoute>
            }
          />
          <Route
            path="reports/poll/:poll_id"
            element={
              <ProtectedRoute allowedPermissions={[1, 2, 3, 4, 5, 6]}>
                <PollReport />
              </ProtectedRoute>
            }
          />

          {/* Editor+ */}
          <Route
            path="polls"
            element={
              <ProtectedRoute allowedPermissions={[2, 3, 4, 5, 6]}>
                <AdminPolls />
              </ProtectedRoute>
            }
          />
          <Route
            path="polls/edit/:pollId"
            element={
              <ProtectedRoute allowedPermissions={[2, 3, 4, 5, 6]}>
                <PollEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="questions"
            element={
              <ProtectedRoute allowedPermissions={[2, 3, 4, 5, 6]}>
                <AdminQuestion />
              </ProtectedRoute>
            }
          />
          <Route
            path="questions/edit"
            element={
              <ProtectedRoute allowedPermissions={[2, 3, 4, 5, 6]}>
                <QuestionEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="answer_options"
            element={
              <ProtectedRoute allowedPermissions={[2, 3, 4, 5, 6]}>
                <AnswerOptions />
              </ProtectedRoute>
            }
          />

          {/* Moderator+ */}
          <Route
            path="tenant"
            element={
              <ProtectedRoute allowedPermissions={[3, 4, 5, 6]}>
                <AdminTenant />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<div>404 – Nie znaleziono strony</div>} />
      </Routes>
    </HashRouter>
  );
};

export default App;
