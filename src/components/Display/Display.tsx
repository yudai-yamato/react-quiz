import styles from "./Display.module.css";
import type { ReactNode } from "react";

export default function Display({children}: {children: ReactNode}) {
  return (
    <div className={styles.display}>
        {children}
    </div>
  )
}
