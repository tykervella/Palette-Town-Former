import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div>
          <Link className="text-light" to="/">
            <h1 className="m-0">Palette Town</h1>
          </Link>
          <p className="m-0">Where Hexcodes and Pokémon Collide</p>
        </div>
        <div className="navbar navbar-expand-lg navbar-light text-white">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/page1">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/page2">
                Create
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/page3">
                Marketplace
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
