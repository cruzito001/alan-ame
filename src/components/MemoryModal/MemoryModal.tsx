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

  const formattedDate = new Date(memory.date + "T00:00:00Z").toLocaleDateString(
    "es-ES",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }
  );

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
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Cerrar"
        >
          <X size={24} />
        </button>

        <div className={styles.content}>
          <h2 className={styles.title}>{memory.title}</h2>
          <time className={styles.date}>{formattedDate}</time>

          {memory.images && memory.images.length > 0 && (
            <div className={styles.imageContainer}>
              <img
                src={memory.images[currentImageIndex]}
                alt={`${memory.title} - imagen ${currentImageIndex + 1}`}
                className={styles.image}
              />
              {memory.images.length > 1 && (
                <>
                  <button
                    className={`${styles.navButton} ${styles.prevButton}`}
                    onClick={prevImage}
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    className={`${styles.navButton} ${styles.nextButton}`}
                    onClick={nextImage}
                    aria-label="Siguiente imagen"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
          )}

          {memory.images && memory.images.length > 1 && (
            <div className={styles.imageDots}>
              {memory.images.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${
                    index === currentImageIndex ? styles.activeDot : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Ir a la imagen ${index + 1}`}
                />
              ))}
            </div>
          )}

          <div className={styles.textContent}>
            <p className={styles.description}>{memory.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryModal;
