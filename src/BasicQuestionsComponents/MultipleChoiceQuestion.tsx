import { Option } from "./Basic";

interface Props {
	currentQuestionOptions: Option[];
}

export default function MultipleChoiceQuestion({
	currentQuestionOptions
}: Props) {
	return (
		<>
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
		</>
	);
}
