import type { OrderItem } from "@/types";
import styles from "./ScrollTable.module.css";

const statusLabel: Record<OrderItem["status"], string> = {
  completed: "已完成",
  pending: "待处理",
  cancelled: "已取消",
};

export default function ScrollTable({ data }: { data: OrderItem[] }) {
  const doubled = [...data, ...data];

  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <span>订单号</span>
        <span>商品</span>
        <span>客户</span>
        <span>金额</span>
        <span>状态</span>
      </div>
      <div className={styles.scrollBody}>
        <div className={styles.scrollTrack}>
          {doubled.map((o, i) => (
            <div key={`${o.id}-${i}`} className={styles.row}>
              <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>{o.id}</span>
              <span>{o.product}</span>
              <span>{o.customer}</span>
              <span className={styles.amount}>¥{o.amount.toLocaleString()}</span>
              <span className={`${styles.status} ${styles[o.status]}`}>{statusLabel[o.status]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
