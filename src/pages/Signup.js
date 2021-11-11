import { useState, useEffect } from "react";
import axios from "axios";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
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

  const sendDataUser = (event) => {
    event.preventDefault();
    if (!username || !email || !password) {
      return alert("Missing infomation");
    } else {
      const newUser = { username: username, email: email, password: password };
      setUser(newUser);
      console.log(newUser);
      const request = axios
        .post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          newUser
        )
        .then((response) => setUser(response.data.id));
      console.log(request);
    }
  };

  return (
    <div className="form-signup">
      <div>S'incrire</div>
      <form action="" onSubmit={sendDataUser}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={handleUsername}
        />
        <input type="email" placeholder="Email" onChange={handleEmail} />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={handlePassword}
        />

        <div>
          <input type="checkbox" />
          <div>S'incrire à notre newletter</div>
        </div>

        <p>
          En m'inscrivant je confirme avoir lu et accepté les termes et
          conditions et politique de cconfidentialité de Vinted. Je confirme
          avoir plus de 18 ans.
        </p>
        <input type="submit" value="S'inscrire" />
      </form>
      <a href="/login">Tu as déja un compte ? Connecte-toi !</a>
    </div>
  );
};

export default Signup;
