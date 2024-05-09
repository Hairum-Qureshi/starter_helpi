import { useState } from "react";
import QuestionFormatProps from "./interfaces/questionFormat";
import { BasicOptions } from "./interfaces/basicOption";

const QuestionFormatComponent: React.FC<QuestionFormatProps> = ({
	options
}) => {
	const [selected, setSelected] = useState<string | undefined>(undefined);

	const optionSelect = (option: string | undefined) => {
		setSelected(option);
	};

	return (
		<div>
			<p>Select an option:</p>
			{options && options.length > 0
				? options.map((option: BasicOptions, index: number) => (
						<label key={index}>
							<input
								type="radio"
								value={option.text}
								checked={selected === option}
								onChange={() => optionSelect(option && option.text)}
							/>
							{option.text}
						</label>
				  ))
				: null}
			<p>You selected: {selected}</p>
		</div>
	);
};

export default QuestionFormatComponent;
