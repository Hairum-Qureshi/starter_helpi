import React, { useState } from "react";
import Start from "./startbutton";
function Basic() {
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const basicQuestions: { question: string; options: string[] }[] = [
    {
      question: "1. What is your ideal environment to live in?",
      options: ["City", "Suburb", "Rural", "Town"],
    },
    {
      question: "2. What personal skill do you most value?",
      options: ["time management", "resourceful", "organization", "leadership"],
    },
    {
      question: "3. What level of your academic career are you at?",
      options: [
        "some high school",
        "high school degree/GED",
        "college",
        "graduate school",
      ],
    },
    {
      question:
        "4. Besides career interests, what other activites interest you?",
      options: ["relaxing", "art", "exercise", "volunteering"],
    },
    {
      question: "5. How many hours would you like to work per week?",
      options: ["20 or less", "20-30", "30-35", "35+"],
    },
    {
      question: "6. What topics or ideas spark your interest?",
      options: [
        "physical sciences",
        "mathematics/engineering",
        "history/social sciences",
        "art",
      ],
    },
    {
      question: "7. Would you like to work in-person, hybrid, or virtual?",
      options: ["in-person", "hybrid", "virtual", "no-preference"],
    },
  ];
  return (
    <div>
      <Start onStartQuiz={() => setQuizStarted(true)} />
      {quizStarted && (
        <div>
          <p>
            Hi {localStorage.getItem("quizName")}, welcome to the detailed quiz.
          </p>
          {basicQuestions.map((question, index) => (
            <div key={index}>
              <h2>{question.question}</h2>
              <QuestionFormatComponent options={question.options} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface QuestionFormatProps {
  options: string[];
}
const QuestionFormatComponent: React.FC<QuestionFormatProps> = ({
  options,
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const optionSelect = (option: string) => {
    setSelected(option);
  };
  return (
    <div>
      <p>Select an option:</p>
      {options.map((option) => (
        <label key={option}>
          <input
            type="radio"
            value={option}
            checked={selected === option}
            onChange={() => optionSelect(option)}
          />
          {option}
        </label>
      ))}
      <p>You selected: {selected}</p>
    </div>
  );
};
export default Basic;
