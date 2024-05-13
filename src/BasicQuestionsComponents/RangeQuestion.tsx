import { Option } from "./Basic";
import { useEffect, useState } from "react";
import basic_css from "../CSS/basic.module.css";
import basic_questions from "../JSON_files/basicQuestions.json";
import { Answer } from "../detailed";

interface Props {
	currentIndex: number;
	addChoice: (selection: string) => void;
	currentChoice: string;
	saveAnswers: (choice: string, question_num: number, question: string) => void;
}
export default function RangeQuestion({
	currentIndex,
	addChoice,
	currentChoice,
	saveAnswers
}: Props) {
	const [rangeVal, setRangeVal] = useState(parseInt(currentChoice) || 1);

	useEffect(() => {
		addChoice(rangeVal.toString());

		saveAnswers(
			rangeVal.toString(),
			basic_questions[currentIndex].question_number,
			basic_questions[currentIndex].question
		);
	}, [rangeVal]);

	useEffect(() => {
		setRangeVal(parseInt(currentChoice));
	}, [currentIndex]);

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
