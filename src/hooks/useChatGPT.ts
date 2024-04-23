import OpenAI from "openai";
import detailedQuestions from "../detailedQuestions.json";
import { Answer } from "../detailed";

interface Tools {
	checkConnection: () => void;
}

export default function useChatGPT(): Tools {
	const API_KEY: string | null = localStorage.getItem("MYKEY");

	async function callAPI(openai: OpenAI, users_responses: Answer[]) {
		let response = "";
		try {
			const stream = await openai.chat.completions.create({
				model: "gpt-3.5-turbo",
				messages: [
					{
						role: "user", // will need to change to 4 but for the time being, I'll do 1
						content: `I am looking to generate 1 detailed report catered towards helping a user find 4 careers that would closely match with what they've answered given a set of questions. These questions are as follows:`
					}
				],
				stream: true
			});
			for await (const part of stream) {
				if (part.choices[0].delta.content !== undefined) {
					response += part.choices[0].delta.content;
				}
			}
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	}

	// let formattedQuestions = "";
	const users_responses: string | null =
		localStorage.getItem("answered_questions");
	// users_responses &&
	// 	JSON.parse(users_responses).map((a: Answer) => {
	// 		console.log(a);
	// 	});

	function checkConnection() {
		if (
			API_KEY &&
			users_responses &&
			users_responses.length === detailedQuestions.length
		) {
			const openai: OpenAI = new OpenAI({
				apiKey: JSON.parse(API_KEY), // converts the string literal to a string without the double quotes
				dangerouslyAllowBrowser: true
			});
			callAPI(openai, JSON.parse(users_responses));
		} else {
			console.log("Please make sure you've entered your API key");
		}
	}

	return { checkConnection };
}
