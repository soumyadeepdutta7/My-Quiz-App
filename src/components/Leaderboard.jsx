import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Leaderboard = () => {
  const [sortedLeaderboard, setSortedLeaderboard] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    // Sort leaderboard entries by score in descending order
    const sorted = leaderboard.sort((a, b) => b.score - a.score);
    setSortedLeaderboard(sorted);
  }, []);

  const handleBack = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full">
        <h2 className="text-3xl font-bold mb-4 text-center">Leaderboard</h2>
        {sortedLeaderboard.length === 0 ? (
          <div className="text-lg text-gray-800">No scores yet!</div>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 px-4 border border-gray-300">Rank</th>
                <th className="py-2 px-4 border border-gray-300">Name</th>
                <th className="py-2 px-4 border border-gray-300">Score</th>
              </tr>
            </thead>
            <tbody>
              {sortedLeaderboard.map((entry, index) => (
                <tr key={index} className="bg-white">
                  <td className="py-2 px-4 border border-gray-300">{index + 1}</td>
                  <td className="py-2 px-4 border border-gray-300">{entry.name}</td>
                  <td className="py-2 px-4 border border-gray-300">{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button
          onClick={handleBack}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4 block mx-auto"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;
