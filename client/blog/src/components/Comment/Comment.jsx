import { formatDate } from "../../utils/formatDate";
import { BoxContainer } from "../BoxContainer/BoxContainer";
import { User } from "../User/User";
import styles from "./Comment.module.css";

export function Comment({ commentData }) {
  return (
    <>
      <BoxContainer>
        <div className={styles.contentContainer}>
          <User username={commentData.author.username} />
          <div className={styles.commentContent}>
            <p>{commentData.text}</p>
            <p className={styles.date}>{formatDate(commentData.publishedAt)}</p>
          </div>
        </div>
      </BoxContainer>
    </>
  );
}
