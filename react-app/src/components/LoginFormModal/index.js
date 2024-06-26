import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { useHistory, Link, useLocation } from "react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  if (sessionUser) return <Redirect to="/" />;



  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const handleDemoLogin = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setEmail("plato@socrates.com"); // Set demo credentials
    setPassword("demopassword");
    const data = dispatch(login("plato@socrates.com", "demopassword"));
    if (data) {
      setErrors(data);
    }
    closeModal();
  };



  return (
    <>
      <div className="modal-backdrop">
        <div className="modal-content">
          <div className="modal-header">Log In</div>
          <form onSubmit={handleSubmit} className="modal-form">
            <Link to="/" className="close-modal-button">
              ⬅️ Back to Home Page
            </Link>
            {/* <ul>
        {Array.isArray(errors) && errors.map((error, idx) => (
          <li key={idx}>{error}</li>
          ))}
        </ul> */}
            <label>Email</label>
            <input
              className="inbox"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.length > 0 && (
              <p style={{ fontSize: "10px", color: "red" }}>{errors}</p>
            )}

            <label>Password</label>
            <input
              className="inbox"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.length > 0 && (
              <p style={{ fontSize: "10px", color: "red" }}>{errors}</p>
            )}
            <button type="submit">Log In</button>
            <button onClick={handleDemoLogin}>Log in as Demo Member</button>
          </form>
          <div className="modal-link">
            <a href="/signup">Don't have an account? Sign Up!</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginFormModal;
