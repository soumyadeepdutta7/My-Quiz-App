import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuizSetup from './components/QuizSetup';
import Quiz from './components/Quiz';
import Leaderboard from './components/Leaderboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizSetup />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
};

export default App;
