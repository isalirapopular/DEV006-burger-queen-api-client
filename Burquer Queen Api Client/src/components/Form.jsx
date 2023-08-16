import React from "react";
import { login } from "./GetApi.js";
import "./Form.css"
import { useState } from "react";

export function Form({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [userEmail, setUserEmail] = useState("");


  function handleSubmit(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      setError(true);
      return;
    }

    login(email, password)
      .then((res) => {
        setError(false);

        setUser({
          token: res.accessToken,
          user: res.user,
        });
        setUserEmail(res.user.email);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <section className="sectionForm">
      <div className="logoForm">
        <img src="https://onedrive.live.com/embed?resid=5f2497285b7b79a0%21121282&authkey=%21ABZyNQn6tW6Ny3w&width=330&height=511" alt="BurguerQueenLogo" />
      </div>

      <form className="formLogin" onSubmit={handleSubmit}>
        <p className="pUsuario">Correo</p>
        <input
          className="inputEmail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresa tu email"
        />
        <p className="pContraseña">Contraseña</p>
        <input
          className="inputPassword"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu email"
        />
        <button className="buttonIniciarSesion">Iniciar sesión</button>
      </form>
      {error && <p className="error">ERROR: Revisa tu correo o contraseña</p>}

    </section>
  );
}

