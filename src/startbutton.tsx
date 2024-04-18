import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./start.css";

interface StartProps {
  onStartQuiz: () => void;
}
export function Start({ onStartQuiz }: StartProps): JSX.Element {
  const [name, setName] = useState<string>("");
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [nameTyped, setNameTyped] = useState<boolean>(false); // State to manage if name has been typed
  const [checkmarkClicked, setCheckmarkClicked] = useState<boolean>(false); // State to manage if checkmark is clicked

  function editing(event: React.ChangeEvent<HTMLInputElement>) {
    const newName = event.target.value;
    setName(newName);
    localStorage.setItem("quizName", newName);
    if (newName.length > 0) {
      setNameTyped(true); // Set nameTyped to true if the name length is greater than zero
    } else {
      setNameTyped(false); // Set nameTyped to false if the name length is zero
    }
  }

  function handleStartQuiz() {
    setQuizStarted(true);
  }

  function handleCheckmarkClick() {
    setCheckmarkClicked(true); // Set checkmarkClicked to true when checkmark is clicked
  }

  return (
    <div>
      {!quizStarted && (
        <Button className="start-button" onClick={handleStartQuiz}>
          START QUIZ
        </Button>
      )}
      {quizStarted && <p>HI {name}, WELCOME.</p>}
      {quizStarted &&
        !checkmarkClicked && ( // Render the text box only if the checkmark is not clicked
          <Form.Group controlId="EditName">
            <Form.Control
              type="text"
              value={name}
              onChange={editing}
              placeholder="Edit Name"
            />
          </Form.Group>
        )}
      {quizStarted &&
        nameTyped &&
        !checkmarkClicked && ( // Render the checkmark button only if nameTyped is true and checkmark is not clicked
          <Button className="checkmark" onClick={handleCheckmarkClick}>
            ✓
          </Button>
        )}
    </div>
  );
}
export default Start;
