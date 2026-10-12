import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/blogApi";
import { useNavigate } from "react-router";
import styles from "./Register.module.css";
import { BoxContainer } from "../../components/BoxContainer/BoxContainer";

export function Register() {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordMatch = password === confirmPassword;
  const [invalid, setInvalid] = useState(false);
  const navigate = useNavigate();

  async function onRegister(event) {
    event.preventDefault();
    try {
      if (!passwordMatch) {
        setInvalid(true);
        return;
      }
      const newToken = await api.register({
        username: username,
        password: password,
      });
      console.log(newToken);
      login(newToken.token);
      setInvalid(false);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
      setInvalid(true);
    }
  }

  return (
    <>
      <div className={styles.pageWrapper}>
        <BoxContainer variant="logoBackground">
          <div className={styles.contentContainer}>
            <h1>Register</h1>
            <p className={styles.error}>
              {invalid && !passwordMatch ? "Passords must match" : ""}
            </p>
            <p className={styles.error}>
              {invalid && passwordMatch ? `Failed to register new user` : ""}
            </p>

            <form onSubmit={onRegister} className={styles.form}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />

              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                required
              />

              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                autoComplete="new-password"
                required
              />

              <button type="submit">Login</button>
            </form>
          </div>
        </BoxContainer>
      </div>
    </>
  );
}
