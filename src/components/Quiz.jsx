import React, { useState, useEffect } from "react";
import { quizData } from "../assets/data";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    // Shuffle and pick 5 questions If the comparator function returns a negative value, a will be placed before b.
    // If it returns a positive value, a will be placed after b.
    // If it returns 0, the order of a and b remains unchanged.
    const shuffledQuestions = [...quizData].sort(() => 0.5 - Math.random());
    setQuestions(shuffledQuestions.slice(0, 5));
  }, []);

  const handleOptionClick = (index) => {
    if (selectedOption === null) {
      setSelectedOption(index);
      if (index === questions[currentQuestion].correct) {
        setScore(score + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowScore(true);
    }
  };

  const handleRestart = () => {
    setSelectedOption(null);
    setShowScore(false);
    setScore(0);
    setCurrentQuestion(0);
    // Reshuffle and pick 5 questions
    const shuffledQuestions = [...quizData].sort(() => 0.5 - Math.random());
    setQuestions(shuffledQuestions.slice(0, 5));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {showScore ? (
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            You scored {score} out of {questions.length}
          </h1>
          <button
            onClick={handleRestart}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        questions.length > 0 && (
          <div className="w-full max-w-md bg-white rounded shadow p-6">
            <h2 className="text-2xl font-bold mb-4">
              {questions[currentQuestion].question}
            </h2>
            <div className="space-y-2">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleOptionClick(index)}
                  className={`w-full py-2 px-4 border rounded 
                    ${
                      selectedOption !== null
                        ? index === questions[currentQuestion].correct
                          ? "bg-green-500 text-white"
                          : selectedOption === index
                          ? "bg-red-500 text-white"
                          : "bg-gray-100"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  disabled={selectedOption !== null}
                >
                  {option}
                </button>
              ))}
            </div>
            {selectedOption !== null && (
              <div className="mt-4 text-center">
                {selectedOption === questions[currentQuestion].correct ? (
                  <p className="text-green-500">Correct!</p>
                ) : (
                  <p className="text-red-500">
                    Incorrect! The correct answer is:{" "}
                    {
                      questions[currentQuestion].options[
                        questions[currentQuestion].correct
                      ]
                    }
                  </p>
                )}
              </div>
            )}
            <button
              onClick={handleNextQuestion}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              disabled={selectedOption === null}
            >
              {currentQuestion < questions.length - 1
                ? "Next Question"
                : "Finish Quiz"}
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Quiz;
