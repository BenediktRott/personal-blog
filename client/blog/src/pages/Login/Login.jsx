import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/blogApi";
import { useNavigate } from "react-router";
import { BoxContainer } from "../../components/BoxContainer/BoxContainer";
import styles from "./Login.module.css";

export function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [incorrect, setIncorrect] = useState(false);
  const navigate = useNavigate();

  async function onLogin(event) {
    event.preventDefault();
    try {
      const newToken = await api.login({
        username: username,
        password: password,
      });
      console.log(newToken);
      login(newToken.token);
      setIncorrect(false);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      setIncorrect(true);
    }
  }

  return (
    <>
      <div className={styles.pageWrapper}>
        <BoxContainer variant="logoBackground">
          <div className={styles.contentContainer}>
            <h1>Login</h1>
            <p className={styles.error}>
              {incorrect ? "Incorrect username or password" : ""}
            </p>

            <form onSubmit={onLogin} className={styles.form}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              <button type="submit">Login</button>
            </form>
          </div>
        </BoxContainer>
      </div>
    </>
  );
}
