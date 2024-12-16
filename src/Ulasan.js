import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./Ulasan.css";
import UlasanNavbar from "./UlasanNavbar";

const Ulasan = () => {
  const [ulasanList, setUlasanList] = useState([]);
  const [ulasan, setUlasan] = useState("");
  const [rating, setRating] = useState(null);
  const [editingUlasanId, setEditingUlasanId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const baseURL = "http://localhost:8000/api";

  useEffect(() => {
    fetchUlasan();
  }, []);

  const fetchUlasan = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseURL}/ulasan`);
      setUlasanList(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch ulasan");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ulasan || !rating) {
      setError("Ulasan dan rating harus diisi.");
      return;
    }

    const ulasanData = {
      user_id: 1, // Ganti dengan user dinamis
      car_id: 1, // Ganti dengan car dinamis
      rating,
      komentar: ulasan,
      tanggal: new Date().toISOString().split("T")[0],
    };

    try {
      setLoading(true);
      if (editingUlasanId) {
        await axios.put(`${baseURL}/ulasan/${editingUlasanId}`, ulasanData);
        setEditingUlasanId(null);
      } else {
        await axios.post(`${baseURL}/ulasan`, ulasanData);
      }
      fetchUlasan();
      setUlasan("");
      setRating(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit ulasan");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (ulasan) => {
    setEditingUlasanId(ulasan.id);
    setUlasan(ulasan.komentar);
    setRating(ulasan.rating);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseURL}/ulasan/${id}`);
      fetchUlasan();
    } catch (err) {
      setError("Failed to delete ulasan");
    }
  };

  return (
    <div className="ulasan-container">
      <UlasanNavbar />
      <div className="form-container">
        <h2>{editingUlasanId ? "Edit Ulasan" : "Tambah Ulasan"}</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="ulasan">Ulasan</label>
            <input
              type="text"
              id="ulasan"
              placeholder="Type your review here"
              value={ulasan}
              onChange={(e) => setUlasan(e.target.value)}
            />
          </div>
          <div className="rating-group">
            <label>Rating</label>
            <div className="rating-options">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`rating-btn ${rating === star ? "active" : ""}`}
                  onClick={() => setRating(star)}
                >
                  {star} Star{star > 1 && "s"}
                </button>
              ))}
            </div>
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Submitting..." : editingUlasanId ? "Update" : "Submit"}
          </button>
        </form>
      </div>
      <div className="ulasan-list">
        <h2>Daftar Ulasan</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          ulasanList.map((item) => (
            <div key={item.id} className="ulasan-item">
              <p>
                <strong>User:</strong> {item.user?.name || "Anonymous"}
              </p>
              <p>
                <strong>Car:</strong> {item.car?.name || "Unknown"}
              </p>
              <p>
                <strong>Rating:</strong> {item.rating} Stars
              </p>
              <p>
                <strong>Komentar:</strong> {item.komentar}
              </p>
              <p>
                <strong>Tanggal:</strong>{" "}
                {moment(item.tanggal).format("DD MMMM YYYY")}
              </p>
              <div className="action-buttons">
                <button onClick={() => handleEdit(item)} className="edit-btn">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Ulasan;
