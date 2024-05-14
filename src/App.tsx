import "./CSS/App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Detailed from "./Detailed";
import Navigation from "./Navbar";
import Footer from "./Footer";
import BasicDetailedButtons from "./BasicDetailedButton";
import Results from "./Results";
import Basic from "./BasicQuestionsComponents/Basic";
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
					<Route path="/basicDetailedButton" Component={BasicDetailedButtons} />
					<Route path="/results" Component={Results} />
					<Route path="/about" Component={About} />
				</Routes>
				<Footer />
			</>
		</Router>
	);
}
export default App;
