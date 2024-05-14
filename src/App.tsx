import "./CSS/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Detailed from "./QUIZ_COMPONENTS/Detailed";
import Navigation from "./Navigation";
import Footer from "./Footer";
import BasicDetailedButton from "./basicDetailedButton";
import Basic from "./QUIZ_COMPONENTS/BasicQuestionsComponents/Basic";
import Home from "./Home";
import About from "./About";

function App() {
	return (
		<Router basename="/starter_helpi">
			<>
				<Navigation />
				<Routes>
					<Route path="/" Component={Home} />
					<Route path="/basic" Component={Basic} />
					<Route path="/detailed" Component={Detailed} />
					<Route path="/about" Component={About} />
				</Routes>
				<Footer />
			</>
		</Router>
	);
}
export default App;
