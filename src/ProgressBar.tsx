// ProgressBar.tsx
import React from "react";
import "./ProgressBar.css";

interface ProgressBarProps {
  currentIndex: number;
  totalQuestions: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentIndex,
  totalQuestions,
}) => {
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
