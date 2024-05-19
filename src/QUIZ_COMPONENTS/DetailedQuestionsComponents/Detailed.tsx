import { useEffect } from "react";
import "../../CSS/detailed.css";
import questions from "../../JSON_files/detailedQuestions.json";
import Modal from "../Modal";
import Confetti from "react-confetti";
import Results from "../../Results";
import ProgressBar from "../ProgressBar";
import { Link } from "react-router-dom";
import FreeResponse from "./FreeResponse";
import MultipleChoice from "./MultipleChoice";
import useQuizTools from "../../hooks/useQuizTools";

export interface Answer {
	question: string;
	questionNo: number;
	choice: string;
}

function Detailed() {
	const {
		saveAnswers,
		updateModalVisibility,
		showFunction,
		updateUserChoice,
		updateUserInput,
		updateIndex,
		updateConfettiVisibility,
		choice,
		showConfetti,
		modalVisibility,
		currentIndex,
		userInput,
		answeredQuestions,
		showReport
	} = useQuizTools("detailed");

	useEffect(() => {
		localStorage.setItem("current_question", currentIndex.toString());
		localStorage.setItem(
			"answered_questions",
			JSON.stringify(answeredQuestions)
		);
	}, [currentIndex, answeredQuestions]);

	const name: string | null = localStorage.getItem("name");

	return name ? (
		!showReport ? (
			<>
				{showConfetti && <Confetti />}
				{modalVisibility ? (
					<Modal
						updateModalVisibility={updateModalVisibility}
						showFunction={showFunction}
					/>
				) : null}
				<div className="quizContainer">
					<ProgressBar
						currentIndex={currentIndex}
						totalQuestions={questions.length}
					></ProgressBar>
					<br></br>
					<div className="questionContainer">
						<img
							src={questions[currentIndex].image}
							alt="Visual question aid"
						/>
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
										<MultipleChoice
											answeredQuestions={answeredQuestions}
											currentIndex={currentIndex}
											updateUserChoice={updateUserChoice}
											saveAnswers={saveAnswers}
											index={index}
										>
											{choice}
										</MultipleChoice>
									)
							  )
							: questions[currentIndex].type === "free_response" && (
									<FreeResponse
										answeredQuestions={answeredQuestions}
										currentIndex={currentIndex}
										userInput={userInput}
										updateUserChoice={updateUserChoice}
										updateUserInput={updateUserInput}
										saveAnswers={saveAnswers}
										choice={choice}
									/>
							  )}
					</div>
					<div className="containerFooter">
						<button
							disabled={currentIndex === 0}
							onClick={() => {
								updateIndex(currentIndex, "previous");
								updateUserChoice(
									answeredQuestions[currentIndex] &&
										answeredQuestions[currentIndex - 1].choice
								);
							}}
						>
							{currentIndex === 0 ? "END" : "PREV."}
						</button>
						<button
							disabled={
								questions[currentIndex].type !== "free_response"
									? answeredQuestions.indexOf(
											answeredQuestions[currentIndex]
									  ) === -1
									: !choice || !!(choice && choice.length > 500)
							}
							onClick={() => {
								if (currentIndex === questions.length - 1) {
									updateModalVisibility(!modalVisibility);
									updateConfettiVisibility(true);

									setTimeout(() => {
										updateConfettiVisibility(false);
									}, 8000);
								} else {
									updateIndex(currentIndex, "next");
									updateUserChoice(
										answeredQuestions[currentIndex + 1]?.choice || ""
									);
									updateUserChoice("");
								}
							}}
						>
							{currentIndex === questions.length - 1
								? "SUBMIT RESPONSES"
								: "NEXT"}
						</button>
					</div>
				</div>
			</>
		) : (
			<Results quiz_type={"detailed"} />
		)
	) : (
		<h1>
			Please be sure to enter your name! Click <Link to="/">here</Link>!
		</h1>
	);
}

export default Detailed;

// import { useEffect, useState } from "react";
// import "../../CSS/detailed.css";
// import questions from "../../JSON_files/detailedQuestions.json";
// import Modal from "../Modal";
// import Confetti from "react-confetti";
// import Results from "../../Results";
// import ProgressBar from "../ProgressBar";
// import useChatGPT from "../../hooks/useChatGPT";
// import { Link } from "react-router-dom";
// import FreeResponse from "./FreeResponse";
// import MultipleChoice from "./MultipleChoice";

// export interface Answer {
// 	question: string;
// 	questionNo: number;
// 	choice: string;
// }

// function Detailed() {
// 	const [choice, setChoice] = useState<string>();
// 	const [currentIndex, setCurrentIndex] = useState<number>(
// 		Number(localStorage.getItem("current_question")) || 0
// 	);
// 	const [answeredQuestions, setAnsweredQuestions] = useState<Answer[]>(
// 		JSON.parse(localStorage.getItem("answered_questions") || "[]")
// 	);
// 	const [userInput, setUserInput] = useState<string>(
// 		answeredQuestions[currentIndex]?.choice || ""
// 	);
// 	const [showReport, setShowReport] = useState(false);

