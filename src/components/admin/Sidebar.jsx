import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [activePolls] = useState([
    { id: 1, name: 'Aktywne głosowanie 1' },
    { id: 2, name: 'Aktywne głosowanie 2' },
  ]);

  const [closedPolls] = useState([
    { id: 3, name: 'Zamknięte głosowanie 1' },
  ]);

  const [inactivePolls] = useState([
    { id: 4, name: 'Nieaktywne głosowanie 1' },
  ]);

  // Stany widoczności sekcji
  const [isActiveOpen, setIsActiveOpen] = useState(true);
  const [isClosedOpen, setIsClosedOpen] = useState(false);
  const [isInactiveOpen, setIsInactiveOpen] = useState(false);

  const renderPollList = (polls) => (
    <ul className="ms-2">
      {polls.length > 0 ? (
        polls.map(poll => (
          <li key={poll.id}>
            <Link
              to={`/poll/${poll.id}`}
              className="btn btn-link p-0 text-start"
              style={{ textDecoration: 'none' }}
            >
              {poll.name}
            </Link>
          </li>
        ))
      ) : (
        <li className="text-secondary">brak</li>
      )}
    </ul>
  );

  return (
    <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
      <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabIndex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title text-white" id="sidebarMenuLabel">
            Dzierżawa:<br /> <b>Firma ABC</b>
          </h5>
          <button type="button" className="btn-close text-white" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2 active" to="/">
                <i className="bi bi-house-fill text-black"></i>
                Strona główna
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2" to="/admin">
                <i className="bi bi-house-gear-fill text-black"></i>
                Panel administracyjny
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2" to="/questions">
                <i className="bi bi-database text-black"></i>
                Baza pytań
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2" to="/tenant">
                <i className="bi bi-people text-black"></i>
                Dzierżawa
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2" to="/reports">
                <i className="bi bi-graph-up text-black"></i>
                Raporty
              </Link>
            </li>
          </ul>

          <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
            <span>Moje głosowania</span>
            <Link className="link-secondary" to="/polls/new" aria-label="Dodaj nowe głosowanie">
              <i className="bi bi-plus-circle text-black"></i>
            </Link>
          </h6>

          <ul className="nav flex-column mb-auto">
            {/* Aktywne */}
            <li className="nav-item">
              <button
                className="nav-link d-flex align-items-center gap-2 btn btn-link"
                onClick={() => setIsActiveOpen(!isActiveOpen)}
                aria-expanded={isActiveOpen}
                aria-controls="collapseActive"
                style={{ textDecoration: 'none' }}
              >
                <i className="bi bi-file-earmark-text text-black"></i>
                Otwarte
                <i className={`bi ms-auto text-black ${isActiveOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
              </button>
              {isActiveOpen && (
                <div id="collapseActive">
                  {renderPollList(activePolls)}
                </div>
              )}
            </li>

            {/* Zamknięte */}
            <li className="nav-item">
              <button
                className="nav-link d-flex align-items-center gap-2 btn btn-link"
                onClick={() => setIsClosedOpen(!isClosedOpen)}
                aria-expanded={isClosedOpen}
                aria-controls="collapseClosed"
                style={{ textDecoration: 'none' }}
              >
                <i className="bi bi-file-earmark-text text-black"></i>
                Zamknięte
                <i className={`bi ms-auto text-black ${isClosedOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
              </button>
              {isClosedOpen && (
                <div id="collapseClosed">
                  {renderPollList(closedPolls)}
                </div>
              )}
            </li>

            {/* Nieaktywne */}
            <li className="nav-item">
              <button
                className="nav-link d-flex align-items-center gap-2 btn btn-link"
                onClick={() => setIsInactiveOpen(!isInactiveOpen)}
                aria-expanded={isInactiveOpen}
                aria-controls="collapseInactive"
                style={{ textDecoration: 'none' }}
              >
                <i className="bi bi-file-earmark-text text-black"></i>
                Nieaktywne
                <i className={`bi ms-auto text-black ${isInactiveOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
              </button>
              {isInactiveOpen && (
                <div id="collapseInactive">
                  {renderPollList(inactivePolls)}
                </div>
              )}
            </li>
          </ul>

          <hr className="my-3" />
          <ul className="nav flex-column mb-auto">
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2" to="/account">
                <i className="bi bi-gear-wide-connected text-black"></i>
                Ustawienia
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link d-flex align-items-center gap-2" to="/logout">
                <i className="bi bi-door-closed text-black"></i>
                Wyloguj
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
