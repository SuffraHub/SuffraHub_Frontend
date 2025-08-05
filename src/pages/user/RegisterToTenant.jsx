import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const [statusMessage, setStatusMessage] = useState('');
  const [form, setForm] = useState({
    username: '',
    name: '',
    surname: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: '',
    permissions: '1',
  });

  const permissionsList = [
    { permissions: 0, description: 'Standard user' },
    { permissions: 1, description: 'Viewer' },
    { permissions: 2, description: 'Editor' },
    { permissions: 3, description: 'Moderator' },
    { permissions: 4, description: 'Tenant manager' },
    { permissions: 5, description: 'Administrator' },
    { permissions: 6, description: 'Site administrator' }
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');

    try {
      const res = await fetch('http://localhost:8000/register-to-tenant', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatusMessage(data.message || 'Error occurred');
      } else {
        setStatusMessage('✅ User registered successfully');
        setForm({
          username: '',
          name: '',
          surname: '',
          email: '',
          confirmEmail: '',
          password: '',
          confirmPassword: '',
          permissions: '1',
        });
      }
    } catch (err) {
      setStatusMessage('❌ Server error');
    }
  };

  return (
    <main className="form-signin w-100 m-auto d-flex align-items-center flex-column py-4 bg-body-tertiary" style={{ minHeight: '100vh' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="currentColor" color="blue" className="bi bi-check2-square mb-3" viewBox="0 0 16 16">
        <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z" />
        <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0" />
      </svg>
      <h2 className="fs-2 fw-bold">SuffraHub</h2>
      <h1 className="h3 mb-3 fw-normal">Register user to tenant</h1>

      <form className="w-100" style={{ maxWidth: 380 }} onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="username" value={form.username} onChange={handleChange} placeholder="Username" />
          <label htmlFor="username">Username</label>
        </div>

        <div className="form-floating mb-1">
          <input type="text" className="form-control" id="name" value={form.name} onChange={handleChange} placeholder="Name" />
          <label htmlFor="name">Name</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="surname" value={form.surname} onChange={handleChange} placeholder="Surname" />
          <label htmlFor="surname">Surname</label>
        </div>

        <div className="form-floating mb-1">
          <input type="email" className="form-control" id="email" value={form.email} onChange={handleChange} placeholder="E-mail" />
          <label htmlFor="email">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input type="email" className="form-control" id="confirmEmail" value={form.confirmEmail} onChange={handleChange} placeholder="Confirm E-mail" />
          <label htmlFor="confirmEmail">Confirm E-mail</label>
        </div>

        <div className="form-floating">
          <input type="password" className="form-control" id="password" value={form.password} onChange={handleChange} placeholder="Password" />
          <label htmlFor="password">Password</label>
        </div>
        <div className="form-floating mb-3">
          <input type="password" className="form-control" id="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm password" />
          <label htmlFor="confirmPassword">Confirm password</label>
        </div>

        <label htmlFor="permissions" className="form-label">Permission</label>
        <select className="form-select mb-3" id="permissions" value={form.permissions} onChange={handleChange}>
          {permissionsList.map(p => (
            <option key={p.permissions} value={p.permissions}>{p.description}</option>
          ))}
        </select>

        <button className="btn btn-primary w-100 py-2" type="submit">Register user to tenant</button>
      </form>

      {statusMessage && <h5 className="fw-bold mt-4 text-danger text-center">{statusMessage}</h5>}

      <span className="pt-2">
        <Link to="/admin/tenant">Go back</Link>
      </span>
    </main>
  );
};

export default Register;
