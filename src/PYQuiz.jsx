import React, { useState, useCallback } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Menu, Loader2, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { API_KEY } from './key';
const MAX_RETRIES = 100;
const RETRY_DELAY = 1000;

function PQuiz() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [classLevel, setClassLevel] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const genAI = new GoogleGenerativeAI(API_KEY);

  const cleanResponse = (text) => {
    return text.trim();
  };

  const generateQuizPrompt = (classLevel) => `
    Generate a quiz with 10 multiple-choice high difficulty questions for a ${classLevel} student studying Python.
    For each question, provide 4 options (A, B, C, D) with one correct answer. 
    Format:

    1. [Question]
    A) [Option A]
    B) [Option B]
    C) [Option C]
    D) [Option D]
    Correct: [Correct option letter]

    Repeat this format for all 10 questions. Do not use asterisks or *
  `;

  const parseQuizData = (text) => {
    const questions = text.split(/\d+\./).slice(1);
    return questions.map((q) => {
      const [questionText, ...optionsAndAnswer] = q.trim().split("\n");
      const options = optionsAndAnswer.slice(0, 4).map((option) => {
        const [key, value] = option.split(") ");
        return { key: key.trim(), value: value.trim() };
      });
      const correctAnswer = optionsAndAnswer[4].split(": ")[1].trim();
      return { question: questionText.trim(), options, correctAnswer };
    });
  };

  const fetchQuizData = useCallback(async (retryCount = 0) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = generateQuizPrompt(classLevel);

    try {
      setLoading(true);  
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = cleanResponse(response.text());
      console.log(text);

      const parsedData = parseQuizData(text);

      if (parsedData.length !== 10) {
        throw new Error("Invalid quiz data");
      }

      setQuiz(parsedData);
      setError(null);
      setScore(0);
      setQuizFinished(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (retryCount < MAX_RETRIES) {
        setTimeout(() => fetchQuizData(retryCount + 1), RETRY_DELAY);
      } else {
        setError("Failed to generate quiz. Please try again.");
      }
    } finally {
      setLoading(false);  
    }
  }, [classLevel]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setQuiz(null);
    fetchQuizData();
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowAnswer(true);

    if (answer === quiz[currentQuestionIndex].options.find(o => o.key === quiz[currentQuestionIndex].correctAnswer).value) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-teal-900 p-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <h1 className="text-3xl font-bold random">Python Tutor</h1>
        </Link>
      </header>



      <main className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="classLevel" className="block mb-2 text-sm font-medium">
                Class Level
              </label>
              <input
                type="text"
                className="w-full p-2 bg-gray-800 rounded border border-gray-700 focus:ring-2 focus:ring-teal-500"
                id="classLevel"
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
                required
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out mt-6 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Generating Quiz...
                  </>
                ) : (
                  "Generate Quiz"
                )}
              </button>
            </div>
          </div>
        </form>
        {error && (
          <div className="bg-red-600 text-white p-4 rounded-lg mb-4">
            {error}
          </div>
        )}
        {quiz && !quizFinished && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">
              Question {currentQuestionIndex + 1} of {quiz.length}
            </h3>
            <p className="text-lg mb-4">{quiz[currentQuestionIndex].question}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quiz[currentQuestionIndex].options.map((option) => (
                <button
                  key={option.key}
                  className={`p-3 rounded text-left transition-colors ${
                    showAnswer
                      ? option.key === quiz[currentQuestionIndex].correctAnswer
                        ? "bg-green-600"
                        : selectedAnswer === option.value
                        ? "bg-red-600"
                        : "bg-gray-700"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  onClick={() => handleAnswer(option.value)}
                  disabled={showAnswer}
                >
                  {`${option.key}) ${option.value}`}
                </button>
              ))}
            </div>
            {showAnswer && (
              <div className="mt-4">
                <button
                  onClick={nextQuestion}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  {currentQuestionIndex < quiz.length - 1 ? "Next Question" : "Finish Quiz"}
                </button>
              </div>
            )}
          </div>
        )}
        {quizFinished && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
            <p className="text-xl">Your Score: {score} / {quiz.length}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default PQuiz;
