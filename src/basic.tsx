import React, { useState } from "react";
import Start from "./startbutton";

function Basic() {
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

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
        "4. Besides career interests, what other activities interest you?",
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

  return (
    <div>
      <div className={`start-container ${quizStarted ? "fade-out" : ""}`}>
        {!quizStarted && (
          <Start
            onStartQuiz={() => {
              setQuizStarted(true);
              setName(localStorage.getItem("quizName") || "");
            }}
          />
        )}
        {quizStarted && <p>Hi {name}, welcome to the detailed quiz.</p>}
      </div>
      {quizStarted && (
        <div>
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

export default Basic;
