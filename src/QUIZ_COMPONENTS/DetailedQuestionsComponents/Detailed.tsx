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
		saveAnswers, // function meant to save the user's answers to local storage
		updateModalVisibility, // function meant to toggle showing/hiding the modal
		showFunction, // function responsible for only showing the user their report when ChatGPT finishes its response
		updateUserChoice, // function responsible for updating the user's choice whenever they change their MC selection
		updateUserInput, // function responsible for updating the user's response whenever they change their FR answer
		updateIndex, // function responsible for updating the current index of the question
		updateConfettiVisibility, // function meant to toggle showing/hiding the confetti animation
		choice, // the selection the user chose from the multiple choice
		showConfetti, // boolean representing whether or not the confetti should be shown or not
		modalVisibility, // boolean representing whether or not the modal should be visible or not
		currentIndex, // the current index
		userInput, // the user's response to a free response question
		answeredQuestions, // an array of Answer objects that grows as the user answers more questions
		showReport // boolean value representing whether or not the report should be shown to the user or not
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
									: answeredQuestions[currentIndex].choice === ""
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
									updateUserInput("");
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
