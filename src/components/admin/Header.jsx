import React from 'react';

const AdminHeader = () => {
  const roleDescription = "Administrator"; // Placeholder
  const companyName = "Firma XYZ";        // Placeholder

  return (
    <header className="navbar sticky-top bg-dark flex-md-nowrap p-0 shadow" data-bs-theme="dark">
      <a className="navbar-brand col-md-5 col-lg-2 me-0 px-3 fs-6 text-white text-wrap" href="/admin.php">
        Dzierżawa:<br /> <b>{companyName}</b>
      </a>
      <a className="btn btn-outline-light text-wrap ms-2 me-4 mb-2 mt-2" href="/admin_account.php">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
          className="bi bi-person-fill" viewBox="0 0 16 16">
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
        </svg>
        &nbsp;Rola: <b>{roleDescription}</b>
      </a>
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
      <div id="navbarSearch" className="navbar-search w-100 collapse">
        <input className="form-control w-100 rounded-0 border-0" type="text" placeholder="Search" aria-label="Search" />
      </div>
    </header>
  );
};



export default AdminHeader;
