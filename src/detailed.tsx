import { useEffect, useState } from "react";
import "../src/detailed.css";
import questions from "./detailedQuestions.json";
import Modal from "./Modal";
import Confetti from "react-confetti";
import Start from "./startbutton";

export interface Answer {
  question: string;
  questionNo: number;
  choice: string;
}

function Detailed() {
  const [choice, setChoice] = useState<string>();
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const saved_index: number =
    Number(localStorage.getItem("current_question")) || 0;
  const last_saved: number = saved_index < 0 ? 0 : saved_index;

  const [currentIndex, setCurrentIndex] = useState<number>(last_saved);
  localStorage.setItem("current_question", currentIndex.toString());

  const savedAnswersString = localStorage.getItem("answered_questions");
  const savedAnswers: Answer[] = savedAnswersString
    ? JSON.parse(savedAnswersString)
    : [];
  const [answeredQuestions, setAnsweredQuestions] =
    useState<Answer[]>(savedAnswers);

  const [userInput, setUserInput] = useState<string>(
    answeredQuestions[currentIndex] && answeredQuestions[currentIndex].choice
  );
  const [modalVisibility, setModalVisibility] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  function updateModalVisibility() {
    setModalVisibility(!modalVisibility);
  }

  function saveAnswers(
    choice: string,
    question_num: number,
    question_type: string,
    question: string
  ) {
    if (question_type === "free_response" && !choice.trim()) {
      setChoice("");
    }

    if (answeredQuestions.length !== 0) {
      const questionNumber: Answer | undefined = answeredQuestions.find(
        (userAnswer: Answer) => {
          return userAnswer.questionNo === question_num;
        }
      );

      if (questionNumber !== undefined) {
        const questionIndex = answeredQuestions.findIndex(
          (userAnswer: Answer) => {
            return userAnswer.questionNo === questionNumber.questionNo;
          }
        );

        if (questionNumber.choice !== choice) {
          const updatedQuestions: Answer[] = [...answeredQuestions];
          updatedQuestions[questionIndex] = {
            ...updatedQuestions[questionIndex],
            choice,
          };
          setAnsweredQuestions(updatedQuestions);
        }
      } else {
        setAnsweredQuestions([
          ...answeredQuestions,
          { questionNo: question_num, choice, question },
        ]);
      }
    } else {
      setAnsweredQuestions([{ questionNo: question_num, choice, question }]);
    }
  }

  useEffect(() => {
    if (answeredQuestions.length !== 0) {
      localStorage.setItem(
        "answered_questions",
        JSON.stringify(answeredQuestions)
      );
    }
  }, [answeredQuestions]);

  return (
    <div>
      {showConfetti && <Confetti />}
      {modalVisibility && <Modal modalFunction={updateModalVisibility} />}
      <div className={`start-container ${quizStarted ? "fade-out" : ""}`}>
        {!quizStarted && (
          <Start
            onStartQuiz={() => {
              setQuizStarted(true);
              setName(localStorage.getItem("quizName") || "");
            }}
          />
        )}
        {quizStarted && (
          <p
            style={{
              fontSize: "30px",
              marginLeft: "10px",
              fontFamily: "Changa, sans-serif",
            }}
          >
            Hi{" "}
            <span
              style={{
                fontSize: "30px",
                marginLeft: "10px",
                fontFamily: "Changa, sans-serif",
                fontWeight: "bold",
              }}
            >
              {name}
            </span>
            , welcome to the detailed quiz.
          </p>
        )}
      </div>
      {quizStarted && (
        <div className="quizContainer">
          <div className="questionContainer">
            <img
              src={questions[currentIndex].image}
              alt="Visual question aid"
            />
            <h3>
              ({questions[currentIndex].question_number}/{questions.length})
              &nbsp;
              {questions[currentIndex].question}
            </h3>
          </div>
          <div className="optionsContainer">
            {questions[currentIndex].type === "multiple_choice"
              ? questions[currentIndex].choices.map(
                  (choice: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => {
                        setChoice(choice);
                        saveAnswers(
                          choice,
                          questions[currentIndex].question_number,
                          questions[currentIndex].type,
                          questions[currentIndex].question
                        );
                      }}
                      style={{
                        backgroundColor: `${
                          answeredQuestions.some(
                            (selectedAnswer) => selectedAnswer.choice === choice
                          )
                            ? "#006BA6"
                            : "#003459"
                        }`,
                        transition: "0.25s ease",
                        border: `${
                          answeredQuestions.some(
                            (selectedAnswer) => selectedAnswer.choice === choice
                          )
                            ? "2px solid cyan"
                            : "none"
                        }`,
                      }}
                    >
                      {choice}
                    </button>
                  )
                )
              : questions[currentIndex].type === "free_response" && (
                  <textarea
                    placeholder="Enter your response..."
                    value={
                      answeredQuestions[currentIndex] &&
                      answeredQuestions[currentIndex].choice
                    }
                    onChange={(e) => {
                      setChoice(e.target.value);
                      setUserInput(e.target.value);
                      saveAnswers(
                        e.target.value,
                        questions[currentIndex].question_number,
                        questions[currentIndex].type,
                        questions[currentIndex].question
                      );
                    }}
                  ></textarea>
                )}
          </div>
          <div className="containerFooter">
            <button
              disabled={currentIndex === 0}
              onClick={() => {
                setCurrentIndex((index) => (index -= 1 % questions.length));
                setChoice(
                  answeredQuestions[currentIndex] &&
                    answeredQuestions[currentIndex - 1]?.choice
                );
              }}
            >
              {currentIndex === 0 ? "END" : "PREV."}
            </button>
            <button
              disabled={currentIndex === questions.length - 1 || !choice}
              onClick={() => {
                if (currentIndex === questions.length - 1) {
                  setModalVisibility(!modalVisibility);
                  setShowConfetti(true);

                  setTimeout(() => {
                    setShowConfetti(false);
                  }, 8000);
                } else {
                  setCurrentIndex((index) => (index += 1 % questions.length));
                  setChoice(
                    answeredQuestions[currentIndex + 1] &&
                      answeredQuestions[currentIndex + 1]?.choice
                  );
                }
              }}
            >
              {currentIndex === questions.length - 1
                ? "SUBMIT RESPONSES"
                : "NEXT"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detailed;
