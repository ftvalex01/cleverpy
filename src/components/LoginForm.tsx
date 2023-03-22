import React, { useState } from "react";
import "../styles/LoginForm.css";
import { LoginFormProps } from "../types";
import PostsList from "./PostsList";
const logo =  require("../images/Cleverpy®.jpg")




const LoginForm:React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  function generarNumeroAleatorio() {
    return Math.floor(Math.random() * 11) + 10;
  }

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUsername(value);
    setIsUsernameValid(value.length >= 5);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPassword(value);
    setIsPasswordValid(value.length >= 8);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      setError("Please enter a username and password");
      return;
    }

    if (!isUsernameValid || !isPasswordValid) {
      setError("Username and password are invalid");
      return;
    }

    const userData = { username, password, userId: generarNumeroAleatorio() };
    setUserId(userId)
    setIsLoggedIn(true);
    onSubmit(userData);
  };

  if (isLoggedIn) {
    return <PostsList userId={userId} />;
  }

  return (
    <div className="login-box">
      <img src={logo} alt="imagen logo" className="avatar"></img>
      <h1>Login Here</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Nombre de usuario:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          required
          placeholder="CleverpyMola"
        />
        {!isUsernameValid && (
          <p className="error-message">
            El nombre de usuario debe tener al menos 5 caracteres.
          </p>
        )}
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePassword}
          required
        />
        {!isPasswordValid && (
          <p className="error-message">
            La contraseña debe tener al menos 8 caracteres.
          </p>
        )}
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Iniciar sesión</button>
        <br />
        <a href="/">¿Todavía no tienes una cuenta?</a>
      </form>
    </div>
  );
};

export default LoginForm;
