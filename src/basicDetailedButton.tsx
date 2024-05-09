import { Link, useLocation } from "react-router-dom";
import "./basicDetailedButton.css"
import {useState, useEffect} from "react";


function BasicDetailedButtons() {
    const [clicked, setClicked] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setClicked(false);
    }, [location.pathname]);

    const handleClick = () => {
        setClicked(true);
    };

    const isHome = location.pathname === "/";

    return (
        <div>
            <div className="button-container">
                {isHome && !clicked && (
                <div>
                    <Link to="/basic">
                        <button className="basic-button" onClick={handleClick}>Basic Quiz</button>
                    </Link>
                </div>
                )}

                {isHome && !clicked && (
                <div>
                    <Link to="/detailed">
                        <button className="detailed-button" onClick={handleClick}>Detailed Quiz</button>
                    </Link>
                </div>
                )}
            </div>

        <div className="par-container">{isHome && !clicked && (
            <p className="par-basic">
                This is a 10 - 15 minute quiz aimed to gauge<br></br>
                interests and skills to provide suggestions<br></br>
                and information on potential careers.
            </p>)}
            {isHome && !clicked && (
            <p className="par-detailed">
            This is a 30 - 35 minute quiz aimed to<br></br>
            understand your goals and passions in<br></br>
            order to provide potential careers.
        </p>)}
        </div>
    </div>
)}
export default BasicDetailedButtons;