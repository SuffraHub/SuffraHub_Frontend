import { Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

const HeaderHome = () => {
  return (
    <nav className="navbar bg-body-tertiary border">
      <div className="container-fluid d-flex justify-content-between align-items-center">

        {/* Dropdown menu po lewej */}
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Menu
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li><button className="dropdown-item">Profile</button></li>
            <li>
              <Link to="/login" className="dropdown-item">
                <b>Stwórz</b> głosowanie
              </Link>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li><button className="dropdown-item">Logout</button></li>
          </ul>
        </div>

        {/* Wycentrowany brand */}
        <div className="d-flex align-items-center justify-content-center flex-grow-1">
          <Link className="navbar-brand text-center" to="#">
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

        {/* Toggle Dark Mode po prawej */}
        <div>
          <button className="btn btn-outline-secondary">
            🌓
          </button>
        </div>

      </div>
    </nav>
  );
};

export default HeaderHome;
