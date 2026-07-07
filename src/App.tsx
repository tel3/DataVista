import { useScreenScale } from "@/hooks/useScreenScale";
import ParticleBackground from "@/components/ParticleBackground";
import Overview from "@/features/overview";
import styles from "./App.module.css";

export default function App() {
  const { scale } = useScreenScale();

  return (
    <div className={styles.wrapper}>
      <ParticleBackground />
      <div style={{ transform: `scale(${scale})`, transformOrigin: "center center", position: "relative", zIndex: 1 }}>
        <Overview />
      </div>
    </div>
  );
}
