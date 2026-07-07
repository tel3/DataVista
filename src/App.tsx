import { useScreenScale } from "@/hooks/useScreenScale";
import Overview from "@/features/overview";
import styles from "./App.module.css";

export default function App() {
  const { scale } = useScreenScale();

  return (
    <div className={styles.wrapper}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}>
        <Overview />
      </div>
    </div>
  );
}
