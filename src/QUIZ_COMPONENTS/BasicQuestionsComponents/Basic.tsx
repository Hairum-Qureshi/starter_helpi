import basic_questions from "../../JSON_files/basicQuestions.json";
import basic_css from "../../CSS/basic.module.css";
import { useEffect, useState } from "react";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import RangeQuestion from "./RangeQuestion";
import ProgressBar from "../ProgressBar";
import Modal from "../Modal";
import Confetti from "react-confetti";
import Results from "../../Results";
import { Link } from "react-router-dom";
import useQuizTools from "../../hooks/useQuizTools";

export interface Option {
	text: string;
	image: string;
}

export default function Basic() {
	const {
		saveAnswers,
		updateModalVisibility,
		showFunction,
		updateUserChoice,
		updateIndex,
		updateConfettiVisibility,
		choice,
		showConfetti,
		modalVisibility,
		currentIndex,
		answeredQuestions,
		showReport
	} = useQuizTools("basic");

	const [currentQuestionOptions, setCurrentQuestionOptions] = useState<
		Option[]
	>(basic_questions[currentIndex].options as Option[]);

	console.log(currentIndex);

	useEffect(() => {
		localStorage.setItem("current_question_basic", currentIndex.toString());

		localStorage.setItem(
			"answered_questions_basic",
			JSON.stringify(answeredQuestions)
		);
		setCurrentQuestionOptions(
			basic_questions[currentIndex].options as Option[]
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
				<div className={basic_css.quizContainer}>
					<div className={basic_css.progressBarContainer}>
						<ProgressBar
							currentIndex={currentIndex}
							totalQuestions={basic_questions.length}
						/>
						<br></br>
					</div>
					<div className={basic_css.questionContainer}>
						<h3>
							({currentIndex + 1}/{basic_questions.length}) &nbsp;
							{basic_questions[currentIndex].question}
						</h3>
					</div>
					<div className={basic_css.optionsContainer}>
						{basic_questions[currentIndex].type === "multipleChoice" ? (
							currentQuestionOptions.map((option: Option, index: number) => {
								return (
									<MultipleChoiceQuestion
										index={index}
										option={option}
										currentQuestionOptions={currentQuestionOptions}
										currentIndex={currentIndex}
										addChoice={updateUserChoice}
										answeredQuestions={answeredQuestions}
										saveAnswers={saveAnswers}
									/>
								);
							})
						) : (
							<RangeQuestion
								currentIndex={currentIndex}
								addChoice={updateUserChoice}
								currentChoice={answeredQuestions[currentIndex]?.choice}
								saveAnswers={saveAnswers}
							/>
						)}
					</div>
					<div className={basic_css.containerFooter}>
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
							disabled={!choice}
							onClick={() => {
								if (currentIndex === basic_questions.length - 1) {
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
								}
							}}
						>
							{currentIndex === basic_questions.length - 1
								? "SUBMIT RESPONSES"
								: "NEXT"}
						</button>
					</div>
				</div>
			</>
		) : (
			<Results />
		)
	) : (
		<h1>
			Please be sure to enter your name! Click <Link to="/">here</Link>!
		</h1>
	);
}
