import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/user/login', form);
      alert('Login berhasil!');
      console.log('Response:', response.data);

      // Simpan token di localStorage
      localStorage.setItem('token', response.data.token);

      // Arahkan ke halaman lain setelah login sukses (misal: dashboard)
    } catch (err) {
      
      setError(err.response?.data?.message || 'Login gagal. Silakan coba lagi.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Masuk</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Nama Pengguna</label>
            <input
              type="text"
              id="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              placeholder="Nama pengguna"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Kata Sandi</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              required
            />
          </div>
          <button type="submit" className="btn btn-secondary w-100">Masuk</button>
        </form>
        <p className="text-center mt-3">
          Belum punya akun? <Link to="/register">Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
