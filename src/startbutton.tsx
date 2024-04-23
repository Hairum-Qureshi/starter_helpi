import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./start.css";

interface StartProps {
  onStartQuiz: () => void;
}

const Start: React.FC<StartProps> = ({ onStartQuiz }) => {
  const [name, setName] = useState<string>("");
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [nameTyped, setNameTyped] = useState<boolean>(false);
  const [checkmarkClicked, setCheckmarkClicked] = useState<boolean>(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
    localStorage.setItem("quizName", newName);
    if (newName.length > 0) {
      setNameTyped(true);
    } else {
      setNameTyped(false);
    }
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    onStartQuiz(); // Invoke the callback to notify the parent component
  };

  const handleCheckmarkClick = () => {
    setCheckmarkClicked(true);
  };

  return (
    <div className={`start-container ${quizStarted ? "fade-out" : ""}`}>
      <Button
        className={`start-button ${quizStarted ? "hide" : ""}`}
        onClick={handleStartQuiz}
      >
        START QUIZ
      </Button>
      {quizStarted && <p>HI {name}, WELCOME.</p>}
      {quizStarted && !checkmarkClicked && (
        <Form.Group controlId="EditName">
          <Form.Control
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Edit Name"
          />
        </Form.Group>
      )}
      {quizStarted && nameTyped && !checkmarkClicked && (
        <Button className="checkmark" onClick={handleCheckmarkClick}>
          ✓
        </Button>
      )}
    </div>
  );
};

export default Start;
