import basic_questions from "../JSON_files/basicQuestions.json";
import basic_css from "../CSS/basic.module.css";
import { useEffect, useState } from "react";

interface Option {
	text: string;
	image: string;
}

export default function Basic() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentQuestionOptions, setCurrentQuestionOptions] = useState<
		Option[]
	>(basic_questions[currentIndex].options as Option[]);

	useEffect(() => {
		setCurrentQuestionOptions(
			basic_questions[currentIndex].options as Option[]
		);
	}, [currentIndex]);

	return (
		<div className={basic_css.quizContainer}>
			<div className={basic_css.questionContainer}>
				<h3>
					({currentIndex + 1}/{basic_questions.length}){" "}
					{basic_questions[currentIndex].question}
				</h3>
			</div>
			<div className={basic_css.optionsContainer}>
				{currentQuestionOptions.map((option: Option) => {
					return (
						<button key={option.text}>
							<span>
								<img src={option.image} alt="Question choice visual" />
							</span>
							<span>{option.text}</span>
						</button>
					);
				})}
			</div>
			<div className={basic_css.containerFooter}>
				<button
					disabled={currentIndex === 0}
					onClick={() =>
						setCurrentIndex(
							currentIndex => (currentIndex - 1) % basic_questions.length
						)
					}
				>
					Previous
				</button>
				<button
					disabled={currentIndex === basic_questions.length - 1}
					onClick={() =>
						setCurrentIndex(
							currentIndex => (currentIndex + 1) % basic_questions.length
						)
					}
				>
					Next
				</button>
			</div>
		</div>
	);
}

// import { useState } from "react";
// import questions from "../basicQuestions.json";
// // import QuestionFormatProps from "../interfaces/questionFormat";
// import { BasicOptions } from "../interfaces/basicOption";
// import basic_css from "./basic.module.css";
// import ProgressBar from "../ProgressBar";
// import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
// // import RangeComponent from "./RangeComponent";

// function Basic() {
// 	const [currentIndex, setCurrentIndex] = useState(0);

// 	const handleNext = () => {
// 		setCurrentIndex(prevIndex => prevIndex + 1);
// 	};

// 	const handlePrev = () => {
// 		setCurrentIndex(prevIndex => prevIndex - 1);
// 	};

// 	return (
// 		<div>
// 			<ProgressBar
// 				currentIndex={currentIndex}
// 				totalQuestions={questions.length}
// 			/>
// 			<div className={basic_css.quizContainer}>
// 				<div key={currentIndex}>
// 					<div className={basic_css.questionContainer}>
// 						<h3>
// 							({questions[currentIndex]?.question_number}/{questions.length})
// 							&nbsp;
// 							{questions[currentIndex]?.question}
// 						</h3>
// 					</div>
// 					{questions[currentIndex]?.type === "multipleChoice" ? (
// 						<MultipleChoiceQuestion
// 							options={questions[currentIndex]?.options as BasicOptions[]}
// 							question={questions[currentIndex]?.question}
// 							type={questions[currentIndex]?.type}
// 							question_number={questions[currentIndex]?.question_number}
// 						/>
// 					) : (
// 						<h1>Range component here</h1>
// 						// <RangeComponent
// 						// 	options={questions[currentIndex]?.options as BasicOptions[]}
// 						// 	question={questions[currentIndex]?.question}
// 						// 	type={questions[currentIndex]?.type}
// 						// 	question_number={questions[currentIndex]?.question_number}
// 						// />
// 					)}
// 					<button onClick={handlePrev} disabled={currentIndex === 0}>
// 						Previous
// 					</button>
// 					<button
// 						onClick={handleNext}
// 						disabled={currentIndex === questions.length - 1}
// 					>
// 						Next
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default Basic;
