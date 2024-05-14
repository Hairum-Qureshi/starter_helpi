import basic_questions from "../JSON_files/basicQuestions.json";
import basic_css from "../CSS/basic.module.css";
import { useEffect, useState } from "react";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import RangeQuestion from "./RangeQuestion";
import ProgressBar from "../ProgressBar";
import { Answer } from "../detailed";
import Modal from "../Modal";
import Confetti from "react-confetti";
import Results from "../Results";
import useChatGPT from "../hooks/useChatGPT";

export interface Option {
	text: string;
	image: string;
}

export default function Basic() {
	const [currentIndex, setCurrentIndex] = useState<number>(
		Number(localStorage.getItem("current_question_basic")) || 0
	);
	const [currentQuestionOptions, setCurrentQuestionOptions] = useState<
		Option[]
	>(basic_questions[currentIndex].options as Option[]);
	const [choice, setChoice] = useState<string>();
	const [answeredQuestions, setAnsweredQuestions] = useState<Answer[]>(
		JSON.parse(localStorage.getItem("answered_questions_basic") || "[]")
	);
	const [modalVisibility, setModalVisibility] = useState(false);
	const [showConfetti, setShowConfetti] = useState(false);
	const [showReport, setShowReport] = useState(false);

	useEffect(() => {
		localStorage.setItem("current_question_basic", currentIndex.toString());
		setCurrentQuestionOptions(
			basic_questions[currentIndex].options as Option[]
		);
	}, [currentIndex]);

	function addChoice(selection: string) {
		setChoice(selection);
	}

	function updateModalVisibility() {
		setModalVisibility(!modalVisibility);
		setShowConfetti(false);
	}

	function saveAnswers(choice: string, question_num: number, question: string) {
		const updatedAnswers = answeredQuestions.map(answer =>
			answer.questionNo === question_num ? { ...answer, choice } : answer
		);

		setAnsweredQuestions(
			updatedAnswers.some(answer => answer.questionNo === question_num)
				? updatedAnswers
				: [...answeredQuestions, { question, questionNo: question_num, choice }]
		);
	}

	useEffect(() => {
		localStorage.setItem("current_question_basic", currentIndex.toString());
		localStorage.setItem(
			"answered_questions_basic",
			JSON.stringify(answeredQuestions)
		);
	}, [currentIndex, answeredQuestions]);

	const { status } = useChatGPT("basic");

	function showFunction() {
		if (status === "OK") {
			setShowReport(true);
		}
	}

	return !showReport ? (
		<>
			{showConfetti && <Confetti />}
			{modalVisibility ? (
				<Modal
					modalFunction={updateModalVisibility}
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
						<MultipleChoiceQuestion
							currentQuestionOptions={currentQuestionOptions}
							currentIndex={currentIndex}
							addChoice={addChoice}
							answeredQuestions={answeredQuestions}
							saveAnswers={saveAnswers}
						/>
					) : (
						<RangeQuestion
							currentIndex={currentIndex}
							addChoice={addChoice}
							currentChoice={answeredQuestions[currentIndex]?.choice}
							saveAnswers={saveAnswers}
						/>
					)}
				</div>
				<div className={basic_css.containerFooter}>
					<button
						disabled={currentIndex === 0}
						onClick={() => {
							setCurrentIndex(index => (index -= 1 % basic_questions.length));
							setChoice(
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
								setModalVisibility(!modalVisibility);
								setShowConfetti(true);

								setTimeout(() => {
									setShowConfetti(false);
								}, 8000);
							} else {
								setCurrentIndex(index => index + 1);
								setChoice(answeredQuestions[currentIndex + 1]?.choice || "");
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
	);
}