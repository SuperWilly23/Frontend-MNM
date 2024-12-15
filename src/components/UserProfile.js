import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserProfile.css"; // Untuk tambahan styling khusus jika diperlukan

const UserProfile = () => {
  const [user, setUser] = useState(null); // Menyimpan data user
  const [reservations, setReservations] = useState([]); // Menyimpan data reservasi
  const [loading, setLoading] = useState(true); // Menyimpan status loading

  // Fungsi untuk mengambil data profil pengguna
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token"); // Ambil token dari localStorage

      try {
        // Ambil data pengguna
        const userResponse = await axios.get("http://127.0.0.1:8000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(userResponse.data); // Simpan data user ke state

        // Ambil data riwayat pemesanan
        const reservationsResponse = await axios.get("http://127.0.0.1:8000/api/user/reservations", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setReservations(reservationsResponse.data); // Simpan data reservasi ke state
        setLoading(false); // Set loading false setelah data diterima
      } catch (error) {
        console.error("Failed to fetch user data", error);
        setLoading(false); // Set loading false jika terjadi error
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <p>Loading...</p> {/* Tampilkan loading indicator */}
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="text-center">Profil Pengguna</h2>
          <hr />
          <div className="mb-4">
            <h4 className="text-center">Informasi User</h4>
            <p className="text-center text-muted">View and edit your personal information.</p>
            <div className="d-flex justify-content-center">
              <form className="w-50">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={user ? user.nama_user : ''}
                    placeholder="Enter your name"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={user ? user.email : ''}
                    placeholder="Enter your email"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={user ? user.phone_number : ''}
                    placeholder="Enter your phone number"
                    disabled
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button type="submit" className="btn btn-dark">Save Information</button>
                </div>
              </form>
            </div>
          </div>
          <hr />
          <div>
            <h4 className="text-center">Riwayat Pemesanan</h4>
            <p className="text-center text-muted">
              Check your past rentals and payment statuses.
            </p>
            {reservations.length > 0 ? (
              reservations.map((reservation, index) => (
                <div className="row align-items-center" key={index}>
                  <div className="col-md-8">
                    <div className="d-flex align-items-center">
                      <div className="me-3 bg-light p-3" style={{ width: "50px", height: "50px" }}></div>
                      <div>
                        <p className="mb-1 fw-bold">{reservation.car.name}</p>
                        <small className="text-muted">Rental Date: {reservation.start_date}</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-2 text-center">
                    <p>{reservation.duration} hari</p>
                  </div>
                  <div className="col-md-2 text-center">
                    <button className="btn btn-dark">Give Review</button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted">No reservations found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
