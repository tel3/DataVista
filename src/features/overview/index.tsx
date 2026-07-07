import { useEffect, useState, useCallback } from "react";
import { useDashboardStore } from "@/stores/useDashboardStore";
import DecorativeBorder from "@/components/DecorativeBorder";
import ChartCard from "@/components/ChartCard";
import { LoadingView, ErrorView } from "@/components/StatusView";
import StatCards from "./StatCards";
import TrendChart from "./TrendChart";
import CategoryChart from "./CategoryChart";
import RankingChart from "./RankingChart";
import ScrollTable from "./ScrollTable";
import styles from "./Overview.module.css";

export default function Overview() {
  const { data, loading, error, fetchData } = useDashboardStore();
  const [time, setTime] = useState("");
  const [updateTime, setUpdateTime] = useState("");

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleString("zh-CN", { hour12: false }));
      setUpdateTime(now.toLocaleTimeString("zh-CN", { hour12: false }));
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = useCallback(() => {
    fetchData();
    setUpdateTime(new Date().toLocaleTimeString("zh-CN", { hour12: false }));
  }, [fetchData]);

  if (loading && !data) return <LoadingView />;
  if (error && !data) return <ErrorView message={error} onRetry={fetchData} />;
  if (!data) return null;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.titleWrap}>
          <div className={styles.decoLine}>
            <span className={`${styles.decoNode} ${styles.decoNodeLeft}`} />
          </div>
          <div className={styles.decoDiamond} />
          <h1 className={styles.title}>DataVista 数据可视化大屏</h1>
          <div className={styles.decoDiamond} />
          <div className={`${styles.decoLine} ${styles.decoLineRight}`}>
            <span className={styles.decoNode} />
          </div>
        </div>
        <span className={styles.clock}>{time}</span>
      </header>

      <div className={styles.grid}>
        <DecorativeBorder>
          <StatCards stats={data.stats} />
        </DecorativeBorder>

        <DecorativeBorder>
          <ChartCard title="近30天销售趋势">
            <TrendChart data={data.trend} />
          </ChartCard>
        </DecorativeBorder>

        <DecorativeBorder>
          <ChartCard title="品类销售占比">
            <CategoryChart data={data.categories} />
          </ChartCard>
        </DecorativeBorder>

        <div className={styles.bottom}>
          <DecorativeBorder>
            <ChartCard title="区域销售排行 TOP10">
              <RankingChart data={data.rankings} />
            </ChartCard>
          </DecorativeBorder>

          <DecorativeBorder>
            <ChartCard title="最新订单">
              <ScrollTable data={data.orders} />
            </ChartCard>
          </DecorativeBorder>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.updateInfo}>
          <span className={styles.dot} />
          <span>数据更新时间：{updateTime}</span>
          <span style={{ color: "rgba(0,240,255,0.2)" }}>|</span>
          <span>自动刷新间隔：30s</span>
        </div>
        <button className={styles.refreshBtn} onClick={handleRefresh}>
          ⟳ 刷新数据
        </button>
      </footer>
    </div>
  );
}
