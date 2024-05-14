import { Link, useLocation } from "react-router-dom";
import "./CSS/navbar.css";
import animal from "./ASSETS/caribou.png";

// Renamed
function Navigation() {
	const location = useLocation();

	return (
		<>
			<nav>
				<Link to="/">
					<div className="group">
						<img src={animal} alt="Careeribou logo" />
						<h1>
							<span>
								<u>CAREER</u>
							</span>
							IBOU
						</h1>
					</div>
				</Link>
				<ul>
					{location.pathname !== "/" ? (
						<>
							<Link to="/basic">
								<li>BASIC QUESTIONS</li>
							</Link>
							<Link to="/detailed">
								<li>DETAILED QUESTIONS</li>
							</Link>
							<Link to="/about">
								<li>ABOUT US</li>
							</Link>
						</>
					) : (
						<Link to="/about">
							<li>ABOUT US</li>
						</Link>
					)}
				</ul>
			</nav>
		</>
	);
}

export default Navigation;
