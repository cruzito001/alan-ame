"use client";

import React, { useState, useEffect } from "react";
import YearSelector from "../YearSelector/YearSelector";
import styles from "./Header.module.css";

interface HeaderProps {
  years: number[];
  initialYear: number;
}

const Header: React.FC<HeaderProps> = ({ years, initialYear }) => {
  const [selectedYear, setSelectedYear] = useState(initialYear);

  useEffect(() => {
    setSelectedYear(initialYear);
  }, [initialYear]);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    window.dispatchEvent(new CustomEvent("yearChange", { detail: year }));
  };

  return (
    <header className={styles.header}>
      <YearSelector
        years={years}
        selectedYear={selectedYear}
        onYearChange={handleYearChange}
      />
    </header>
  );
};

export default Header;
