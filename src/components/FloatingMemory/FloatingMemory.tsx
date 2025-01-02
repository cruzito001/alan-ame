"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./FloatingMemory.module.css";
import type { Memory } from "../../types/memories";
import MemoryModal from "../MemoryModal/MemoryModal";
import { Film } from "lucide-react";

interface FloatingMemoryProps {
  initialTop: number;
  initialLeft: number;
  memory: Memory;
}

const FloatingMemory: React.FC<FloatingMemoryProps> = ({
  initialTop,
  initialLeft,
  memory,
}) => {
  const memoryRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({
    top: initialTop,
    left: initialLeft,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const animationRef = useRef<number>();
  const velocityRef = useRef({
    x: Math.random() * 2 - 1,
    y: Math.random() * 2 - 1,
  });

  const hasVideo = memory.media.some((item) => item.type === "video");

  useEffect(() => {
    const memory = memoryRef.current;
    if (!memory) return;

    let posX = initialLeft;
    let posY = initialTop;

    const animate = () => {
      if (!memory) return;

      posX += velocityRef.current.x;
      posY += velocityRef.current.y;

      // Bounce off edges
      if (posX <= 0 || posX >= window.innerWidth - memory.offsetWidth) {
        velocityRef.current.x *= -1;
      }
      if (posY <= 0 || posY >= window.innerHeight - memory.offsetHeight) {
        velocityRef.current.y *= -1;
      }

      setPosition({ top: posY, left: posX });
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [initialTop, initialLeft]);

  return (
    <>
      <div
        ref={memoryRef}
        className={styles.memory}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
        onClick={() => setIsModalOpen(true)}
      >
        <div className={styles.inner}>
          {hasVideo && <Film size={16} className={styles.videoIcon} />}
        </div>
      </div>

      <MemoryModal
        memory={memory}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default FloatingMemory;
