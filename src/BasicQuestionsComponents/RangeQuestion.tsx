export default function RangeQuestion() {
	return <div>RangeQuestion</div>;
}

// import { useState } from "react";
// import basic_css from "./basic.module.css";

// export default function RangeComponent({
// 	question_number,
// 	question,
// 	type,
// 	options
// }) {
// 	const [rangeVal, setRangeVal] = useState<number>(5);

// 	const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		setRangeVal(parseInt(event.target.value));
// 	};

// 	return (
// 		<div className={basic_css.quizContainer}>
// 			<div className={basic_css.questionContainer}>
// 				<label htmlFor="range">Select a value:</label>
// 				<input
// 					type="range"
// 					id="range"
// 					name="range"
// 					min={1}
// 					max={10}
// 					value={rangeVal}
// 					onChange={handleRangeChange}
// 				/>
// 				<p>Selected value: {rangeVal} </p>
// 			</div>
// 		</div>
// 	);
// }
