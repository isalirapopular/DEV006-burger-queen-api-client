import { login } from "../loginApi.js";
import "./Form.css";
import { useState } from "react";

export function Form({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [user, setUserData] = useState({}); // Initialize user state with an empty object

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setError(true);
      return;
    }

    login(email, password)
      .then((res) => {
        console.log(res);
        setError(false);

        setUserData({
          token: res.accessToken,
          user: res.user,
        });

        // Clear email and password fields after successful login
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  function handleClick() {
    // Implement any additional logic for button click here
  }

  return (
    <section>
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
