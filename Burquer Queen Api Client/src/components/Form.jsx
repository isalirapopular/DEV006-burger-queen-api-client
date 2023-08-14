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
        <img className="logoForm" src="https://onedrive.live.com/embed?resid=5f2497285b7b79a0%21121282&authkey=%21ABZyNQn6tW6Ny3w&width=330&height=511" alt="BurguerQueenLogo" />
    
      <form className="formLogin" onSubmit={handleSubmit}>
        <p className="pUsuario">Usuario</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresa tu email"
        />
        <p className="pContraseña">Contraseña</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingresa tu email"
        />

        <button>Iniciar sesión</button>
      </form>
      {error && <p>ERROR: Revisa tu correo o contraseña</p>}

    </section>
  );
}

