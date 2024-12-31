"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./YearSelector.module.css";

interface YearSelectorProps {
  years: number[];
  selectedYear: number;
  onYearChange: (year: number) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({
  years,
  selectedYear,
  onYearChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleYearClick = (year: number) => {
    onYearChange(year);
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.selector}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedYear}
        <ChevronDown
          size={16}
          className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown} role="listbox">
          {years.map((year) => (
            <button
              key={year}
              className={styles.yearOption}
              onClick={() => handleYearClick(year)}
              role="option"
              aria-selected={year === selectedYear}
            >
              {year}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default YearSelector;
