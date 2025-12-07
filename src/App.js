/* 
src/App.js
credits: this was taken from the React tic-tac-toe tutorial
and modified by myself
*/

import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import PlayerStats from "./PlayerStats";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  const status = winner
    ? "Winner: " + winner
    : "Next player: " + (xIsNext ? "X" : "O");

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function App() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  const [stats, setStats] = useState({
    gamesPlayed: 0,
    gamesWon: 0,
    gamesLost: 0,
  });

  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const playerSymbol = "X"; // Default player to X
  const computerSymbol = "O";
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    const winner = calculateWinner(nextSquares);
    if (winner) {
      setStats((prevStats) => ({
        ...prevStats,
        gamesPlayed: prevStats.gamesPlayed + 1,
        gamesWon: winner === playerSymbol ? prevStats.gamesWon + 1 : prevStats.gamesWon,
        gamesLost: winner !== playerSymbol ? prevStats.gamesLost + 1 : prevStats.gamesLost,
      }));
    } else if (!nextSquares.includes(null)) {
      // If no winner and no empty squares, it's a draw
      setStats((prevStats) => ({
        ...prevStats,
        gamesPlayed: prevStats.gamesPlayed + 1,
      }));
    } else if (xIsNext === (playerSymbol === "X")) {
      // Computer's turn
      const computerMove = calculateComputerMove(nextSquares);
      if (computerMove !== null) {
        nextSquares[computerMove] = computerSymbol;
        setHistory([...nextHistory, nextSquares]);
        setCurrentMove(nextHistory.length);
      }
    }
  }

  function calculateComputerMove(squares) {
    // Simple AI: pick the first available square
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        return i;
      }
    }
    return null;
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    const description = move > 0 ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <header className="header">
        <h1 className="game-title">Lewis-Tac-Toe</h1>

        <div className="auth-controls">
          {!isAuthenticated ? (
            <button className="btn" onClick={() => loginWithRedirect()}>
              Login
            </button>
          ) : (
            <>
              <p className="welcome">Welcome, {user.name}</p>
              <button
                className="btn logout"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>

      <div className="game-info">
        <ol>{moves}</ol>
      </div>

      {isAuthenticated && <PlayerStats stats={stats} />}
    </div>
  );
}
