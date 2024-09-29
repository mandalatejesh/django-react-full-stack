import { useState } from "react";
import { login } from "../api/getToken";
import { useNavigate } from "react-router-dom";
import '../styles/login.css'

const Login = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [creds, setCreds] = useState({
    email: null,
    password: null,
  });

  return (
    <div className="centered-container">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />

      <div className="login-container">
        <h3><strong>Login</strong></h3>
        <form className="login-form">
          <input
            className="input-email"
            type="email"
            id="inputEmail"
            onChange={(e) => {
              setCreds({
                ...creds,
                email: e.target.value,
              });
            }}
            required={true}
            placeholder="Email"
          />
          <input
            className="input-password"
            type="password"
            id="inputPassword"
            placeholder="*******"
            autoComplete="off"
            required={true}
            onChange={(e) => {
              setCreds({
                ...creds,
                password: e.target.value,
              });
            }}
          />
          <button
            disabled={creds.email == null || creds.password == null}
            onClick={async (e) => {
              e.preventDefault();
              const response = await login({
                email: creds.email,
                password: creds.password,
              });
              if (response.ok) {
                console.log("User authenticated");
                const data = await response.json();
                localStorage.setItem("token", data.access);
                navigate("/list");
              } else {
                alert("Invalid credentials");
              }
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
