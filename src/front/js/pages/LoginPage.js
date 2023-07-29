import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import "../../styles/login.css";
import "./home";

const Login = () => {
  const { actions, store } = useContext(Context);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const handleChange = (event) => {
    setLogin({ ...login, [event.target.email]: event.target.value });
  };

  function handleLogin() {
    actions.Login(login);
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;


