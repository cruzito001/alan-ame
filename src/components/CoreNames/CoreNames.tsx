"use client";

import React, { useState, useEffect } from "react";
import styles from "./CoreNames.module.css";
import FloatingMemory from "../FloatingMemory/FloatingMemory";
import { memories } from "../../data/memories";

interface CoreNamesProps {
  initialYear: number;
}

const CoreNames: React.FC<CoreNamesProps> = ({ initialYear }) => {
  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [memoryPositions, setMemoryPositions] = useState<
    Array<{ top: number; left: number }>
  >([]);

  useEffect(() => {
    const handleYearChange = (event: CustomEvent<number>) => {
      setSelectedYear(event.detail);
    };

    window.addEventListener("yearChange", handleYearChange as EventListener);
    return () => {
      window.removeEventListener(
        "yearChange",
        handleYearChange as EventListener
      );
    };
  }, []);

  useEffect(() => {
    const filteredMemories = memories.filter(
      (memory) => new Date(memory.date).getFullYear() === selectedYear
    );

    const generateRandomPosition = () => ({
      top: Math.random() * (window.innerHeight - 100),
      left: Math.random() * (window.innerWidth - 100),
    });

    setMemoryPositions(
      Array.from({ length: filteredMemories.length }, generateRandomPosition)
    );
  }, [selectedYear]);

  const filteredMemories = memories.filter(
    (memory) => new Date(memory.date).getFullYear() === selectedYear
  );

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

      {filteredMemories.map(
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
