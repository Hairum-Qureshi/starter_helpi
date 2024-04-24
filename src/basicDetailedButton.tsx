/*import { Button, Form } from "react-bootstrap";*/
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
           {isHome && !clicked && (<div>
                <Link to="/basic">
                    <button className="basic-button" onClick={handleClick}>Basic Quiz</button>
                </Link>
            </div>)}
            {isHome && !clicked && (<p>
            <p>This is a 10 - 15 minute quiz aimed to gauge</p>
            <p>interests and skills in order to provide suggestions</p>
            <p>and information on potential careers.</p></p>)}

            {isHome && !clicked && (<div>
                <Link to="/detailed">
                    <button className="detailed-button" onClick={handleClick}>Detailed Quiz</button>
                </Link>
            </div>)}
            {isHome && !clicked && (<p>
                <p>This is a 30 - 35 minute quiz aimed to</p>
                <p>understand your goals and passions in</p>
                <p>order to provide potential careers.</p>
            </p>)}

        </div>  
)}
export default BasicDetailedButtons;