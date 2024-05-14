import { useNavigate } from "react-router-dom";
import "./CSS/basicDetailedButton.css";

function BasicDetailedButton() {
	const navigate = useNavigate();

	const basic_quiz: string | null = localStorage.getItem(
		"answered_questions_basic"
	);
	const detailed_quiz: string | null =
		localStorage.getItem("answered_questions");

	return (
		<>
			<div className="buttonContainer">
				<div className="basicBtnContainer">
					<button onClick={() => navigate("/basic")}>
						{basic_quiz ? "Resume Basic Quiz" : "Start Basic Quiz"}
					</button>
					<p>
						This is a 10 - 15 minute quiz aimed to gauge interests and skills to
						provide suggestions and information on potential careers.
					</p>
				</div>
				<div className="detailedBtnContainer">
					<button onClick={() => navigate("/detailed")}>
						{detailed_quiz ? "Resume Detailed Quiz" : "Start Detailed Quiz"}
					</button>
					<p>
						This is a 30 - 35 minute quiz aimed to understand your goals and
						passions in order to provide potential careers.
					</p>
				</div>
			</div>
		</>
	);
}
export default BasicDetailedButton;
