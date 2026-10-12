import { useMemo } from "react";
import styles from "./BoxContainer.module.css";
import { BoxContainer } from "./BoxContainer";

const AVAILABLE_VARIANTS = styles.variants
  ? styles.variants.split(",").map((v) => v.trim())
  : ["default"];

export function RandomBoxContainer({ children, ...props }) {
  const randomVariant = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * AVAILABLE_VARIANTS.length);
    return AVAILABLE_VARIANTS[randomIndex];
  }, []);

  return (
    <BoxContainer variant={randomVariant} {...props}>
      {children}
    </BoxContainer>
  );
}
