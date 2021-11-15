import logo from "../img/Vinted_logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies, { set } from "js-cookie";
import * as React from "react";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

const Header = ({
  token,
  setToken,
  handleSearch,
  handleChange,
  prices,
  handleChangePrices,
}) => {
  const deconnected = () => {
    Cookies.remove("token");
    setToken("");
  };

  const navigate = useNavigate();

  const handleClick = () => {
    if (token) {
      navigate("/publish");
    } else {
      navigate("/login");
    }
  };

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
      <div className="filters">
        <input
          type="text"
          name="searchbar"
          id="searchbar"
          placeholder="Recherches des articles"
          className="searchBar"
          onChange={handleSearch}
        />
        <div className="component-hdr">
          <div>
            <span>prix ⇡</span>
            <Switch
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <span>prix ⇣</span>
          </div>
          <div className="slider">
            <span className="slider-span">Prix (€)entre</span>
            <Box sx={{ width: 400 }}>
              <Slider
                value={prices}
                onChange={handleChangePrices}
                valueLabelDisplay="auto"
                min={0}
                max={13000}
              />
            </Box>
          </div>
        </div>
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
            </button>{" "}
          </div>
        )}
        <button className="btn-sale" onClick={handleClick}>
          vend tes articles
        </button>
      </div>
    </div>
  );
};

export default Header;
