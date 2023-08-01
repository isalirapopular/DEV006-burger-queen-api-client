import React from "react";
import { login } from "./GetApi.js";
import "./Form.css"
import { useState } from "react";

export function Form({ setUser }) {
  const [email, setEmail] = useState("grace.hopper@systers.xyz");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState(false);
  

  const handleSubmit = (e) => {
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
        })
      })
      .catch((err) => {
        console.log(err);
        
      });

 

  
  return (
    <section>
       <div className="img">
      <img src="https://onedrive.live.com/embed?resid=5f2497285b7b79a0%21121282&authkey=%21ABZyNQn6tW6Ny3w&width=330&height=511" alt="BurguerQueenLogo" />
      </div>
      <h1>Login</h1>
      <form className="formLogin" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Iniciar sesión</button>
      </form>
      {error && <p>ERROR: Revisa tu correo o contraseña</p>}
      
    </section>
  );
}
}
