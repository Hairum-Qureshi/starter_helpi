import "./CSS/about.css";

function About() {
	return (
		<>
			<div className="about-bin">
				<div className="circle"></div>
				<h1>About Us!</h1>
			</div>
			<div className="about-bin">
				<p>
					We are a group of students from the University of Delaware that{" "}
					<br></br>
					created a career finder website in hopes of aiding people through
					their <br></br>
					career searching journeys. We rely on the use of ChatGPT to generate
					suggested <br></br>
					careers based on your answers to the questions on either of our
					quizzes.
				</p>
				<p>
					We chose the caribou for our website's mascot. The caribou is meant
					<br></br>
					to represent resilience and adaptability. They navigate through
					challenging terrains<br></br>
					just as we hope this platform will aid you in navigating through
					choosing a career<br></br>
					that is best suited for your interests and skills and motivating you
					to take the next step.
				</p>
			</div>
		</>
	);
}

export default About;
