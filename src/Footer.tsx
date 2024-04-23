import { useState } from "react";
import "./footer.css";

export default function Footer() {
	//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
	let keyData = "";
	const saveKeyData = "MYKEY";
	const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
	if (prevKey !== null) {
		keyData = JSON.parse(prevKey);
	}

	const [key, setKey] = useState<string>(keyData); //for api key input

	//sets the local storage item to the api key the user inputed
	function handleSubmit() {
		localStorage.setItem(saveKeyData, JSON.stringify(key));
		window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
	}

	//whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
	function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
		setKey(event.target.value);
	}

	return (
		<div className="footerContainer">
			<footer>
				<label>API Key Here: </label>
				<input
					type="password"
					placeholder="Insert API Key Here"
					onChange={changeKey}
				/>
				<button className="Submit-Button" onClick={handleSubmit}>
					Submit
				</button>
				<br />
				&copy; {new Date().getFullYear()} Hairum Qureshi, Mithra Sankar, Olive
				Odida, and Olivia Folliard
			</footer>
		</div>
	);
}
