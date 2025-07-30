import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    name: "",
    surname: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: ""
  });

  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const { username, email, confirmEmail, password, confirmPassword } = form;

    if (Object.values(form).some((field) => field.trim() === "")) {
      return "All fields are require.";
    }

    if (email !== confirmEmail) {
      return "Emails do not match.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Invalid email format.";
    }

    if (username.length < 3 || username.length > 30) {
      return "Username must have from 3 up to 30 characters.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/\d/.test(password) ||
      !/[\W_]/.test(password)
    ) {
      return "Password must contain at least 8 characters, including at least one uppercase and lowercase letter, digit oraz special character.";
    }

    return ""; // brak błędów
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setStatusMessage(error);
    } else {
      setStatusMessage("Registration completed.");
      // Tu mógłbyś wysłać dane np. do API lub lokalnie przechować
      console.log("Form submitted:", form);
    }
  };

  return (
    <main className="form-signin w-100 m-auto d-flex align-items-center flex-column py-4 bg-body-tertiary" style={{ minHeight: '100vh' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="72"
        height="72"
        fill="currentColor"
        color="blue"
        className="bi bi-check2-square"
        viewBox="0 0 16 16"
      >
        <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z" />
        <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0" />
      </svg>
      <h1 className="fs-2 fw-bold">SuffraHub</h1>
      <h2 className="h3 mb-3 fw-normal">Sign up</h2>

      <form className="w-100" style={{ maxWidth: 380 }} onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="username" placeholder="Username" name="username" value={form.username} onChange={handleChange} />
          <label htmlFor="username">Username</label>
        </div>

        <div className="form-floating mb-1">
          <input type="text" className="form-control" id="name" placeholder="Name" name="name" value={form.name} onChange={handleChange} />
          <label htmlFor="name">Name</label>
        </div>

        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="surname" placeholder="Surname" name="surname" value={form.surname} onChange={handleChange} />
          <label htmlFor="surname">Surname</label>
        </div>

        <div className="form-floating mb-1">
          <input type="email" className="form-control" id="email" placeholder="Email" name="email" value={form.email} onChange={handleChange} />
          <label htmlFor="email">Email</label>
        </div>

        <div className="form-floating mb-3">
          <input type="email" className="form-control" id="confirmEmail" placeholder="Confirm email" name="confirmEmail" value={form.confirmEmail} onChange={handleChange} />
          <label htmlFor="confirmEmail">Confirm email</label>
        </div>

        <div className="form-floating mb-1">
          <input type="password" className="form-control" id="password" placeholder="Password" name="password" value={form.password} onChange={handleChange} />
          <label htmlFor="password">Password</label>
        </div>

        <div className="form-floating mb-3">
          <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
          <label htmlFor="confirmPassword">Confirm password</label>
        </div>

        <button className="btn btn-primary w-100 py-2" type="submit">Sign up</button>
      </form>

      {statusMessage && <div className="fw-bold mt-4 text-danger">{statusMessage}</div>}

      <span className="pt-2 d-block">
        Already have an account? <Link to="/login">Log in!</Link>
      </span>
    </main>
  );
}
