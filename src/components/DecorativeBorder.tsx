import styles from "./DecorativeBorder.module.css";

interface Props {
  children: React.ReactNode;
}

export default function DecorativeBorder({ children }: Props) {
  return (
    <div className={styles.container}>
      <div className={`${styles.corner} ${styles.cornerTL}`} />
      <div className={`${styles.corner} ${styles.cornerTR}`} />
      <div className={`${styles.corner} ${styles.cornerBL}`} />
      <div className={`${styles.corner} ${styles.cornerBR}`} />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
