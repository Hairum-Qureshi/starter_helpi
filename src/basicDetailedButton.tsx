import { useNavigate } from "react-router-dom";
import "./basicDetailedButton.css";

function BasicDetailedButtons() {
	const navigate = useNavigate();

	return (
		<>
			<div className="buttonContainer">
				<div className="basicBtnContainer">
					<button onClick={() => navigate("/basic")}>Basic Quiz</button>
					<p>
						This is a 10 - 15 minute quiz aimed to gauge interests and skills to
						provide suggestions and information on potential careers.
					</p>
				</div>
				<div className="detailedBtnContainer">
					<button onClick={() => navigate("/detailed")}>Detailed Quiz</button>
					<p>
						This is a 30 - 35 minute quiz aimed to understand your goals and
						passions in order to provide potential careers.
					</p>
				</div>
			</div>
		</>
	);
}
export default BasicDetailedButtons;
