
import axios from 'axios';
import { useState } from 'react';

function Register() {

    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        username: '',
        imie: '',
        nazwisko: '',
        email: '',
        confirm_email: '',
        password: '',
        confirm_password: ''
    });

    function registerCLick() {

        if (formData.email != formData.confirm_email) {
            setMessage("Confirm email does not match.")
        }
        else if (formData.password != formData.confirm_password) {
            setMessage("Confirm password does not match.")
        }
        else {
            const dataToSend = {
                username: formData.username,
                name: formData.imie,
                surname: formData.nazwisko,
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

        <main class="form-signin w-100 m-auto">
            <svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" fill="currentColor" color="blue" class="bi bi-check2-square" viewBox="0 0 16 16">
                <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5z" />
                <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0" />
            </svg><b class="fs-2">Vote@maventplan</b>
            <h1 class="h3 mb-3 fw-normal">Rejestracja</h1>
            <form method="post">
                <div class="form-floating mb-3"> <input type="text" class="form-control" id="username" placeholder="Nazwa użytkownika" name="username" onChange={handleChange} /> <label for="username">Nazwa użytkownika</label> </div>

                <div class="form-floating mb-1"> <input type="text" class="form-control" id="imie" placeholder="Imię" name="imie" onChange={handleChange} /> <label for="imie">Imię</label> </div>
                <div class="form-floating mb-3"> <input type="text" class="form-control" id="nazwisko" placeholder="Nazwisko" name="nazwisko" onChange={handleChange} /> <label for="nazwisko">Nazwisko</label> </div>

                <div class="form-floating mb-1"> <input type="email" class="form-control" id="email" placeholder="E-mail" name="email" onChange={handleChange} /> <label for="email">Email</label> </div>
                <div class="form-floating mb-3"> <input type="email" class="form-control" id="email_check" placeholder="Powtórz E-mail" name="confirm_email" onChange={handleChange} /> <label for="email_check">Powtórz E-mail</label> </div>

                <div class="form-floating"> <input type="password" class="form-control" id="password" placeholder="Hasło" name="password" onChange={handleChange} /> <label for="password">Hasło</label> </div>
                <div class="form-floating"> <input type="password" class="form-control" id="password_check" placeholder="Potwierdź hasło" name="confirm_password" onChange={handleChange} /> <label for="password_check">Potwierdź hasło</label> </div>
                <span>{message}</span>
                <input type="button" class="btn btn-primary w-100 py-2" onClick={() => registerCLick()} value="Zarejestruj się" />
            </form>
            <span class="pt-2">Masz konto? Zaloguj się!</span>
            <p class="mt-5 mb-3 text-body-secondary">&copy; mrstahuu - maventplan</p>
        </main>
    )
}

export default Register