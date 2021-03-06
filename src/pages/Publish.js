import {
  avatarGroupClasses,
  getFormHelperTextUtilityClasses,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import DropZoneComponent from "../components/DropZoneComponent";
import Dropzone from "../components/DropZoneComponent";
import { Navigate, useNavigate } from "react-router";

const Publish = ({ token }) => {
  const [data, setData] = useState();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(Number);

  const navigate = useNavigate();
  //   Faire requête axios vers le serveur pour enregistrer la publication
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      //   joindre à la requête les infos + photos + bearer token (si pas de bearer token, renvoyer à la page signup ou login)
      if (!file || !title || !price) {
        return alert("missing information");
      } else {
        const formData = new FormData();
        //   ajouter des paires clés/valeurs à formData
        for (let i = 0; i < file.length; i++) {
          console.log(file[i]);
          formData.append("picture", file[i]);
        }
        formData.append("title", title);
        formData.append("description", description);
        formData.append("brand", brand);
        formData.append("size", size);
        formData.append("color", color);
        formData.append("condition", condition);
        formData.append("city", city);
        formData.append("price", price);
        console.log("formdata ok");
        //   faire la requete
        const response = await axios.post(
          "https://my-first-backend-project.herokuapp.com/offer/publish",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
        console.log(response.data);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const onClick = (event) => {
    let value = "";
    setFile(value);
  };

  return token ? (
    <div>
      <section>
        <h1>Vends ton article</h1>
        <form action="" onSubmit={handleSubmit} className="form-post">
          <div className="first-block">
            <div className="second-block-pic">
              <DropZoneComponent setFile={setFile} />
              <div>
                {file &&
                  file.map((elem, i) => {
                    return (
                      <div className="container-preview">
                        <img
                          key={i}
                          src={URL.createObjectURL(elem)}
                          className="preview"
                        />
                        <div onClick={onClick} className="x-remove">
                          X
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="first-block">
            <div className="second-block">
              <h4>Titre</h4>
              <input
                type="text"
                placeholder="ex : Polo lacoste"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                className="input-post"
              />
            </div>
            <div className="second-block">
              <h4>Decris ton article</h4>
              <textarea
                name="description"
                id=""
                rows="200"
                cols="100"
                placeholder="ex : porté quelque fois, taille correctement"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
                className="input-post"
              ></textarea>
            </div>
          </div>
          <div className="first-block">
            <div className="second-block">
              <h4>Marque</h4>
              <input
                type="text"
                placeholder="ex : Lacoste"
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
                className="input-post"
              />
            </div>
            <div className="second-block">
              <h4>Taille</h4>
              <input
                type="text"
                placeholder="ex : M/38"
                onChange={(event) => {
                  setSize(event.target.value);
                }}
                className="input-post"
              />
            </div>
            <div className="second-block">
              <h4>Couleur</h4>
              <input
                type="text"
                placeholder="ex : Blanc"
                onChange={(event) => {
                  setColor(event.target.value);
                }}
                className="input-post"
              />
            </div>
            <div className="second-block">
              <h4>Etat</h4>
              <input
                type="text"
                placeholder="ex : Neuf avec étiquette"
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
                className="input-post"
              />
            </div>
            <div className="second-block">
              <h4>Lieu</h4>
              <input
                type="text"
                placeholder="ex : Paris"
                onChange={(event) => {
                  setCity(event.target.value);
                }}
                className="input-post"
              />
            </div>
          </div>
          <div className="first-block">
            <div className="second-block">
              <h4>Prix</h4>
              <div>
                <input
                  type="text"
                  placeholder="0,00€"
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                  className="input-post"
                />
                <div className="input-checkbox">
                  <input type="checkbox" />
                  <span>Je suis intéressé par les échanges</span>
                </div>
              </div>
            </div>
          </div>
          <div className="input-div">
            <input type="submit" value="Ajouter" className="input-add" />
          </div>
        </form>
      </section>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
