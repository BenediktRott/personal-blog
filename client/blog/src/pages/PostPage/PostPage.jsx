import { useEffect, useState } from "react";
import { BoxContainer } from "../../components/BoxContainer/BoxContainer";
import { Pill } from "../../components/Pill/Pill";
import { useAuth } from "../../context/AuthContext";
import styles from "./PostPage.module.css";
import { useParams } from "react-router";
import { api } from "../../services/blogApi";
import { formatDate } from "../../utils/formatDate";
import { Comment } from "../../components/Comment/Comment";
import { CommentInput } from "../../components/Comment/CommentInput";

export function PostPage() {
  const { token } = useAuth();
  const { id } = useParams();
  const [post, setPost] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function fetchPostAndComments() {
      try {
        setLoading(true);
        const post = await api.getPostsId(id);
        const comments = await api.getComments(id);
        if (isMounted) {
          setPost(post);
          setComments(comments);
        }
      } catch (error) {
        if (isMounted) setError(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchPostAndComments();

    return () => {
      isMounted = false;
    };
  }, [id, token]);

  function onCommentPosted(newComment) {
    setComments([newComment, ...comments]);
  }

  if (loading || error) return <></>;

  return (
    <>
      <main className={styles.contentArea}>
        <div>
          <Pill to="/">Back to Home</Pill>
        </div>

        <BoxContainer variant="logoBackground">
          <div className={styles.titleCard}>
            <Pill>Essay</Pill>
            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.date}>{formatDate(post.publishedAt)}</p>
          </div>
        </BoxContainer>

        <BoxContainer>
          <div className={styles.textCard}>{post.text}</div>
        </BoxContainer>

        <div>
          <Pill className={styles.commentsPill}>
            <h1>Comments</h1>
          </Pill>
        </div>

        <section className={styles.commentsSection}>
          <CommentInput postId={id} onCommentPosted={onCommentPosted} />

          {comments.map((comment) => (
            <Comment commentData={comment} key={comment.id} />
          ))}
        </section>
      </main>
    </>
  );
}
