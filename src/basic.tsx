import React, { useState } from "react";
import questions from "./basicQuestions.json";
import { QuestionFormatProps } from "./interfaces/questionFormat";
import "./ProgressBar";

const QuestionFormatComponent: React.FC<QuestionFormatProps> = ({
	options
}) => {
	const [selected, setSelected] = useState<string | null>(null);
	const optionSelect = (option: string) => {
		setSelected(option);
	};
	/*useEffect(()=>{
		setSelected(basicQuestions);
	},[]);*/
	return (
		<div>
			<p>Select an option:</p>
			{options.map(option => (
				<label key={option}>
					<input
						type="radio"
						value={option}
						checked={selected === option}
						onChange={() => optionSelect(option)}
					/>
					{option}
				</label>
			))}
			<p>You selected: {selected}</p>
		</div>
	);
};

function Basic() {
	return (
		<div>
			<h1>This is the Basic Quiz.</h1>
			{questions.map((question: QuestionFormatProps, question_number) => (
				<div key={question_number}>
					<h2>{question.question}</h2>
					<QuestionFormatComponent
						options={question.options}
						question={question.question}
						type={question.type}
						question_number={question.question_number}
					/>
				</div>
			))}
		</div>
	);
}
export default Basic;
