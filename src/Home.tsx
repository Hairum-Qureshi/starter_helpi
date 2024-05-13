import { useEffect, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import "./home.css";
import BasicDetailedButtons from "./basicDetailedButton";

export default function Home() {
	const [name, setName] = useState(localStorage.getItem("name") || "");
	const [showNextBtn, setShowNextBtn] = useState(false);
	const [currentSlide, setCurrentSlide] = useState(-1);
	const [isNameSaved, setIsNameSaved] = useState(
		!!localStorage.getItem("name")
	);

	useEffect(() => {
		setIsNameSaved(!!localStorage.getItem("name"));
	}, [name]);

	return (
		<div className="landingContainer">
			{currentSlide === -1 && !isNameSaved ? (
				<div className="welcomeMessage">
					<h1>Welcome to Careeribou Careers</h1>
					<p>
						Find the career that works just for you through two kinds of quizzes
						that utilizes unique—but important—questions
						<br />
						and actively seeks your input to get tailored and personalized
						career reports. To get started, let's get to know you.
					</p>
					<span>
						<h2>What's your name?</h2>
						<input
							type="text"
							value={name}
							autoComplete="off"
							onChange={e => {
								setName(e.target.value);
								setShowNextBtn(!!e.target.value.trim());
							}}
						/>
						{showNextBtn ? (
							<button
								onClick={() => {
									setCurrentSlide(currentSlide => currentSlide + 1);
									localStorage.setItem("name", name);
								}}
							>
								Next
							</button>
						) : null}
					</span>
				</div>
			) : (
				<>
					<div className="welcomeMessage">
						<h2>
							<Typewriter
								words={[
									`Nice to meet you, ${name}! Click on a quiz below to get started!`
								]}
								loop={1}
								typeSpeed={30}
								delaySpeed={1000}
							/>
						</h2>
						<div className="quizzesContainer">
							<BasicDetailedButtons />
						</div>
					</div>
				</>
			)}
			<img
				src="https://i.ibb.co/mHRSfz0/people-different-professions-together-600nw-2257416441-removebg-preview.png"
				alt="Silhouettes of people in different careers"
			/>
		</div>
	);
}
