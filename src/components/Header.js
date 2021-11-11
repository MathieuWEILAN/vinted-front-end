import logo from "../img/Vinted_logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [search, setSearch] = useState("");
  const handleSearch = (event) => {
    let value = event.target.value;
    setSearch(value);
  };

  const navigate = useNavigate();

  return (
    <div className="header">
      <img src={logo} alt="" className="logo" />
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
        <button
          onClick={() => {
            navigate("/signup");
          }}
          className="btn-left"
        >
          s'incrire
        </button>
        <button className="btn-left">se connecter</button>
        <button className="btn-right">vend tes articles</button>
      </div>
    </div>
  );
};

export default Header;
