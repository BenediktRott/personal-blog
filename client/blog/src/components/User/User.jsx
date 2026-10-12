import { BoxContainer } from "../BoxContainer/BoxContainer";
import styles from "./User.module.css";

export function User({ username }) {
  return (
    <>
      <BoxContainer variant="accent2">
        <div className={styles.contentContainer}>
          <div className={styles.image}>
            <p>Img</p>
          </div>
          <span className={styles.username}>{username}</span>
        </div>
      </BoxContainer>
    </>
  );
}
