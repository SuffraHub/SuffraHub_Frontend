import { useState } from 'react';

const Register = () => {
  const [statusMessage, setStatusMessage] = useState('');

  // Tymczasowo – lista dostępnych uprawnień (mock)
  const permissionsList = [
    { permissions: 1, description: 'User' },
    { permissions: 3, description: 'Administrator' },
    { permissions: 4, description: 'Head administrator' }
  ];

  return (
    <main className="form-signin w-100 m-auto d-flex align-items-center flex-column py-4 bg-body-tertiary" style={{ minHeight: '100vh' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="currentColor" color="blue" className="bi bi-check2-square mb-3" viewBox="0 0 16 16">
        <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z" />
        <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0" />
      </svg>
      <h2 className="fs-2 fw-bold">SuffraHub</h2>
      <h1 className="h3 mb-3 fw-normal">Register to tenant</h1>

      <form className="w-100" style={{ maxWidth: 380 }}>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="username" placeholder="Username" />
          <label htmlFor="username">Username</label>
        </div>

        <div className="form-floating mb-1">
          <input type="text" className="form-control" id="imie" placeholder="Name" />
          <label htmlFor="imie">Name</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="nazwisko" placeholder="Surname" />
          <label htmlFor="nazwisko">Surname</label>
        </div>

        <div className="form-floating mb-1">
          <input type="email" className="form-control" id="email" placeholder="E-mail" />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input type="email" className="form-control" id="confirm_email" placeholder="Confirm E-mail" />
          <label htmlFor="confirm_email">Confirm E-mail</label>
        </div>

        <div className="form-floating">
          <input type="password" className="form-control" id="password" placeholder="Password" />
          <label htmlFor="password">Password</label>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" id="confirm_password" placeholder="Confirm password" />
          <label htmlFor="confirm_password">Confirm password</label>
        </div>

        <label htmlFor="permissions" className="form-label">Permission</label>
        <select className="form-select mb-3" id="permissions">
          {permissionsList.map(p => (
            <option key={p.permissions} value={p.permissions}>{p.description}</option>
          ))}
        </select>

        <button className="btn btn-primary w-100 py-2" type="submit">Register user to tenant</button>
      </form>

      {statusMessage && <h3 className="fw-bold mt-4 text-danger">{statusMessage}</h3>}

      <span className="pt-2">
        <Link to="/admin/tenant">Go back</Link>
      </span>
    </main>
  );
};

export default Register;
