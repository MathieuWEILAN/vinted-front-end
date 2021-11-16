import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Signup from "./pages/Signup";
import Cookies from "js-cookie";
import Login from "./pages/Login";
import { useState } from "react";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

function App() {
  const [token, setToken] = useState(Cookies.get("token"));
  const [search, setSearch] = useState("");
  const [checked, setChecked] = useState("sort=price-asc");
  const [prices, setPrices] = useState([0, 13000]);

  const handleChangePrices = (event, newValue) => {
    setPrices(newValue);
  };

  const handleSearch = (event) => {
    let value = event.target.value;
    setSearch(value);
  };

  const handleChange = () => {
    if (checked === "sort=price-asc") {
      setChecked("sort=price-desc");
    }
    if (checked === "sort=price-desc") {
      setChecked("sort=price-asc");
    }
  };

  return (
    <Router>
      <Header
        token={token}
        setToken={setToken}
        search={search}
        handleSearch={handleSearch}
        handleChange={handleChange}
        prices={prices}
        handleChangePrices={handleChangePrices}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              search={search}
              handleChange={handleChange}
              checked={checked}
              prices={prices}
            />
          }
        />
        <Route
          path="/offer/:productId"
          element={<Offer token={token} setToken={setToken} />}
        />
        <Route
          path="/signup"
          element={<Signup token={token} setToken={setToken} />}
        />
        <Route
          path="/login"
          element={<Login token={token} setToken={setToken} />}
        />
        <Route
          path="/publish"
          element={<Publish token={token} setToken={setToken} />}
        />
        <Route
          path="/payment"
          element={<Payment token={token} setToken={setToken} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
