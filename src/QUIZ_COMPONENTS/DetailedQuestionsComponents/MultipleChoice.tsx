import questions from "../../JSON_files/detailedQuestions.json";
import { Answer } from "./Detailed";

export interface OptionsProps {
	answeredQuestions: Answer[];
	currentIndex: number;
	updateUserChoice: (userChoice: string) => void;
	saveAnswers: (
		userInput: string,
		questionNumber: number,
		questionType: string,
		question: string
	) => void;
	index?: number;
	children?: React.ReactNode;
}

export default function MultipleChoice({
	answeredQuestions,
	currentIndex,
	updateUserChoice,
	saveAnswers,
	index,
	children
}: OptionsProps) {
	const choice = children as string;

	return (
		<button
			key={index}
			onClick={() => {
				updateUserChoice(choice);
				saveAnswers(
					choice,
					questions[currentIndex].question_number,
					questions[currentIndex].type,
					questions[currentIndex].question
				);
			}}
			style={{
				backgroundColor: `${
					answeredQuestions.some(
						selectedAnswer => selectedAnswer.choice === choice
					)
						? "#006BA6"
						: "#003459"
				}`,
				transition: "0.25s ease",
				border: `${
					answeredQuestions.some(
						selectedAnswer => selectedAnswer.choice === choice
					)
						? "2px solid cyan"
						: "none"
				}`
			}}
		>
			{choice}
		</button>
	);
}
