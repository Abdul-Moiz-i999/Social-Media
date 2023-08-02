import { useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import "./register.css";

function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

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
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

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
            <button className="registerRegisterButton">Log in</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
