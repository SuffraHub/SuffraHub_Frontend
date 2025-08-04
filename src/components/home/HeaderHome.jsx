import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

const HeaderHome = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/user-info', { withCredentials: true })
      .then(res => {
        setLoggedIn(res.data.loggedIn);
        console.log((res.data.loggedIn));
      })
      .catch(() => {
        setLoggedIn(false);
      });
  }, []);

  const handleLogout = () => {
    axios.post('http://localhost:8000/logout', null, { withCredentials: true })
  .then(res => {
    setLoggedIn(false);
  })
  .catch(err => {
    console.error('Logout error:', err);
  });

  };

  return (
    <nav className="navbar bg-body-tertiary border">
      <div className="container-fluid d-flex justify-content-between align-items-center">

        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="bi bi-list"></i>
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
  { !loggedIn && (
    <li>
      <Link
        to="/user/login"
        className="dropdown-item text-success fw-bold"
      >
        <i className="bi bi-door-open"></i> Login
      </Link>
    </li>
  )}
  { !loggedIn && <li><hr className="dropdown-divider" /></li> }

  { loggedIn && (
    <>
    <li>
      
      <Link
        className="dropdown-item fw-bold"
        to="/admin"
      >
        <i className="bi bi-house-gear"></i> Admin
      </Link>
    </li>
    <hr />
        <li>
      <button
        className="dropdown-item fw-bold"
        onClick={handleLogout}
      >
        <i className="bi bi-door-closed"></i> Logout
      </button>
    </li>
    </>
  )}
</ul>

        </div>

        <div className="d-flex align-items-center justify-content-center flex-grow-1">
          <Link className="navbar-brand text-center" to="/">
            <img
              src="/img/icon.png"
              alt="Logo"
              width="30"
              height="30"
              className="d-inline-block align-text-top me-2"
            />
            <b>SuffraHub</b>
          </Link>
        </div>

        <div>
          <button className="btn btn-outline-secondary">
            <i className="bi bi-moon-stars-fill"></i>
          </button>
        </div>

      </div>
    </nav>
  );
};

export default HeaderHome;
