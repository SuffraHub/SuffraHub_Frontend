import React, { useEffect, useState } from 'react';
import axios from '../../axiosWithLogger';

function AdminAccount() {
  const [formData, setFormData] = useState({
    userId: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    surname: '',
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // 1. Pobierz user_id z user-info
  useEffect(() => {
    async function fetchUserInfo() {
      try {

        // 2. Pobierz dane użytkownika po userId (załóżmy endpoint)
        const userResp = await axios.get(`http://localhost:8000/user-info`, { withCredentials: true });
        //console.log(userResp);

        // Ustaw formę, jeśli dane istnieją, inaczej puste stringi
        setFormData({
          userId: userResp.data.user_id || '',
          username: userResp.data.username || '',
          email: userResp.data.email || '',
          password: '', // hasło nie ładujemy!
          confirmPassword: '',
          name: userResp.data.name || '',
          surname: userResp.data.surname || '',
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        setMessage('Error fetching data of user');
      } finally {
        setLoading(false);
      }
    }
    fetchUserInfo();
  }, []);

  // Obsługa zmiany inputów
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Obsługa submit
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Sprawdź, które pola (oprócz hasła) są puste
  const requiredFields = ['username', 'email', 'name', 'surname'];
  const emptyFields = requiredFields.filter(field => !formData[field].trim());

  if (emptyFields.length > 0) {
    setMessage(`Fill in all required fields: ${emptyFields.join(', ')}`);
    return;
  }

  // Sprawdź czy hasła się zgadzają (jeśli jedno z nich zostało podane)
  if (formData.password || formData.confirmPassword) {
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
  }

  // Przygotuj dane do wysłania
  const payload = {
    userId: formData.userId,
    username: formData.username,
    email: formData.email,
    name: formData.name,
    surname: formData.surname,
  };
  if (formData.password) {
    payload.password = formData.password;
  }

  try {
    const resp = await axios.post('http://localhost:8000/editUser', payload, { withCredentials: true });
    setMessage(resp.data.message || 'User updated');
  } catch (error) {
    setMessage(error.response?.data?.message || 'Error updating user');
  }
};


  if (loading) return <p>Loading data...</p>;

  return (
    <div className="card shadow-sm p-4 my-4">
      <h4 className="card-title mb-3">Your profile</h4>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-1">
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-floating mb-1">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="name">Name</label>
        </div>
        <div className="form-floating mb-4">
          <input
            type="text"
            className="form-control"
            id="surname"
            name="surname"
            placeholder="Surname"
            value={formData.surname}
            onChange={handleChange}
            required
          />
          <label htmlFor="surname">Surname</label>
        </div>
        <div className="form-floating mb-4">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">E-mail</label>
        </div>
        <div className="form-floating mb-1">
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Hasło"
            value={formData.password}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="form-floating mb-1">
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Potwierdź hasło"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <label htmlFor="confirmPassword">Confirm password</label>
        </div>

        <button type="submit" className="btn btn-primary mt-3">Confirm changes</button>
      </form>
    </div>
  );
}

export default AdminAccount;
