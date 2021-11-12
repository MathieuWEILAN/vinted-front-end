import logo from "../img/Vinted_logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies, { set } from "js-cookie";

const Header = ({ token, setToken }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    let value = event.target.value;
    setSearch(value);
  };

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
          onChange={handleSearch}
          className="searchBar"
        />
      </div>
      <div className="header-btn">
        {token ? (
          <button onClick={deconnected}>Se déconnecter</button>
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
