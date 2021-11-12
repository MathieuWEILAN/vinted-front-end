import logo from "../img/Vinted_logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies, { set } from "js-cookie";
import Toggle from "./Toggle";

const Header = ({
  token,
  setToken,
  handleSearch,
  handleToggle,
  toggle,
  handlePriceMin,
  handlePriceMax,
  priceMin,
  priceMax,
  priceSort,
  handleSort,
}) => {
  const deconnected = () => {
    Cookies.remove("token");
    setToken("");
  };

  const navigate = useNavigate();

  return (
    <div className="header">
      <img
        onClick={() => {
          navigate("/");
        }}
        src={logo}
        alt=""
        className="logo"
      />
      <div>
        <input
          type="text"
          name="searchbar"
          id="searchbar"
          placeholder="Recherches des articles"
          className="searchBar"
          onChange={handleSearch}
        />
        <div>
          <Toggle handleSort={handleSort} />
        </div>
        <input type="number" value={priceMin} onChange={handlePriceMin} />
        <input type="number" value={priceMax} onChange={handlePriceMax} />
      </div>
      <div className="header-btn">
        {token ? (
          <button onClick={deconnected} className="disconnect">
            Se déconnecter
          </button>
        ) : (
          <div>
            <button
              onClick={() => {
                navigate("/signup");
              }}
              className="btn-left"
            >
              s'incrire
            </button>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="btn-left"
            >
              se connecter
            </button>
          </div>
        )}

        <button className="btn-sale">vend tes articles</button>
      </div>
    </div>
  );
};

export default Header;
