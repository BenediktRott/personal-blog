import styles from "./BoxContainer.module.css";

export function BoxContainer({ children, variant, ...props }) {
  const variantClass = styles[variant] || "";
  const combinedClass = `${styles.boxContainer} ${variantClass}`.trim();

  return (
    <div className={combinedClass} {...props}>
      {children}
    </div>
  );
}
