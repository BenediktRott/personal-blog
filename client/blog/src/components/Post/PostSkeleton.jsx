import styles from "./PostSkeleton.module.css";

export function PostSkeleton() {
  return (
    <>
      <div className={styles.skeletonContainer}>
        <div className={styles.categorySkeleton} />
        <div className={styles.titleSkeleton} />
        <div className={styles.textSkeleton} />
        <div className={styles.dateSkeleton} />
      </div>
    </>
  );
}
