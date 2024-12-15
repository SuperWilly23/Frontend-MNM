import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone_number: '',
    alamat: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError('Password dan Konfirmasi Password tidak cocok.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/user/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        phone_number: form.phone_number,
        alamat: form.alamat,
      });

      setSuccess('Registrasi berhasil! Silakan login.');
      setError('');
      console.log('Response:', response.data);

      // Reset form
      setForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone_number: '',
        alamat: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Registrasi gagal. Silakan coba lagi.');
      setSuccess('');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Registrasi</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nama Lengkap</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={form.name}
              onChange={handleChange}
              placeholder="Nama lengkap"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
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
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Konfirmasi Kata Sandi</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone_number" className="form-label">Nomor Telepon</label>
            <input
              type="text"
              id="phone_number"
              name="phone_number"
              className="form-control"
              value={form.phone_number}
              onChange={handleChange}
              placeholder="Nomor telepon"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="alamat" className="form-label">Alamat</label>
            <textarea
              id="alamat"
              name="alamat"
              className="form-control"
              value={form.alamat}
              onChange={handleChange}
              placeholder="Alamat"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-secondary w-100">Daftar</button>
        </form>
        <p className="text-center mt-3">
          Sudah punya akun? <Link to="/login">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
