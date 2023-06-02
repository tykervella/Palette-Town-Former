import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const Navbar = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div className="text-center"> 
          <Link className="text-light" to="/">
            <h1 className="m-0">Palette Town</h1>
          </Link>
          <p className="m-0">Where Hexcodes and Pokémon Collide</p>
        </div>
        <div className="navbar navbar-expand-lg navbar-light text-white d-flex align-items-center"> 
          <div className="btn-group"> 
            <Link className="btn btn-primary" to="/page1"> 
              Home
            </Link>
            <Link className="btn btn-primary" to="/page2"> 
              Create
            </Link>
            <Link className="btn btn-primary" to="/page3"> 
              Marketplace
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;



