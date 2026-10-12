import { useState } from "react";
import styles from "./CommentInput.module.css";
import { Pill } from "../Pill/Pill";
import { api } from "../../services/blogApi";
import { BoxContainer } from "../BoxContainer/BoxContainer";

export function CommentInput({ postId, onCommentPosted }) {
  const [textInput, setTextInput] = useState("");

  async function onClick(event) {
    console.log("In OnClick");
    try {
      const newComment = await api.createComment({ text: textInput }, postId);
      console.log(newComment);
      if (newComment) onCommentPosted(newComment);

      setTextInput("");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <BoxContainer>
        <div className={styles.contentContainer}>
          <textarea
            className={styles.commentInput}
            onChange={(event) => setTextInput(event.target.value)}
            value={textInput}
          />
          <div className={styles.pillContainer}>
            <Pill onClick={onClick} className={styles.pill} type="button">
              Post
            </Pill>
          </div>
        </div>
      </BoxContainer>
    </>
  );
}
