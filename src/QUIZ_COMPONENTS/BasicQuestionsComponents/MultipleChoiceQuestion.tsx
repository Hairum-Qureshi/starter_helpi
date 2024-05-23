import { Option } from "./Basic";
import basic_questions from "../../JSON_files/basicQuestions.json";
import { Answer } from "../DetailedQuestionsComponents/Detailed";

interface Props {
	index: number;
	option: Option;
	currentIndex: number;
	addChoice: (selection: string) => void;
	answeredQuestions: Answer[];
	saveAnswers: (
		choice: string,
		question_num: number,
		question_type: string,
		question: string
	) => void;
}

export default function MultipleChoiceQuestion({
	index,
	option,
	currentIndex,
	addChoice,
	answeredQuestions,
	saveAnswers
}: Props) {
	return (
		<>
			<button
				key={index}
				onClick={() => {
					addChoice(option.text);
					saveAnswers(
						option.text,
						basic_questions[currentIndex].question_number,
						basic_questions[currentIndex].type,
						basic_questions[currentIndex].question
					);
				}}
				style={{
					backgroundColor: `${
						answeredQuestions[currentIndex]?.choice === option.text
							? "#006BA6"
							: "#003459"
					}`,
					transition: "0.25s ease",
					border: `${
						answeredQuestions[currentIndex]?.choice === option.text
							? "2px solid cyan"
							: "none"
					}`
				}}
			>
				<span>
					<img src={option.image} alt="Question choice visual" />
				</span>
				{option.text}
			</button>
		</>
	);
}
