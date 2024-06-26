import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import SignupFormPage from "../SignupFormPage";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button onClick={openMenu} className="ddbutton">
        <i className="fas fa-user-tie" /> 
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
          <div className="wors1">
            <div>{user.username}</div>
            <div>{user.email}</div>
            <div>
              <button className="logoutButt" onClick={handleLogout}>Log Out</button>
            </div>
            </div>
          </>
        ) : (
          <>
          <div className="wors">
          <div className ="loginWors">
            <Link to="/login" onClick={closeMenu}>Log In</Link>
            </div>

<div className ="signupWors">
              <Link to="/signup" onClick={closeMenu}>Sign Up</Link>
            </div>
            </div>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
