import styles from './StatusView.module.css';

export function LoadingView() {
  return (
    <div className={styles.statusWrap}>
      <div className={styles.spinner} />
      <span>数据加载中...</span>
    </div>
  );
}

export function ErrorView({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className={styles.statusWrap}>
      <span>⚠ {message}</span>
      <button className={styles.retryBtn} onClick={onRetry}>重试</button>
    </div>
  );
}
