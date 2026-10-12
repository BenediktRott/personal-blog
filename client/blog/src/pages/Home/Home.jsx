import { useNavigate } from "react-router";
import { BoxContainer } from "../../components/BoxContainer/BoxContainer";
import { Header } from "../../components/Header/Header";
import { Pill } from "../../components/Pill/Pill";
import { PostsSection } from "../../components/PostsSection/PostsSection";
import styles from "./Home.module.css";
import { api } from "../../services/blogApi";

export function Home() {
  const navigate = useNavigate();

  async function handleReadLatest() {
    try {
      const post = await api.getLatest();
      navigate(`/posts/${post.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <BoxContainer variant="hero">
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1>My personal Blog.</h1>
            <p>This is where I post stuff about my life</p>
            <Pill className={styles.readLatest} onClick={handleReadLatest}>
              ReadLatest
            </Pill>
          </div>

          <div className={styles.image}>[Image]</div>
        </div>
      </BoxContainer>

      <PostsSection></PostsSection>
    </>
  );
}
