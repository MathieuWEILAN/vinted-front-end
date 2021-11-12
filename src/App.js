import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Cookies from "js-cookie";
import Login from "./pages/Login";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(Cookies.get("token"));

  const [search, setSearch] = useState("");
  const [priceMin, setPriceMin] = useState();
  const [priceMax, setPriceMax] = useState();
  // const [priceSort, setPriceSort] = useState(false);
  const [priceSort, setPriceSort] = useState("sort=price-desc");

  const handleSearch = (event) => {
    let value = event.target.value;
    setSearch(value);
  };

  const handlePriceMin = (event) => {
    let value = Number(event.target.value);
    setPriceMin(value);
  };

  const handlePriceMax = (event) => {
    let value = Number(event.target.value);
    setPriceMax(value);
  };

  const handleSort = () => {
    if (priceSort === "sort=price-desc") {
      setPriceSort("sort=price-asc");
    }
    if (priceSort === "sort=price-asc") {
      setPriceSort("sort=price-desc");
    }
  };

  return (
    <Router>
      <Header
        token={token}
        setToken={setToken}
        search={search}
        handleSearch={handleSearch}
        priceMin={priceMin}
        handlePriceMin={handlePriceMin}
        priceMax={priceMax}
        handlePriceMax={handlePriceMax}
        priceSort={priceSort}
        handleSort={handleSort}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              search={search}
              priceMin={priceMin}
              priceMax={priceMax}
              priceSort={priceSort}
            />
          }
        />
        <Route path="/offer/:productId" element={<Offer />} />
        <Route
          path="/signup"
          element={<Signup token={token} setToken={setToken} />}
        />
        <Route
          path="/login"
          element={<Login token={token} setToken={setToken} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
