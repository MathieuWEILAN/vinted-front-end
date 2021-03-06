import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Signup = ({ token, setToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();

  const handleUsername = (event) => {
    let value = event.target.value;
    setUsername(value);
  };

  const handleEmail = (event) => {
    let value = event.target.value;
    setEmail(value);
  };

  const handlePassword = (event) => {
    let value = event.target.value;
    setPassword(value);
  };

  const navigate = useNavigate();

  const sendDataUser = async (event) => {
    try {
      event.preventDefault();
      if (!username || !email || !password) {
        return alert("Missing infomation");
      } else {
        const newUser = {
          username: username,
          email: email,
          password: password,
        };
        //   console.log(newUser);
        const response = await axios.post(
          "https://my-first-backend-project.herokuapp.com/user/signup",
          newUser
        );
        setUser(response.data);
        console.log(response.data);
        const token = response.data.token;
        Cookies.set("token", token, { expires: 14 });
        setToken(token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //ligne 32 à 37 peut s'écrire comme ca aussi : axios.post( "https://lereacteur-vinted-api.herokuapp.com/user/signup",newUser).then(response=> setUser({response.data}))
  // dans la data on retrouvera les infos envoyés ainsi que le token(qui a été créé), l'id, etc...
  //.then() c'est pareil que async/await, ca attend que chaque étape de la fonction se termine avant d'enregistrer la data dans le state

  return (
    <div className="container-general">
      <form action="" onSubmit={sendDataUser}>
        <h2>S'incrire</h2>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={handleUsername}
          className="input-sub"
        />
        <input
          type="email"
          placeholder="Email"
          onChange={handleEmail}
          className="input-sub"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={handlePassword}
          className="input-sub"
        />
        <div className="sub">
          <input type="checkbox" />
          <div>S'incrire à notre newletter</div>
        </div>
        <p>
          En m'inscrivant je confirme avoir lu et accepté les termes et
          conditions et politique de cconfidentialité de Vinted. Je confirme
          avoir plus de 18 ans.
        </p>
        <input type="submit" value="S'inscrire" className="btn-sub" />
        <a
          href="/login"
          className="baseline"
          onClick={() => {
            navigate("/login");
          }}
        >
          Tu as déja un compte ? Connecte-toi !
        </a>
      </form>
    </div>
  );
};

export default Signup;
