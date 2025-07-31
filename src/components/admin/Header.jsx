import React, { useEffect, useState } from 'react';

const AdminHeader = () => {
  const roleDescription = "Administrator"; // Placeholder
  const companyName = "Firm XYZ";         // Placeholder

  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className="navbar sticky-top bg-dark flex-md-nowrap p-1 shadow" data-bs-theme="dark">
      {/* Left: Tenant info */}
      <a className="navbar-brand col-md-4 col-lg-2 me-0 px-3 fs-6 text-white text-wrap" href="/admin.php">
        Tenant:<br /> <b>{companyName}</b>
      </a>

      {/* Center space filler */}
      <div className="flex-grow-1 d-flex justify-content-end align-items-center pe-2">
        {/* Dark mode toggle button */}
        <button
          onClick={toggleTheme}
          className="btn btn-outline-light me-2"
          title="Toggle dark/light mode"
        >
          {theme === 'dark' ? (
            <i className="bi bi-sun-fill"></i>
          ) : (
            <i className="bi bi-moon-fill"></i>
          )}
        </button>

        {/* Role button */}
        <a className="btn btn-outline-light text-nowrap" href="/admin_account.php">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            className="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>
          &nbsp;Role: <b>{roleDescription}</b>
        </a>
      </div>

      {/* Mobile sidebar toggle */}
      <ul className="navbar-nav flex-row d-md-none">
        <li className="nav-item text-nowrap">
          <button className="nav-link px-3 text-white" type="button" data-bs-toggle="offcanvas"
            data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false"
            aria-label="Toggle navigation">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" color="white" fill="currentColor"
              className="bi bi-list" viewBox="0 0 16 16">
              <path fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
            </svg>
          </button>
        </li>
      </ul>
    </header>
  );
};

export default AdminHeader;
