import { useEffect, useState } from "react";
import basic_css from "../../CSS/basic.module.css";
import basic_questions from "../../JSON_files/basicQuestions.json";

interface Props {
	currentIndex: number;
	addChoice: (selection: string) => void;
	currentChoice: string;
	saveAnswers: (
		choice: string,
		question_num: number,
		question_type: string,
		question: string
	) => void;
}

export default function RangeQuestion({
	currentIndex,
	addChoice,
	currentChoice,
	saveAnswers
}: Props) {
	const [rangeVal, setRangeVal] = useState(1);

	useEffect(() => {
		addChoice(rangeVal.toString());
		saveAnswers(
			rangeVal.toString(),
			basic_questions[currentIndex].question_number,
			basic_questions[currentIndex].type,
			basic_questions[currentIndex].question
		);
	}, [addChoice, currentIndex, rangeVal, saveAnswers]);

	useEffect(() => {
		setRangeVal(!isNaN(parseInt(currentChoice)) ? parseInt(currentChoice) : 1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentIndex]);
	// I disabled eslint here too because it wanted me to replace 'currentIndex' in the dependency array with 'currentChoice'. Whenever I refreshed the page upon using the range on the range questions, the range bar would glitch out. Using 'currentIndex' does not have this issue and works perfectly fine.

	return (
		<div className={basic_css.questionContainer_range}>
			<input
				type="range"
				min={1}
				max={10}
				value={rangeVal}
				onChange={event => setRangeVal(parseInt(event.target.value))}
			/>
			<h3>You selected: {rangeVal} </h3>
		</div>
	);
}
