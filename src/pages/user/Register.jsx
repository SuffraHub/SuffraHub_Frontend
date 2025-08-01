
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {

    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        surname: '',
        email: '',
        confirm_email: '',
        password: '',
        confirm_password: ''
    });

    function registerCLick() {
        if (formData.username.length < 3 || formData.username.length > 30) {
            setMessage("Username must have from 3 up to 30 characters.");
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            setMessage("Invalid email format.");
        }
        else if (formData.email != formData.confirm_email) {
            setMessage("Confirm email does not match.")
        }
        else if (
            formData.password.length < 8 ||
            !/[A-Z]/.test(formData.password) ||
            !/[a-z]/.test(formData.password) ||
            !/\d/.test(formData.password) ||
            !/[\W_]/.test(formData.password)
        ) {
            setMessage("Password must contain at least 8 characters, including at least one uppercase and lowercase letter, digit and special character.");
        }
        else if (formData.password != formData.confirm_password) {
            setMessage("Confirm password does not match.")
        }
        else {
            const dataToSend = {
                username: formData.username,
                name: formData.name,
                surname: formData.surname,
                email: formData.email,
                password: formData.password
            };

            axios.post('http://localhost:8000/register', dataToSend)
                .then((res) => setMessage(res.data.message))
                .catch((err) => setMessage(err.response?.data?.message || "Unknown error"));
        }
    }


    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }



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

            <div className="w-100" style={{ maxWidth: 380 }}>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="username" placeholder="Username" name="username" onChange={handleChange} />
                    <label htmlFor="username">Username</label>
                </div>

                <div className="form-floating mb-1">
                    <input type="text" className="form-control" id="name" placeholder="Name" name="name" onChange={handleChange} />
                    <label htmlFor="name">Name</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="surname" placeholder="Surname" name="surname" onChange={handleChange} />
                    <label htmlFor="surname">Surname</label>
                </div>

                <div className="form-floating mb-1">
                    <input type="email" className="form-control" id="email" placeholder="Email" name="email" onChange={handleChange} />
                    <label htmlFor="email">Email</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="confirmEmail" placeholder="Confirm email" name="confirm_email" onChange={handleChange} />
                    <label htmlFor="confirmEmail">Confirm email</label>
                </div>

                <div className="form-floating mb-1">
                    <input type="password" className="form-control" id="password" placeholder="Password" name="password" onChange={handleChange} />
                    <label htmlFor="password">Password</label>
                </div>

                <div className="form-floating mb-3">
                    <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm password" name="confirm_password" onChange={handleChange} />
                    <label htmlFor="confirmPassword">Confirm password</label>
                </div>

                <input type="button" className="btn btn-primary w-100 py-2" value="Sign up" onClick={registerCLick}/>
            </div>

            {message && <div className="fw-bold mt-4 text-danger">{message}</div>}

            <span className="pt-2 d-block">
                Already have an account? <Link to="/user/login">Log in!</Link>
            </span>
        </main>
    )
}

export default Register