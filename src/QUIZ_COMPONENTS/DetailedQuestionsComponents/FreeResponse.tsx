import questions from "../../JSON_files/detailedQuestions.json";
import { OptionsProps } from "./MultipleChoice";

interface FR_Props extends OptionsProps {
	userInput: string;
	updateUserInput: (userInput: string) => void;
	choice: string | undefined;
}

export default function FreeResponse({
	answeredQuestions,
	currentIndex,
	userInput,
	updateUserChoice,
	updateUserInput,
	saveAnswers,
	choice
}: FR_Props) {
	return (
		<>
			<textarea
				placeholder="Enter your response..."
				maxLength={500}
				value={
					(answeredQuestions[currentIndex] &&
						answeredQuestions[currentIndex]?.choice) ||
					userInput
				}
				onChange={e => {
					updateUserChoice(e.target.value);
					updateUserInput(e.target.value);
					saveAnswers(
						e.target.value,
						questions[currentIndex].question_number,
						questions[currentIndex].type,
						questions[currentIndex].question
					);
				}}
			></textarea>
			<p className="characterLimitText">
				{!choice ? 0 : choice.length}/500 characters remaining
			</p>
		</>
	);
}
