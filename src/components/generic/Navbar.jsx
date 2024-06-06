/* eslint-disable react/prop-types */
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import styles from "./css/navbar.module.css";
import { List } from "@phosphor-icons/react";
const Navbar = ({ onClick = () => {}, showMenu = false }) => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <div className={styles["container"]}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {showMenu && (
          <List
            size={20}
            color="var(--Black)"
            onClick={onClick}
            style={{ cursor: "pointer" }}
          />
        )}
        <h1
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          Teebay
        </h1>
      </div>

      <div className={styles["link-container"]}>
        <NavLink to={"/"}>Home</NavLink>
        {!user && (
          <>
            <NavLink to="/sign-up">Sign Up</NavLink>
            <NavLink to={"/login"}>Login</NavLink>
          </>
        )}
        {user && <NavLink to="/dashboard">Profile</NavLink>}
      </div>
    </div>
  );
};

export default Navbar;
