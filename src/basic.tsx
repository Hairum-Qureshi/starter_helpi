/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState} from "react";
import questions from "./basicQuestions.json";
import { QuestionFormatProps } from "./interfaces/questionFormat";
import { BasicOptions } from "./interfaces/basicOption";
import "./Basic.css";
import ProgressBar from "./ProgressBar";
import Modal from "./Modal";
import Confetti from 'react-confetti';

//component used for multiple choice responses

const MultipleChoiceComponent: React.FC<QuestionFormatProps> = ({
	options
}) => {
	const [selected, setSelected] = useState<BasicOptions | null>(null);
	const optionSelect = (option: BasicOptions) => {
		setSelected(option);
	};
	return (
		<div className="quizContainer">
			<div className="optionsContainer">
				{options?.map((option: BasicOptions) => (
					<button key={option.image}>
						<input
							value={option.image}
							checked={selected === option.text}
							onChange={() => optionSelect(option)}
						/>
						{/*this line is fine*/}
						<div className="optionsContainer">{option.text}</div>
						<img src={option.image} alt="selected" className="selected-image"/>
					</button>
				))}
			</div>
		</div>
	);
};
//component used for range slider answer choices
const RangeComponent: React.FC<QuestionFormatProps> = ({
	options
}) => {
	const [rangeVal, setRangeVal] = useState<number>(5);

	const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRangeVal(parseInt(event.target.value));
	}
	return (
		<div className="quizContainer">
			<div className="questionContainer">
			<label htmlFor="range">Select a value:</label>
			<input
				type="range"
				id="range"
				name="range"
				min={1}
				max={10}
				value={rangeVal}
				onChange={handleRangeChange}
			/>
			<p>Selected value: {rangeVal} </p>
			</div>
		</div>
	);
};


function Basic() {
	//consts added for progress bar
	const [currentIndex, setCurrentIndex] = useState(0);

  	const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  	};

  	const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  	};
	//main return used to show completed question component
	return (
		<div>
			<ProgressBar
			currentIndex={currentIndex}
			totalQuestions={questions.length}
			/>
			<div className="quizContainer">
					<div key={currentIndex}>
						<div className="questionContainer">
							<h3>
							({questions[currentIndex].question_number}/{questions.length})
							&nbsp;
							{questions[currentIndex].question}
						</h3>
						</div>
						{questions[currentIndex].type === "multipleChoice" ? (
							<MultipleChoiceComponent
							options={questions[currentIndex].options as BasicOptions[]}
							question={questions[currentIndex].question}
							type={questions[currentIndex].type}
							question_number={questions[currentIndex].question_number}
						/>
			) : (
						<RangeComponent
							options={questions[currentIndex].options as BasicOptions[]}
							question={questions[currentIndex].question}
							type={questions[currentIndex].type}
							question_number={questions[currentIndex].question_number}
					/>	
			)}
						</div>
						
				</div>
			<button onClick={handlePrev} disabled={currentIndex === 0}>
			Previous
			</button>
			<button
			onClick={handleNext}
			disabled={currentIndex === questions.length - 1}
			>
			Next
			</button>
		</div>
		);
}
export default Basic;