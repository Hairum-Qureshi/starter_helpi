import "./results.css";
import Markdown from "react-markdown";
import { PieChart } from "@mui/x-charts/PieChart";
import emailjs from "@emailjs/browser";
import { FormEvent, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Results() {
	const markdown = JSON.parse(localStorage.getItem("detailed_report")!);
	const name: string | undefined = localStorage.getItem("name")?.toUpperCase();

	const graph_data: string | null = localStorage.getItem("graph_data")!;

	const lines: string[] | undefined = graph_data
		?.split("\n")
		.filter((line: string) => line.trim() !== "");

	interface ChartData {
		career: string;
		percent: string;
		color: string;
	}

	const colors = ["lime", "pink", "yellow", "orange"];
	const chart_data: ChartData[] = [];
	// Map each line to an object containing career and percent
	lines?.map((line: string, index: number) => {
		// Split the line by colon or dash and trim spaces
		const [career, percent] = line
			.split(/:|-/)
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
			<div className="backdrop">
				<h1>HI {name || "N/A"}, WELCOME TO YOUR CAREER RESULTS!</h1>
			</div>
			{graph_data && markdown ? (
				<>
					<div ref={pdfRef}>
						<div className="report">
							{markdown ? <Markdown>{markdown}</Markdown> : null}
							{chart_data.length > 0 ? (
								<>
									<h2 className="pieChartHeader">
										WHAT CAREER SHOULD YOU MOST LIKELY CONSIDER?
									</h2>
									<div className="pieChartContainer">
										<h3>
											This pie chart visualizes and showcases which career you
											closely align with (based on percentage):
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
											width={900}
											height={300}
										/>
									</div>
								</>
							) : null}
						</div>
					</div>
					<div className="userOptionsContainer">
						<p>
							Please enter your email below if you would like to have this
							report emailed to you for your reference:
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
								value={name}
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
							If you would like to save and print this report for your
							reference, click the button below:
						</p>
						<button onClick={downloadPDFReport} disabled={loading}>
							{loading ? "Downloading Report..." : "Get PDF Report"}
						</button>
					</div>
				</>
			) : (
				<h1>
					Please make sure you have completed your quiz to view your results!
				</h1>
			)}
		</>
	);
}
