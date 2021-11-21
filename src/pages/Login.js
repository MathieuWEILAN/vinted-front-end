import axios from "axios";
import { set } from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({ setToken, token }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    let value = event.target.value;
    setEmail(value);
  };

  const handlePassword = (event) => {
    let value = event.target.value;
    setPassword(value);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const user = { email: email, password: password };
      const response = await axios.post(
        "https://my-first-backend-project.herokuapp.com/user/login",
        user
      );
      const token = response.data.token;
      Cookies.set("token", token, { expires: 14 });
      setToken(token);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container-general">
      <form action="" onSubmit={handleSubmit}>
        <h2>Se connecter</h2>

        <input
          type="email"
          placeholder="Email"
          onChange={handleEmail}
          className="input-sub"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onClick={handlePassword}
          className="input-sub"
        />
        <input type="submit" name="" id="" className="btn-sub" />
        <div
          className="baseline"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Pas encore de compte ? inscrit toi
        </div>
      </form>
    </div>
  );
};

export default Login;
