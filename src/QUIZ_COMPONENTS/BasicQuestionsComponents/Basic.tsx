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
		saveAnswers, // function meant to save the user's answers to local storage
		updateModalVisibility, // function meant to toggle showing/hiding the modal
		showFunction, // function responsible for only showing the user their report when ChatGPT finishes its response
		updateUserChoice, // function responsible for updating the user's choice whenever they change their MC selection
		updateIndex, // function responsible for updating the current index of the question
		updateConfettiVisibility, // function meant to toggle showing/hiding the confetti animation
		choice, // the selection the user chose from the multiple choice
		showConfetti, // boolean representing whether or not the confetti should be shown or not
		modalVisibility, // boolean representing whether or not the modal should be visible or not
		currentIndex, // the current index
		answeredQuestions, // an array of Answer objects that grows as the user answers more questions
		showReport // boolean value representing whether or not the report should be shown to the user or not
	} = useQuizTools("basic");

	const [currentQuestionOptions, setCurrentQuestionOptions] = useState<
		Option[]
	>(basic_questions[currentIndex].options as Option[]);

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
