import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./start.css";

interface StartProps {
  onStartQuiz: () => void;
}

const Start: React.FC<StartProps> = ({ onStartQuiz }) => {
  const [name, setName] = useState<string>("");
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [showNameInput, setShowNameInput] = useState<boolean>(false);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
    localStorage.setItem("quizName", newName);
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setShowNameInput(true);
    onStartQuiz();
  };

  const handleCheckmarkClick = () => {
    setShowNameInput(false);
  };

  return (
    <div className={`start-container ${quizStarted ? "fade-out" : ""}`}>
      <Button
        className={`start-button ${quizStarted ? "hide" : ""}`}
        onClick={handleStartQuiz}
      >
        START QUIZ
      </Button>
      {quizStarted && showNameInput && (
        <Form.Group controlId="EditName">
          <Form.Control
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter Your Name"
          />
          <Button className="checkmark" onClick={handleCheckmarkClick}>
            ✓
          </Button>
        </Form.Group>
      )}
      {quizStarted && !showNameInput && (
        <div>
          <p>Hi {name}, welcome to the detailed quiz.</p>
          {/* Render other quiz components here */}
        </div>
      )}
    </div>
  );
};

export default Start;
