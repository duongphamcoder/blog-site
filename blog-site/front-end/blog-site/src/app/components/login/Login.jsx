import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../../redux/action/loginAction";
import { Link } from "react-router-dom";

import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      username: email,
      password: userPassword,
    };

    loginAction(user, dispatch, navigate);
  };

  return (
    <div className="fullscreen-container">
      <div className="login-container">
        <div className="login-logo">
          {/* <img className="logo-logoff"
            src={logo}
            alt="stunited"
          /> */}
          <h2 className="header-login-title">Login to your account</h2>
        </div>
        <div className="js-err-login"></div>
        <form className="form-login" onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Type your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Type your password"
              onChange={(e) => setUserPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button-login">
            Login
          </button>
        </form>
        <div className="signup">
          <p>Create new account</p>
          <Link to={"/register"}>register</Link>
        </div>
      </div>
    </div>
  );
}