// 	console.log(userInput);
// 	const [modalVisibility, setModalVisibility] = useState(false);
// 	const [showConfetti, setShowConfetti] = useState(false);

// 	useEffect(() => {
// 		localStorage.setItem("current_question", currentIndex.toString());
// 		localStorage.setItem(
// 			"answered_questions",
// 			JSON.stringify(answeredQuestions)
// 		);
// 	}, [currentIndex, answeredQuestions]);

// 	function saveAnswers(
// 		choice: string,
// 		question_num: number,
// 		question_type: string,
// 		question: string
// 	) {
// 		if (question_type === "free_response" && choice.trim() === "") {
// 			setChoice("");
// 		}

// 		const updatedAnswers = answeredQuestions.map(answer =>
// 			answer.questionNo === question_num ? { ...answer, choice } : answer
// 		);

// 		setAnsweredQuestions(
// 			updatedAnswers.some(answer => answer.questionNo === question_num)
// 				? updatedAnswers
// 				: [...answeredQuestions, { question, questionNo: question_num, choice }]
// 		);
// 	}

// 	function updateModalVisibility() {
// 		setModalVisibility(!modalVisibility);
// 		setShowConfetti(false);
// 	}

// 	const { status } = useChatGPT("detailed");

// 	function showFunction() {
// 		if (status === "OK") {
// 			setShowReport(true);
// 			// keeping this will remove the answered questions from local storage and that way, when the user has completed the quiz, if they go back to the home page, it won't say "Resume Detailed Quiz" but rather, "Start Detailed Quiz" which makes sense since by the time they get to the report, they've completed the quiz.
// 			localStorage.removeItem("answered_questions");
// 		}
// 	}

// 	function updateUserChoice(userChoice: string) {
// 		setChoice(userChoice);
// 	}

// 	function updateUserInput(user_input: string) {
// 		setUserInput(user_input);
// 	}

// 	const name: string | null = localStorage.getItem("name");

// 	return name ? (
// 		!showReport ? (
// 			<>
// 				{showConfetti && <Confetti />}
// 				{modalVisibility ? (
// 					<Modal
// 						modalFunction={updateModalVisibility}
// 						showFunction={showFunction}
// 					/>
// 				) : null}
// 				<div className="quizContainer">
// 					<ProgressBar
// 						currentIndex={currentIndex}
// 						totalQuestions={questions.length}
// 					></ProgressBar>
// 					<br></br>
// 					<div className="questionContainer">
// 						<img
// 							src={questions[currentIndex].image}
// 							alt="Visual question aid"
// 						/>
// 						<h3>
// 							({questions[currentIndex].question_number}/{questions.length})
// 							&nbsp;
// 							{questions[currentIndex].question}
// 						</h3>
// 					</div>
// 					<div className="optionsContainer">
// 						{questions[currentIndex].type === "multiple_choice"
// 							? questions[currentIndex].choices.map(
// 									(choice: string, index: number) => (
// 										<MultipleChoice
// 											answeredQuestions={answeredQuestions}
// 											currentIndex={currentIndex}
// 											updateUserChoice={updateUserChoice}
// 											saveAnswers={saveAnswers}
// 											index={index}
// 										>
// 											{choice}
// 										</MultipleChoice>
// 									)
// 							  )
// 							: questions[currentIndex].type === "free_response" && (
// 									<FreeResponse
// 										answeredQuestions={answeredQuestions}
// 										currentIndex={currentIndex}
// 										userInput={userInput}
// 										updateUserChoice={updateUserChoice}
// 										updateUserInput={updateUserInput}
// 										saveAnswers={saveAnswers}
// 										choice={choice}
// 									/>
// 							  )}
// 					</div>
// 					<div className="containerFooter">
// 						<button
// 							disabled={currentIndex === 0}
// 							onClick={() => {
// 								setCurrentIndex(index => (index -= 1 % questions.length));
// 								setChoice(
// 									answeredQuestions[currentIndex] &&
// 										answeredQuestions[currentIndex - 1].choice
// 								);
// 							}}
// 						>
// 							{currentIndex === 0 ? "END" : "PREV."}
// 						</button>
// 						<button
// 							disabled={!choice || choice.length > 500}
// 							onClick={() => {
// 								if (currentIndex === questions.length - 1) {
// 									setModalVisibility(!modalVisibility);
// 									setShowConfetti(true);

// 									setTimeout(() => {
// 										setShowConfetti(false);
// 									}, 8000);
// 								} else {
// 									setCurrentIndex(index => index + 1);
// 									setChoice(answeredQuestions[currentIndex + 1]?.choice || "");
// 									setUserInput("");
// 								}
// 							}}
// 						>
// 							{currentIndex === questions.length - 1
// 								? "SUBMIT RESPONSES"
// 								: "NEXT"}
// 						</button>
// 					</div>
// 				</div>
// 			</>
// 		) : (
// 			<Results quiz_type={"detailed"} />
// 		)
// 	) : (
// 		<h1>
// 			Please be sure to enter your name! Click <Link to="/">here</Link>!
// 		</h1>
// 	);
// }

// export default Detailed;
