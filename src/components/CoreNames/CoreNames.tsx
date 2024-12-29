import React from "react";
import styles from "./CoreNames.module.css";

const CoreNames: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={`${styles.glow} ${styles.topGlow}`}></div>
      <div className={`${styles.glow} ${styles.bottomGlow}`}></div>

      <div className={styles.content}>
        <div className={styles.namesContainer}>
          <h1 className={styles.name}>Alan</h1>
          <span className={styles.ampersand}>&</span>
          <h1 className={styles.name}>América</h1>
        </div>
        <p className={styles.subtitle}>Nuestros Recuerdos</p>
      </div>
    </div>
  );
};

export default CoreNames;
