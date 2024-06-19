import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuizSetup = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [numQuestions, setNumQuestions] = useState(10);
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    if (name && category && difficulty && numQuestions) {
      navigate('/quiz', {
        state: { name, category, difficulty, numQuestions }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">My Quiz</h1>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-4 px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-purple-500 text-gray-800 placeholder-gray-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mb-4 px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-purple-500 text-gray-800"
        >
          <option value="">Select Category</option>
          <option value="9">General Knowledge</option>
          <option value="21">Sports</option>
          <option value="22">Geography</option>
        </select>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="mb-4 px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-purple-500 text-gray-800"
        >
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <input
          type="number"
          placeholder="Choose number of Questions"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          className="mb-6 px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:border-purple-500 text-gray-800"
        />
        <button
          onClick={handleStartQuiz}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold w-full transition duration-300 ease-in-out"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizSetup;
