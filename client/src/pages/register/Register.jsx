import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import "./register.css";

function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const [error, setError] = useState();
  const [done, setDone] = useState(false);

  const handleForm = async (e) => {
    e.preventDefault();
    if (password.current.value !== passwordAgain.current.value) {
      passwordAgain.current.setCustomValidity("Passwords Don't Match");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("auth/register", user);
        // navigate("/login", { state: { key: "valueas" } });
        setDone(true);
        setError();
      } catch (err) {
        setDone(false);
        setError(err);
        console.log(err);
      }
    }
  };
  console.log("done is " + done);

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Lamasocial</h3>
          <span className="registerDesc">
            Connect With People around you on Lamasocial.
          </span>
        </div>
        <div className="registerRight">
          {done && (
            <span className="registerSuccess">
              Registration Successful! Please login now
            </span>
          )}
          {error && (
            <span className="registerError">
              Registration failed. Please retry with a valid email and password
            </span>
          )}
          <form className="registerBox" onSubmit={handleForm}>
            <input
              placeholder="Username"
              type="text"
              className="registerInput"
              ref={username}
              required
            />
            <input
              placeholder="Email"
              type="email"
              className="registerInput"
              ref={email}
              required
            />
            <input
              placeholder="Password"
              type="password"
              className="registerInput"
              minLength="6"
              ref={password}
              required
            />
            <input
              placeholder="Password Again"
              type="password"
              className="registerInput"
              minLength="6"
              ref={passwordAgain}
              required
            />
            <button type="submit" className="registerButton">
              Sign Up!
            </button>
            <button
              type="button"
              className="registerRegisterButton"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
