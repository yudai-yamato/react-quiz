import styles from './Loading.module.css';

export default function Loading({ active }: { active: boolean }) {
  return (
    <div className={`${styles.loading} ${active ? styles.isActive : ""}`}>
        <span className={styles.loadingText}>～結果発表～</span>
    </div>
  )
}
