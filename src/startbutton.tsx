import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./start.css";

export function Start(): JSX.Element {
  const [name, setName] = useState<string>("");
  const [quizStarted, setQuizStarted] = useState<boolean>(false);

  function editing(event: React.ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  function handleStartQuiz() {
    setQuizStarted(true);
  }

  function handleSave() {
    //
  }

  return (
    <div>
      {!quizStarted && (
        <Button className="start-button" onClick={handleStartQuiz}>
          Start Quiz
        </Button>
      )}
      {quizStarted && <p>Hi {name}, you have started the quiz.</p>}
      {quizStarted && (
        <Button className="save-button" onClick={handleSave}>
          Save
        </Button>
      )}
      {quizStarted && (
        <Form.Group controlId="EditName">
          <Form.Control
            type="text"
            value={name}
            onChange={editing}
            placeholder="Edit Name"
          />
        </Form.Group>
      )}
    </div>
  );
}
export default Start;
