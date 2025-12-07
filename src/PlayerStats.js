import React from "react";

function PlayerStats({ stats }) {
  return (
    <div className="player-stats">
      <h2>Your Stats</h2>
      <ul>
        <li>Games Played: {stats.gamesPlayed}</li>
        <li>Games Won: {stats.gamesWon}</li>
        <li>Games Lost: {stats.gamesLost}</li>
      </ul>
    </div>
  );
}

export default PlayerStats;