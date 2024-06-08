import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import ProfileButton from "./ProfileButton";
import thinkerImage from "./thinker.png";

function Navigation({ isLoaded }: { isLoaded: boolean }) {
  const sessionUser = useSelector((state: any) => state.session.user);

  return (
    <header>
      <ul className="navul">
        <li className="navli">
          <NavLink exact to="/" className="homeImage">
            <img src={thinkerImage} alt="Thinker" />
          </NavLink>
        </li>
        <li className="brand-text">P H I L O S O P H I Z E</li>
        <nav className="subhead-nav">
          <NavLink to="/topics" className="navlink">
            topics
          </NavLink>
          <NavLink to="/comments" className="navlink">
            comments
          </NavLink>
          <NavLink to="/about" className="navlink">
            about us
          </NavLink>
        </nav>
        {isLoaded && (
          <li className="profile-button">
            <ProfileButton user={sessionUser} />
          </li>
        )}
      </ul>
    </header>
  );
}

export default Navigation;