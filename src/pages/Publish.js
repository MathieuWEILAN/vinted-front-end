import { avatarGroupClasses } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const Publish = ({ token }) => {
  const [data, setData] = useState();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState({});
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState(Number);

  //   Faire requête axios vers le serveur pour enregistrer la publication
  const handleSubmit = async (event) => {
    try {
      event.prevenDefault();
      //   joindre à la requête les infos + photos + bearer token (si pas de bearer token, renvoyer à la page signup ou login)

      if (!file && !title && !price) {
        return alert("missing information");
      } else {
        const formData = new FormData();
        //   ajouter des paires clés/valeurs à formData
        formData.append("picture", file);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("brand", brand);
        formData.append("size", size);
        formData.append("color", color);
        formData.append("condition", condition);
        formData.append("city", city);
        formData.append("price", price);

        //   faire la requete
        const response = await axios.post(
          "https://my-first-backend-project.herokuapp.com/offer/publish",
          formData,
          {
            headers: {
              authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <section>
        <h1>Vends ton article</h1>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <div>
              <input
                type="file"
                placeholder="+ Ajouter une photo"
                onChange={(event) => setFile(event.target.files[0])}
              />
            </div>
          </div>
          <div>
            <div>
              <h4>Titre</h4>
              <input
                type="text"
                placeholder="ex : Polo lacoste"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div>
              <h4>Decris ton article</h4>
              <textarea
                name="description"
                id=""
                rows="5"
                cols="30"
                placeholder="ex : porté quelque fois, taille correctement"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div>
            <div>
              <h4>Marque</h4>
              <input
                type="text"
                placeholder="ex : Lacoste"
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
            <div>
              <h4>Taille</h4>
              <input
                type="text"
                placeholder="ex : M/38"
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>
            <div>
              <h4>Couleur</h4>
              <input
                type="text"
                placeholder="ex : Blanc"
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div>
              <h4>Etat</h4>
              <input
                type="text"
                placeholder="ex : Neuf avec étiquette"
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </div>
            <div>
              <h4>Lieu</h4>
              <input
                type="text"
                placeholder="ex : Paris"
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </div>
          </div>
          <div>
            <div>
              <h4>Prix</h4>
              <div>
                <input
                  type="text"
                  placeholder="0,00€"
                  onChange={(event) => {
                    setPrice(event.target.value);
                  }}
                />
                <div>
                  <input type="checkbox" />
                  <span>Je suis intéressé par les échanges</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <input type="submit" value="Ajouter" />
          </div>
        </form>
      </section>
    </div>
  );
};

export default Publish;
