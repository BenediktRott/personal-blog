import { useEffect, useState } from "react";
import styles from "./PostsSection.module.css";
import { api } from "../../services/blogApi";
import { useAuth } from "../../context/AuthContext";
import { Post } from "../Post/Post";
import { PostSkeleton } from "../Post/PostSkeleton";

export function PostsSection() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    let isMounted = true;

    async function fetchPosts() {
      try {
        const posts = await api.getPosts();
        if (isMounted) setPosts(posts);
      } catch (error) {
        if (isMounted) setError(error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchPosts();

    return () => {
      isMounted = false;
    };
  }, [token]);

  if (loading) {
    return (
      <>
        <section className={styles.postsGrid}>
          {[1, 2, 3, 4].map((n) => (
            <PostSkeleton key={n} />
          ))}
        </section>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className={styles.error}>Login or Sign Up to see posts</div>
      </>
    );
  }

  return (
    <>
      <section className={styles.postsGrid}>
        {posts.map((post) => (
          <Post key={post.id} postData={post} />
        ))}
      </section>
    </>
  );
}
