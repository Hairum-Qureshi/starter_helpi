import OpenAI from "openai";
import detailedQuestions from "../JSON_files/detailedQuestions.json";
import basicQuestions from "../JSON_files/basicQuestions.json";
import { Answer } from "../QUIZ_COMPONENTS/DetailedQuestionsComponents/Detailed";
import { useEffect, useState } from "react";

interface Tools {
	checkConnection: (quiz_type: string) => void;
	loading: boolean;
	status: string;
}

export default function useChatGPT(quiz_type: string): Tools {
	const API_KEY: string | null = localStorage.getItem("MYKEY");
	const [chat_gptResponse, setChat_gptResponse] = useState("");
	const [graphData, setGraphData] = useState("");
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState("BAD"); // state responsible for holding the status of whether or not the report has successfully been generated

	useEffect(() => {
		// needed to re-run and update the status state when the user adds their API key. This also resolved the issue of the status not being set to OK if the only problem was that the user forgot to add their API key; otherwise, the state would've remained as "BAD" even if they added their API key.
		API_KEY && setStatus("OK");
	}, [API_KEY]);

	async function callAPI(
		openai: OpenAI,
		users_responses: Answer[],
		api_request: string
	) {
		// responsible for formatting the the user's array object of choices/responses they typed/selected for each question which can then be used to be passed into the ChatGPT prompt in a manner it can understand through a numbered list in the format:
		// ([question no.]) [question]
		// [user choice/response]

		let formattedQ_A = "";
		users_responses.map((a: Answer) => {
			return (formattedQ_A += `(${a.questionNo}) ${a.question} \n ${a.choice} \n`);
		});

		let response = "";
		try {
			setLoading(true);
			// ChatGPT prompt is modified depending on what kind of request it is and what kind of quiz it is
			const stream = await openai.chat.completions.create({
				model: "gpt-4-turbo",
				messages: [
					{
						role: "user",
						content: `I am looking to generate a detailed and lengthy report catered towards helping a user find a list of 4 different careers by name that would closely match with what they've answered given a set of questions. Please titled it ${
							quiz_type === "basic"
								? "Basic Career Report"
								: "Detailed Career Report"
						}. ${
							api_request === "user_report"
								? "When generating this report, please give a detailed explanation why each career you list may be a good fit for the user. Please render the response using markdown that will be local storage and JSON.parse() friendly. Please also provide alternative paths the user could look into if the given list of potential careers you provide may not be of interest to the user."
								: "Please only list the 4 careers (1 to 4) by name and the percentage (that totals up to 100) of how likely the user fits that specific career and nothing else. Do not include any titles either, just a numbered list. Abbreviate the career names. Do not add any markdown and make sure none of the percentages are undefined."
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
			if (api_request === "user_report") {
				setChat_gptResponse(response);
				quiz_type === "detailed"
					? localStorage.setItem("detailed_report", response)
					: localStorage.setItem("detailed_report_basic", response);
			} else {
				setGraphData(response);
				quiz_type === "detailed"
					? localStorage.setItem("graph_data", response)
					: localStorage.setItem("graph_data_basic", response);
			}
		} catch (error) {
			alert(error);
			setLoading(false);
		}
	}

	useEffect(() => {
		if (chat_gptResponse && graphData) {
			setLoading(false);
		}
	}, [chat_gptResponse, graphData]);

	const users_responses: string | null =
		quiz_type === "detailed"
			? localStorage.getItem("answered_questions")
			: localStorage.getItem("answered_questions_basic");

	function checkConnection(quiz_type: string) {
		if (API_KEY && users_responses) {
			if (
				(quiz_type === "detailed" &&
					JSON.parse(users_responses).length === detailedQuestions.length) ||
				(quiz_type === "basic" &&
					JSON.parse(users_responses).length === basicQuestions.length)
			) {
				const openai: OpenAI = new OpenAI({
					apiKey: JSON.parse(API_KEY), // converts the string literal to a string without the double quotes
					dangerouslyAllowBrowser: true
				});
				callAPI(openai, JSON.parse(users_responses), "user_report"); // retrieve the overall user report
				callAPI(openai, JSON.parse(users_responses), "graph_data"); // retrieve the graph data for the report
				setStatus("OK");
			}
		} else {
			alert("Please make sure you've entered your API key");
			setStatus("BAD");
		}
	}

	return { checkConnection, loading, status };
}
