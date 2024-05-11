import "./modal.css";
import useChatGPT from "./hooks/useChatGPT";
import { waveform } from "ldrs";

interface Props {
	modalFunction: () => void;
}

export default function Modal({ modalFunction }: Props) {
	const { checkConnection, loading } = useChatGPT();

	waveform.register();

	const name = localStorage.getItem("name");

	return (
		<div className="modal" onClick={modalFunction}>
			<div className="modal-content">
				{!loading ? (
					<p>
						Congratulations {name}, you've answered all of the questions! Click
						the cancel button if you would like to go back and review your
						answer choices once more. If you feel you're ready, click the 'GET
						RESULTS!' button to proceed.
					</p>
				) : (
					<h2>Generating your personalized career report. Please wait!</h2>
				)}
				<div className="buttonContainer">
					{!loading ? (
						<button disabled={loading} className="cancelBtn">
							CANCEL
						</button>
					) : null}
					<button
						disabled={loading}
						onClick={e => {
							e.stopPropagation();
							checkConnection();
						}}
					>
						{loading ? (
							<l-waveform
								size="25"
								stroke="3.5"
								speed="1"
								color="rgb(253, 8, 199)"
							></l-waveform>
						) : (
							"GET RESULTS!"
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
