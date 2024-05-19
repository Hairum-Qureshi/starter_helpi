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
