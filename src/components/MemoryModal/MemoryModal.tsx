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
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

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

  const nextMedia = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === memory.media.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prevIndex) =>
      prevIndex === 0 ? memory.media.length - 1 : prevIndex - 1
    );
  };

  const renderMedia = () => {
    const currentMedia = memory.media[currentMediaIndex];
    if (currentMedia.type === "image") {
      return (
        <img
          src={currentMedia.url}
          alt={`${memory.title} - imagen ${currentMediaIndex + 1}`}
          className={styles.image}
        />
      );
    } else if (currentMedia.type === "video") {
      return <video src={currentMedia.url} controls className={styles.video} />;
    }
    return null;
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

          {memory.media && memory.media.length > 0 && (
            <div className={styles.mediaContainer}>
              {renderMedia()}
              {memory.media.length > 1 && (
                <>
                  <button
                    className={`${styles.navButton} ${styles.prevButton}`}
                    onClick={prevMedia}
                    aria-label="Medio anterior"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    className={`${styles.navButton} ${styles.nextButton}`}
                    onClick={nextMedia}
                    aria-label="Siguiente medio"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
          )}

          {memory.media && memory.media.length > 1 && (
            <div className={styles.mediaDots}>
              {memory.media.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.dot} ${
                    index === currentMediaIndex ? styles.activeDot : ""
                  }`}
                  onClick={() => setCurrentMediaIndex(index)}
                  aria-label={`Ir al medio ${index + 1}`}
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
