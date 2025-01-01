"use client";

import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!isOpen) return null;

  const formattedDate = new Date(memory.date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === memory.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? memory.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>

        <div className={styles.content}>
          <h2 className={styles.title}>{memory.title}</h2>
          <time className={styles.date}>{formattedDate}</time>

          <div className={styles.imageContainer}>
            {memory.images.length > 1 && (
              <button
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={prevImage}
              >
                <ChevronLeft size={24} />
              </button>
            )}
            <img
              src={memory.images[currentImageIndex]}
              alt={`${memory.title} - imagen ${currentImageIndex + 1}`}
              className={styles.image}
            />
            {memory.images.length > 1 && (
              <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={nextImage}
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {memory.images.length > 1 && (
            <div className={styles.imageDots}>
              {memory.images.map((_, index) => (
                <span
                  key={index}
                  className={`${styles.dot} ${
                    index === currentImageIndex ? styles.activeDot : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                ></span>
              ))}
            </div>
          )}

          <p className={styles.description}>{memory.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MemoryModal;
