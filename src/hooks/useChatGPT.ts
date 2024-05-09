import OpenAI from "openai";
import detailedQuestions from "../detailedQuestions.json";
import { Answer } from "../detailed";
import { useState } from "react";

interface Tools {
	checkConnection: () => void;
	chat_gptResponse: string;
	graphData: string;
	loading: boolean;
}

export default function useChatGPT(): Tools {
	const API_KEY: string | null = localStorage.getItem("MYKEY");
	const [chat_gptResponse, setChat_gptResponse] = useState("");
	const [graphData, setGraphData] = useState("");
	const [loading, setLoading] = useState(false);

	async function callAPI(
		openai: OpenAI,
		users_responses: Answer[],
		api_request: string
	) {
		setLoading(true);
		let formattedQ_A = "";
		users_responses.map((a: Answer) => {
			return (formattedQ_A += `(${a.questionNo}) ${a.question} \n ${a.choice} \n`);
		});

		console.log("Loading ChatGPT's response...");

		let response = "";
		try {
			const stream = await openai.chat.completions.create({
				model: "gpt-4-turbo",
				messages: [
					{
						role: "user",
						content: `I am looking to generate a detailed and lengthy report catered towards helping a user find a list of 4 different careers by name that would closely match with what they've answered given a set of questions. ${
							api_request === "user_report"
								? "When generating this report, please give a detailed explanation why each career you list may be a good fit for the user. Please render the response using markdown. Please also provide alternative paths the user could look into if the given list of potential careers you provide may not be of interest to the user."
								: "Please only list the 4 careers by name and the percentage (that totals up to 100) of how likely the user fits for that specific career as well and nothing else."
						} If any of the questions receive answers that are gibberish, inappropriate, off-topic, or just don't make sense, ignore them. These questions and answers are as follows: \n ${formattedQ_A}`
					}
				],
				stream: true
			});
			for await (const part of stream) {
				if (part.choices[0].delta.content !== undefined) {
					response += part.choices[0].delta.content;
				}
			}

			if (api_request === "user_report") setChat_gptResponse(response);
			else setGraphData(response);

			setLoading(false);
			console.log(response);
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	}

	const users_responses: string | null =
		localStorage.getItem("answered_questions");

	function checkConnection() {
		if (
			API_KEY &&
			users_responses &&
			JSON.parse(users_responses).length === detailedQuestions.length
		) {
			const openai: OpenAI = new OpenAI({
				apiKey: JSON.parse(API_KEY), // converts the string literal to a string without the double quotes
				dangerouslyAllowBrowser: true
			});
			callAPI(openai, JSON.parse(users_responses), "user_report");
			callAPI(openai, JSON.parse(users_responses), "graph_data");
		} else {
			console.log("Please make sure you've entered your API key");
		}
	}

	return { checkConnection, chat_gptResponse, graphData, loading };
}
