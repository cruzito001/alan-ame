"use client";

import React, { useState, useEffect } from "react";
import styles from "./CoreNames.module.css";
import FloatingMemory from "../FloatingMemory/FloatingMemory";

const CoreNames: React.FC = () => {
  const [memories, setMemories] = useState<
    Array<{ top: number; left: number }>
  >([]);

  useEffect(() => {
    const generateRandomPosition = () => ({
      top: Math.random() * window.innerHeight,
      left: Math.random() * window.innerWidth,
    });

    setMemories(Array.from({ length: 10 }, generateRandomPosition));
  }, []);

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

      {memories.map((memory, index) => (
        <FloatingMemory
          key={index}
          initialTop={memory.top}
          initialLeft={memory.left}
        />
      ))}
    </div>
  );
};

export default CoreNames;
