import { Link, useLocation } from "react-router-dom";
import "./CSS/navbar.css";
import animal from "./ASSETS/caribou.png";

// Renamed
function Navigation() {
	const location = useLocation();
	const name: string | null = localStorage.getItem("name");

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
					{(location.pathname !== "/" && name) ||
					((location.pathname === "/detailed" ||
						location.pathname === "/basic") &&
						name) ? (
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
