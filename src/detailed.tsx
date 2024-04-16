import { useEffect, useState } from "react";
import "../src/detailed.css";
import questions from "./detailedQuestions.json";

// TODO - [] add functionality to allow users to hit enter to move to the next question (or left + right arrow keys)

function Detailed() {
	interface Answer {
		questionNo: number;
		choice: string;
	}

	const [choice, setChoice] = useState<string>();

	const saved_index: number =
		Number(localStorage.getItem("current_question")) || 0;
	const last_saved: number = saved_index < 0 ? 0 : saved_index;

	const [currentIndex, setCurrentIndex] = useState(last_saved);
	localStorage.setItem("current_question", currentIndex.toString());

	const savedAnswersString = localStorage.getItem("answered_questions");
	const savedAnswers: Answer[] = savedAnswersString
		? JSON.parse(savedAnswersString)
		: [];
	const [answeredQuestions, setAnsweredQuestions] =
		useState<Answer[]>(savedAnswers);

	const [userInput, setUserInput] = useState<string>(
		answeredQuestions[currentIndex] && answeredQuestions[currentIndex].choice
	);

	function saveAnswers(
		choice: string,
		question_num: number,
		question_type: string
	) {
		if (question_type === "free_response" && !choice.trim()) {
			setChoice("");
		}

		if (answeredQuestions.length !== 0) {
			// 1. check if the question number exists
			//    -> if it does, check if the choice being passed in matches with the choice found for that question
			//		 -> if it does, return
			// 		 -> if it does not, update it
			// 2. if the question number does not exist, add it

			const questionNumber: Answer | undefined = answeredQuestions.find(
				(userAnswer: Answer) => {
					return userAnswer.questionNo === question_num;
				}
			);

			if (questionNumber !== undefined) {
				// the object contains this question, now check if the choice being passed in matches the one saved in the object for this particular question number

				// find the index of the current question number
				const questionIndex = answeredQuestions.findIndex(
					(userAnswer: Answer) => {
						return userAnswer.questionNo === questionNumber.questionNo;
					}
				);

				if (questionNumber.choice !== choice) {
					// the user selected a different choice for the question; update the choice for that question number
					// we can disregard the case where the user selects the same choice since nothing will change

					const updatedQuestions: Answer[] = [...answeredQuestions];
					updatedQuestions[questionIndex] = {
						...updatedQuestions[questionIndex], // copies the object at that index
						choice // updates the choice property of that object
					};
					setAnsweredQuestions(updatedQuestions);
				}
			} else {
				// the object does not contain the question; add it to the object
				setAnsweredQuestions([
					...answeredQuestions,
					{ questionNo: question_num, choice }
				]);
			}
		} else {
			// if it is empty, add the question number and choice to the array object
			setAnsweredQuestions([{ questionNo: question_num, choice }]);
		}
	}

	console.log(userInput);

	useEffect(() => {
		if (answeredQuestions.length !== 0) {
			localStorage.setItem(
				"answered_questions",
				JSON.stringify(answeredQuestions)
			);
		}
	}, [answeredQuestions]);

	return (
		<>
			<div className="quizContainer">
				<div className="questionContainer">
					<img src={questions[currentIndex].image} alt="Visual question aid" />
					<h3>
						({questions[currentIndex].question_number}/{questions.length})
						&nbsp;
						{questions[currentIndex].question}
					</h3>
				</div>
				<div className="optionsContainer">
					{questions[currentIndex].type === "multiple_choice"
						? questions[currentIndex].choices.map(
								(choice: string, index: number) => (
									<button
										key={index}
										onClick={() => {
											setChoice(choice);
											saveAnswers(
												choice,
												questions[currentIndex].question_number,
												questions[currentIndex].type
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
								)
						  )
						: questions[currentIndex].type === "free_response" && (
								<textarea
									placeholder="Enter your response..."
									value={
										answeredQuestions[currentIndex] &&
										answeredQuestions[currentIndex].choice
									}
									onChange={e => {
										setChoice(e.target.value);
										setUserInput(e.target.value);
										saveAnswers(
											e.target.value,
											questions[currentIndex].question_number,
											questions[currentIndex].type
										);
									}}
								></textarea>
						  )}
				</div>
				<div className="containerFooter">
					<button
						disabled={currentIndex === 0}
						onClick={() => {
							setCurrentIndex(index => (index -= 1 % questions.length));
							setChoice(
								answeredQuestions[currentIndex] &&
									answeredQuestions[currentIndex - 1].choice
							);
						}}
					>
						{currentIndex === 0 ? "END" : "PREV."}
					</button>
					<button
						disabled={currentIndex === questions.length - 1 || !choice}
						onClick={() => {
							setCurrentIndex(index => (index += 1 % questions.length));
							setChoice(
								answeredQuestions[currentIndex + 1] &&
									answeredQuestions[currentIndex + 1].choice
							);
						}}
					>
						{currentIndex === questions.length - 1 ? "END" : "NEXT"}
					</button>
				</div>
			</div>
			;
		</>
	);
}

export default Detailed;
