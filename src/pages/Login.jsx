import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '', remember_me: false });
  const [statusMessage, setStatusMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        navigate('/admin');
      } else {
        setStatusMessage(data.message || 'Invalid username or password.');
      }
    } catch (error) {
      setStatusMessage('An error occurred while logging in.');
    }
  };

  return (
    <main className="form-signin w-100 m-auto d-flex align-items-center flex-column py-5 bg-body-tertiary">
      <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="currentColor" color="blue" className="bi bi-check2-square mb-3" viewBox="0 0 16 16">
        <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z" />
        <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0" />
      </svg>
      <h1 className="fs-2 fw-bold">Vote@maventplan</h1>
      <h2 className="h4 mb-3 fw-normal">Log in</h2>

      <form className="w-100" style={{ maxWidth: '400px' }} onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          <label htmlFor="username">Username</label>
        </div>

        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
        </div>

        <div className="form-check text-start my-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="remember_me"
            id="checkRemember"
            checked={formData.remember_me}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="checkRemember">
            Remember me
          </label>
        </div>

        <button className="btn btn-primary w-100 py-2" type="submit">Log in</button>

        {statusMessage && (
          <div className="fw-bold mt-4 text-danger text-center">{statusMessage}</div>
        )}
      </form>

      <span className="mt-3">
        Don’t have an account? <Link to="/register">Register here</Link>
      </span>
      <p className="mt-5 mb-3 text-body-secondary">&copy; mrstahuu - maventplan</p>
    </main>
  );
}

export default Login;
