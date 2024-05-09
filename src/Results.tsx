// import useChatGPT from "./hooks/useChatGPT";
import "./results.css";
import Markdown from "react-markdown";
import { PieChart } from "@mui/x-charts/PieChart";
import emailjs from "@emailjs/browser";
import { FormEvent, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Results() {
	// const { chat_gptResponse } = useChatGPT();

	// TODO [ ] - implement a loading feature when the user presses the "get results" button on the modal
	// TODO [ ] - implement the 404 logic when the user attempts to access this page without completing the quiz
	// TODO [ ] - add a feature to have their report emailed to them or someone else

	/*
	
	1. Software Developer: 40%
	2. Data Analyst: 30%
	3. Health and Wellness Coordinator: 20%
	4. Corporate Trainer: 10%
	
	*/

	const markdown = `### Detailed Career Report for User

	Considering the answers provided, it is clear that you have varied interests and priorities which coalesce around technology, personal growth, and work-life balance. Based on your responses, I’ve tailored a list of four potential careers that might align with your aspirations, skills, and values. For each career, there is a comprehensive explanation of why it could be a good match. Additionally, alternative paths have been suggested in case these options are not feasible or appealing.
	
	#### Suggested Careers:
	
	1. **Software Developer (Focus on Health and Wellness)**  
	   **Why It's a Good Fit:**
	   - Interest in coding and previous projects, especially your engagement with the MERN coding project.
	   - Desire to support causes like health and wellness; you could work on software that supports these sectors, such as fitness tracking apps, medical appointment systems, or wellness platforms.
	   - Looking for recognition and appreciation, which is common in roles where your direct input creates visible outcomes.
	   - Prefer a balance between work and private life; many tech companies offer flexible schedules and remote work options.
	
	   **Alternative Path:**
	   - Technology Consultant in Healthcare, advising on best practices and implementing key health-tech solutions.
	
	2. **Data Analyst in Public Health Sector**  
	   **Why It's a Good Fit:**
	   - Strong analytical and problem-solving skills that are underutilized in your current job could be significantly leveraged here.
	   - Passion for health and wellness aligns with data-driven decision making in public health initiatives.
	   - Potential for growth and the necessity for ongoing learning and training which you felt lacking in your current role.
	
	   **Alternative Path:**
	   - Epidemiologist, combining data analysis with more hands-on research into health patterns and disease prevention.
	
	3. **Project Manager for Wellness Programs**  
	   **Why It's a Good Fit:**
	   - Suitability for leadership roles by managing those software development skills toward health-related projects.
	   - Emphasis on personal interest in health and wellness alongside your need for work that recognizes your contributions.
	   - Opportunity to cultivate training and development programs for teams, addressing your concern for better on-the-job growth and learning.
	
	   **Alternative Path:**
	   - Wellness Coordinator, focusing more directly on implementing and leading wellness activities within organizations.
	
	4. **User Experience (UX) Designer for Health Apps**  
	   **Why It's a Good Fit:**
	   - Combines your coding skills and interest in contributing to wellness with the creative aspect of designing engaging user interfaces.
	   - Flexible working conditions are often available in such roles, accommodating your need for a good work-life balance.
	   - The role is inherently oriented towards gaining appreciation from users and stakeholders through direct feedback on the product.
	
	   **Alternative Path:**
	   - Graphic Designer in a health-focused advertising agency, crafting visually engaging content to promote health awareness and wellness.
	
	#### General Recommendations for Alternative Paths:
	
	- **Further Education:** Considering your openness to further education or certification, pursuing a master’s degree in Health Informatics or a related field could open additional doors and provide a deeper entry into specialized roles where technology and health intersect.
	  
	- **Freelance or Contract Work:** If flexibility and diversity of projects are appealing, and in alignment with your skills in coding and development, freelance or contract work can provide a varied exposure to different projects without being tied to a single employer.
	
	- **Start-Up Opportunities:** Especially within the tech and health sectors, startups often appreciate the agility and broad skill set that you could offer. These environments also typically value innovative thinking, which can satisfy your craving for training and utilizing new skills.
	
	Your overall profile suggests a strong alignment with technology roles that have a social impact, specifically in health and wellness, where you can both grow personally and professionally while feeling appreciated for your contributions.
	
	Your feedback and any further reflections on these suggestions would be valuable for refining the list or exploring additional options.`;

	interface Career {
		careerNo?: string;
		title: string;
		description: string;
	}

	// Array to hold the extracted career options
	// Regular expression pattern to match each career option
	const pattern =
		/(\d+)\. \*\*(.+?)\*\*[\s\S]+?Why It's a Good Fit:\*\*([\s\S]+?)\*\*Alternative Path:/g;

	// Array to hold the extracted career options
	const careers: Career[] = [];

	// Match each career option using the regular expression pattern
	let match;
	while ((match = pattern.exec(markdown)) !== null) {
		// Extract relevant information
		const careerNumber = match[1];
		const careerTitle = match[2];
		let careerDescription = match[3].trim();

		// Replace line breaks with appropriate markdown syntax
		careerDescription = careerDescription.replace(/(?:\r\n|\r|\n)/g, "\n   ");

		// Push the extracted information into the array
		careers.push({
			careerNo: careerNumber,
			title: careerTitle,
			description: careerDescription
		});
	}

	// Regular expression pattern to match the recommendations
	const recommendationPattern = /- \*\*(.+?)\*\*([\s\S]+?)(?=- \*\*|$)/g;

	// Array to hold the extracted recommendations
	const alternativeCareers: Career[] = [];

	// Match each recommendation using the regular expression pattern
	while ((match = recommendationPattern.exec(markdown)) !== null) {
		// Extract recommendation details
		const recommendationTitle = match[1].trim();
		const recommendationDescription = match[2].trim();

		// Push the extracted recommendation into the array
		alternativeCareers.push({
			title: recommendationTitle,
			description: recommendationDescription
		});
	}

	const data = `
	1. Software Developer: 40%
	2. Data Analyst: 30%
	3. Health and Wellness Coordinator: 20%
	4. Corporate Trainer: 10%`;

	const lines = data.split("\n").filter(line => line.trim() !== "");

	interface ChartData {
		career: string;
		percent: string;
		color: string;
	}

	const colors = ["lime", "pink", "yellow", "orange"];
	const chart_data: ChartData[] = [];
	// Map each line to an object containing career and percent
	lines.map((line: string, index: number) => {
		// Split the line by colon and trim spaces
		const [career, percent] = line
			.split(":")
			.map((item: string) =>
				item
					.replace("1.", "")
					.replace("2.", "")
					.replace("3.", "")
					.replace("4.", "")
					.replace("%", "")
					.trim()
			);
		chart_data.push({ career, percent, color: colors[index] });
		return null;
	});

	// The code above was provided by ChatGPT, but I made some minor tweaks to it

	const form = useRef<HTMLFormElement>(null);
	const [email, setEmail] = useState("");

	const sendEmail = (event: FormEvent<HTMLFormElement>) => {
		if (!email) {
			event.preventDefault();
			alert("Please provide an email");
		} else {
			event.preventDefault();

			if (!form.current) return; // Ensure form.current is not null

			const formData = new FormData(form.current);

			formData.append("to_email", email.toLowerCase());

			emailjs
				.sendForm("service_t261vsc", "template_a7tcjsa", form.current, {
					publicKey: "Zj1lhdMNe9-VtmDkN"
				})
				.then(
					() => {
						console.log("SUCCESS!");
					},
					error => {
						console.log("FAILED...", error.text);
					}
				);
		}
	};

	// Code got from YouTube: https://youtu.be/QaZ2CoYFO60?si=eJWuV_Cp842JI748
	// Modified a little with some help from ChatGPT:
	// The code below does work. If the report appears too skinny when opening up the PDF, re-download it but make sure you're on the full view of the website and not like in dev tools where its open on one side and the site is in mobile view on the other.
	const [loading, setLoading] = useState(false);
	const pdfRef = useRef<HTMLDivElement>(null);

	function downloadPDFReport() {
		setLoading(true);
		const input = pdfRef.current;
		if (input) {
			try {
				html2canvas(input).then(canvas => {
					const imgData = canvas.toDataURL("image/png");
					const pdf = new jsPDF("p", "mm", "a4", true);
					const pdfWidth = pdf.internal.pageSize.getWidth();
					const pdfHeight = pdf.internal.pageSize.getHeight();
					const imgWidth = canvas.width;
					const imgHeight = canvas.height;
					const desiredZoomFactor = 0.069;
					const zoomedWidth = imgWidth * desiredZoomFactor;
					const zoomedHeight = imgHeight * desiredZoomFactor;
					const imgX = (pdfWidth - zoomedWidth) / 2;
					const imgY = (pdfHeight - zoomedHeight) / 2;

					pdf.addImage(imgData, "PNG", imgX, imgY, zoomedWidth, zoomedHeight);
					pdf.save("Report.pdf");
					setLoading(false);
				});
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		}
	}

	return (
		<>
			<div ref={pdfRef}>
				<div className="backdrop">
					<h1>HI, [YOUR NAME HERE]. WELCOME TO YOUR RESULTS!</h1>
				</div>
				<div className="report">
					<h1>YOUR TOP 4 CAREER CHOICES:</h1>
					<div className="cardContainer">
						{careers.map((career: Career) => {
							return (
								<div className="careersCard" key={career.careerNo}>
									<h2>
										<Markdown>{career.title}</Markdown>
									</h2>
									{career.description.split(" - ").map((desc: string) => {
										return desc !== "" ? (
											desc.includes("- ") ? (
												<Markdown>{`- ${desc.replace("- ", "")}`}</Markdown>
											) : (
												<Markdown>{`- ${desc}`}</Markdown>
											)
										) : null;
									})}
								</div>
							);
						})}
					</div>
					{alternativeCareers.length > 0 ? (
						<>
							<h2 className="alternativesHeader">
								YOUR TOP {alternativeCareers.length}
								&nbsp;
								{alternativeCareers.length === 1
									? "ALTERNATIVE CHOICE"
									: "ALTERNATIVE CHOICES"}
								:
							</h2>
							<div className="cardContainer">
								{alternativeCareers.length > 0 &&
									alternativeCareers.map((alternativeCareer, index: number) => {
										return (
											<div className="alternativesCard" key={index}>
												<Markdown>{`### ${alternativeCareer.title}`}</Markdown>
												{alternativeCareer.description
													.split("\n")
													.map((altCareer: string, index: number) =>
														altCareer.trim() ? (
															<Markdown
																key={index}
															>{`- ${altCareer}`}</Markdown>
														) : null
													)}
											</div>
										);
									})}
							</div>
						</>
					) : null}
				</div>
				{chart_data.length > 0 ? (
					<>
						<h2 className="pieChartHeader">
							WHAT CAREER SHOULD YOU MOST LIKELY CONSIDER?
						</h2>
						<div className="pieChartContainer">
							<h3>
								This pie chart visualizes and showcases which career you closely
								align with (based on percentage):
							</h3>
							<PieChart
								series={[
									{
										data: [
											{
												id: 0,
												value: parseInt(chart_data[0].percent),
												label: `${chart_data[0].career} (${chart_data[0].percent}%)`
											},
											{
												id: 1,
												value: parseInt(chart_data[1].percent),
												label: `${chart_data[1].career} (${chart_data[1].percent}%)`
											},
											{
												id: 2,
												value: parseInt(chart_data[2].percent),
												label: `${chart_data[2].career} (${chart_data[2].percent}%)`
											},
											{
												id: 3,
												value: parseInt(chart_data[3].percent),
												label: `${chart_data[3].career} (${chart_data[3].percent}%)`
											}
										]
									}
								]}
								width={960}
								height={350}
							/>
						</div>
					</>
				) : null}
			</div>
			<div className="userOptionsContainer">
				<p>
					Please enter your email below if you would like to have this report
					emailed to you for your reference:
				</p>
				<form ref={form} onSubmit={sendEmail}>
					<input
						type="email"
						placeholder="Enter email"
						name="user_email"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<button type="submit">Send Report</button>
					<input
						type="text"
						name="to_name"
						value="[YOUR NAME HERE]" // need to add option to have the user's name here
						style={{ visibility: "hidden" }}
					/>
					<input
						type="text"
						name="quiz_type"
						value="detailed"
						style={{ visibility: "hidden" }}
					/>
				</form>
				<p>
					If you would like to save and print this report for your reference,
					click the button below:
				</p>
				<button onClick={downloadPDFReport} disabled={loading}>
					{loading ? "Downloading Report..." : "Get PDF Report"}
				</button>
			</div>
		</>
	);
}
