import type { StatCard } from "@/types";
import NumberFlop from "@/components/NumberFlop";
import styles from "./StatCards.module.css";

export default function StatCards({ stats }: { stats: StatCard[] }) {
  return (
    <div className={styles.grid}>
      {stats.map((s) => (
        <div key={s.title} className={styles.card}>
          <span className={styles.cardIcon}>{s.icon}</span>
          <span className={styles.cardTitle}>{s.title}</span>
          <div className={styles.cardValue}>
            <NumberFlop value={s.value} decimals={s.title === "转化率" ? 2 : 1} />
            <span className={styles.cardUnit}>{s.unit}</span>
          </div>
          <span className={`${styles.cardTrend} ${s.trend >= 0 ? styles.trendUp : styles.trendDown}`}>
            {s.trend >= 0 ? "↑" : "↓"} {Math.abs(s.trend)}%
          </span>
        </div>
      ))}
    </div>
  );
}
