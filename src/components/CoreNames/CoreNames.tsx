"use client";

import React, { useState, useEffect } from "react";
import styles from "./CoreNames.module.css";
import FloatingMemory from "../FloatingMemory/FloatingMemory";
import { memories } from "../../data/memories";

const CoreNames: React.FC = () => {
  const [memoryPositions, setMemoryPositions] = useState<
    Array<{ top: number; left: number }>
  >([]);

  useEffect(() => {
    const generateRandomPosition = () => ({
      top: Math.random() * window.innerHeight,
      left: Math.random() * window.innerWidth,
    });

    setMemoryPositions(
      Array.from({ length: memories.length }, generateRandomPosition)
    );
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

      {memories.map(
        (memory, index) =>
          memoryPositions[index] && (
            <FloatingMemory
              key={memory.id}
              initialTop={memoryPositions[index].top}
              initialLeft={memoryPositions[index].left}
              memory={memory}
            />
          )
      )}
    </div>
  );
};

export default CoreNames;
