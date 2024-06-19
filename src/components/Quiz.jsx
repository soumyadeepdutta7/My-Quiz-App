import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Quiz = () => {
  const { state } = useLocation();
  const { name, category, difficulty, numQuestions } = state;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`https://opentdb.com/api.php?amount=${numQuestions}&category=${category}&difficulty=${difficulty}`);
        setQuestions(response.data.results);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };
    fetchQuestions();
  }, [category, difficulty, numQuestions]);

  useEffect(() => {
    if (questions.length > 0) {
      setTimer(getTimeForDifficulty(questions[currentQuestionIndex].difficulty));
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            handleNextQuestion();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentQuestionIndex, questions]);

  const getTimeForDifficulty = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 30;
      case 'medium':
        return 20;
      case 'hard':
        return 10;
      default:
        return 30;
    }
  };

  const handleNextQuestion = () => {
    setIsCorrect(null);
    setSelectedAnswer(null);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Save the score to local storage
      const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
      leaderboard.push({ name, score });
      localStorage.setItem('leaderboard', JSON.stringify(leaderboard));

      navigate('/results');
    }
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    setTimeout(handleNextQuestion, 1000); // Move to the next question after 1 second
  };

  if (questions.length === 0) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Question {currentQuestionIndex + 1} of {questions.length}</h2>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="mb-4 text-lg">{questions[currentQuestionIndex].question}</div>
        <div className="flex flex-col space-y-3">
          {questions[currentQuestionIndex].incorrect_answers.concat(questions[currentQuestionIndex].correct_answer)
            .sort()
            .map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(answer)}
                className={`p-3 rounded-lg text-white font-semibold w-full transition duration-300 ease-in-out ${
                  selectedAnswer === answer ? (isCorrect ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600') : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {answer}
              </button>
            ))}
        </div>
        <div className="mt-6 text-gray-700">
          Time left: {timer} seconds
        </div>
      </div>
    </div>
  );
};

export default Quiz;
