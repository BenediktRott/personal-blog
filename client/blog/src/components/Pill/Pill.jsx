import { Link } from "react-router";
import styles from "./Pill.module.css";

export function Pill({ to, onClick, children, className, ...props }) {
  const combinedClass = `${styles.pill} ${className ? className : ""}`.trim();

  if (to) {
    return (
      <Link to={to} className={combinedClass} {...props}>
        {children}
      </Link>
    );
  }

  // Otherwise, render a button
  return (
    <button onClick={onClick} className={combinedClass} {...props}>
      {children}
    </button>
  );
}
