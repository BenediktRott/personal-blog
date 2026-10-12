import { Link } from "react-router";
import styles from "./Header.module.css";
import { useAuth } from "../../context/AuthContext";
import { Pill } from "../Pill/Pill.jsx";

export function Header() {
  const { token, logout } = useAuth();

  return (
    <>
      <header>
        <Pill to="/" className={styles.logo}>
          <h1>MyBlog</h1>
        </Pill>

        {token ? (
          <>
            <Pill onClick={logout}>Logout</Pill>
          </>
        ) : (
          <>
            <Pill to="/login">Login</Pill>
            <Pill to="/register">Sign-up</Pill>
          </>
        )}
      </header>
    </>
  );
}
