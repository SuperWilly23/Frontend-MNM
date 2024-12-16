// File: UlasanNavbar.js
import React from "react";
import "./UlasanNavbar.css";

const UlasanNavbar = () => (
  <nav className="navbar">
    <div className="navbar-brand">Ulasan Produk</div>
    <ul className="navbar-links">
      <li>
        <a href="/home">Home</a>
      </li>
      <li>
        <a href="profil">Profil</a>
      </li>
      <li>
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            className="search-bar"
            placeholder="Search in site"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
      </li>
    </ul>
  </nav>
);

export default UlasanNavbar;
