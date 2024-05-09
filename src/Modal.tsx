import "./modal.css";
import useChatGPT from "./hooks/useChatGPT";

interface Props {
	modalFunction: () => void;
}

export default function Modal({ modalFunction }: Props) {
	const { checkConnection, loading } = useChatGPT();

	return (
		<div className="modal" onClick={modalFunction}>
			<div className="modal-content">
				<p>
					Congratulations, you've answered all of the questions! Click the
					cancel button if you would like to go back and review your answer
					choices once more. If you feel you're ready, click the 'GET RESULTS!'
					button to proceed.
				</p>
				<div className="buttonContainer">
					<button disabled={loading}>
						{loading ? "CANNOT CANCEL" : "CANCEL"}
					</button>
					<button
						disabled={loading}
						onClick={e => {
							e.stopPropagation();
							checkConnection();
						}}
					>
						{loading ? "Generating report...." : "GET RESULTS!"}
					</button>
				</div>
			</div>
		</div>
	);
}
