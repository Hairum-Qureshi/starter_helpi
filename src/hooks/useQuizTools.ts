import { useState } from "react";
import useChatGPT from "./useChatGPT";
import basic_questions from "../JSON_files/basicQuestions.json";
import detailed_questions from "../JSON_files/detailedQuestions.json";
import { Answer } from "../QUIZ_COMPONENTS/DetailedQuestionsComponents/Detailed";

interface QuizTools {
	saveAnswers: (
		choice: string,
		question_num: number,
		question_type: string,
		question: string
	) => void;
	updateModalVisibility: (modalVisibility?: boolean) => void;
	showFunction: () => void;
	updateUserChoice: (userChoice: string) => void;
	updateUserInput: (user_input: string) => void;
	updateIndex: (index: number, button_type: string) => void;
	updateConfettiVisibility: (show_confetti: boolean) => void;
	choice: string | undefined;
	showConfetti: boolean;
	modalVisibility: boolean;
	currentIndex: number;
	userInput: string;
	answeredQuestions: Answer[];
	showReport: boolean;
}

export default function useQuizTools(quiz_type: string): QuizTools {
	const [currentIndex, setCurrentIndex] = useState<number>(
		quiz_type === "detailed"
			? Number(localStorage.getItem("current_question")) || 0
			: Number(localStorage.getItem("current_question_basic")) || 0
	);

	const [choice, setChoice] = useState<string>();
	const [answeredQuestions, setAnsweredQuestions] = useState<Answer[]>(
		quiz_type === "detailed"
			? JSON.parse(localStorage.getItem("answered_questions") || "[]")
			: JSON.parse(localStorage.getItem("answered_questions_basic") || "[]")
	);

	const [modalVisibility, setModalVisibility] = useState(false);
	const [showConfetti, setShowConfetti] = useState(false);
	const [showReport, setShowReport] = useState(false);
	const [userInput, setUserInput] = useState<string>(
		answeredQuestions[currentIndex]?.choice || ""
	);

	function saveAnswers(
		choice: string,
		question_num: number,
		question_type: string,
		question: string
	) {
		if (question_type === "free_response" && choice.trim() === "") {
			setChoice("");
		}

		const updatedAnswers = answeredQuestions.map(answer =>
			answer.questionNo === question_num ? { ...answer, choice } : answer
		);

		setAnsweredQuestions(
			updatedAnswers.some(answer => answer.questionNo === question_num)
				? updatedAnswers
				: [...answeredQuestions, { question, questionNo: question_num, choice }]
		);
	}

	function updateModalVisibility(modalVisibility?: boolean) {
		modalVisibility !== undefined && setModalVisibility(modalVisibility);

		setShowConfetti(false);
	}

	const { status } = useChatGPT(quiz_type);

	function showFunction() {
		if (status === "OK") {
			setShowReport(true);
			// keeping this will remove the answered questions from local storage and that way, when the user has completed the quiz, if they go back to the home page, it won't say "Resume Detailed Quiz" but rather, "Start Detailed Quiz" which makes sense since by the time they get to the report, they've completed the quiz.
			localStorage.removeItem("answered_questions");
		}
	}

	function updateUserChoice(userChoice: string) {
		setChoice(userChoice);
	}

	function updateUserInput(user_input: string) {
		setUserInput(user_input);
	}

	function updateConfettiVisibility(show_confetti: boolean) {
		setShowConfetti(show_confetti);
	}

	function updateIndex(index: number, button_type: string) {
		if (quiz_type === "detailed") {
			switch (button_type) {
				case "next":
					setCurrentIndex((index += 1 % detailed_questions.length));
					break;
				case "previous":
					setCurrentIndex((index -= 1 % detailed_questions.length));
			}
		} else {
			switch (button_type) {
				case "next":
					setCurrentIndex((index += 1 % basic_questions.length));
					break;
				case "previous":
					setCurrentIndex((index -= 1 % basic_questions.length));
			}
		}
	}

	return {
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
	};
}
