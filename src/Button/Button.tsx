import styles from "./Button.module.css";

export default function Button({children, onClick}: {children: string; onClick: () => void} ) {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
        <span className={styles.buttonInner}>{children}</span>
    </button>
  )
}
