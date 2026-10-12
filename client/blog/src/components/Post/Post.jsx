import { useNavigate } from "react-router";
import { formatDate } from "../../utils/formatDate";
import { RandomBoxContainer } from "../BoxContainer/RandomBoxContainer";
import { Pill } from "../Pill/Pill";
import styles from "./Post.module.css";

export function Post({ postData }) {
  const navigate = useNavigate();

  function onClick(event) {
    navigate(`/posts/${postData.id}`);
  }

  return (
    <>
      <RandomBoxContainer onClick={onClick}>
        <div className={styles.postContainer}>
          <Pill className={styles.visibility}>{postData.visibility}</Pill>
          <h1 className={styles.title}>{postData.title}</h1>
          <p className={styles.text}>{postData.text}</p>
          <p className={styles.date}>{formatDate(postData.publishedAt)}</p>
        </div>
      </RandomBoxContainer>
    </>
  );
}
