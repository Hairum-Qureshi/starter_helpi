import { ProgressBarProps } from "./interfaces/progressFunction";
import "./ProgressBar.css";
import React, { useState } from "react";

//basic progress bar
const ProgressBar: React.FC<ProgressBarProps> = ({ progressVal = 0 }) => {
	const [progress, setProgress] = useState<number>(progressVal);
	const updateProgress = () => {
		const newProgress = progress + 100 / 15;
		setProgress(newProgress > 100 ? 100 : newProgress);
	};
	return (
		<div className="progress-bar-container">
			<div className="progress-bar" style={{ width: `${progress}%` }}></div>
			<button onClick={updateProgress}>Increase Progress</button>
		</div>
	);
};

export default ProgressBar;
