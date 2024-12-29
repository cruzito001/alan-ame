"use client";

import React from "react";
import { X } from "lucide-react";
import type { Memory } from "../../types/memories";
import styles from "./MemoryModal.module.css";

interface MemoryModalProps {
  memory: Memory;
  isOpen: boolean;
  onClose: () => void;
}

const MemoryModal: React.FC<MemoryModalProps> = ({
  memory,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const formattedDate = new Date(memory.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>

        <div className={styles.content}>
          <div className={styles.header}>
            <h2 className={styles.title}>{memory.title}</h2>
            <time className={styles.date}>{formattedDate}</time>
          </div>

          <div className={styles.imageGrid}>
            {memory.images.map((image, index) => (
              <div key={index} className={styles.imageWrapper}>
                <img
                  src={image}
                  alt={`${memory.title} - imagen ${index + 1}`}
                  className={styles.image}
                />
              </div>
            ))}
          </div>

          <p className={styles.description}>{memory.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MemoryModal;
