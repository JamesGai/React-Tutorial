import Square from "./Square";
import { useState } from "react";
import "./App.css";

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isNextX, setIsNextX] = useState(true);
  let status = "";

  const calculateWinner = (squares) => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        // game ends, winner is returned
        return squares[a];
      }
    }
    // continue playing
    return null;
  };

  const winner = calculateWinner(squares);

  const handleClick = (i) => {
    if (squares[i] || winner) {
      // nothing happens if a winner exists or the same square is clicked
      return;
    }
    const newSquares = squares.slice();
    if (isNextX) {
      newSquares[i] = "X";
    } else {
      newSquares[i] = "O";
    }
    setSquares(newSquares);
    setIsNextX(!isNextX);
  };

  const handleReset = () => {
    const newSquares = Array(9).fill(null);
    setSquares(newSquares);
    setIsNextX(true);
  };

  // Setting title
  if (winner) {
    status = "The winner is " + winner;
  } else {
    status = "Next player: " + (isNextX ? "X" : "O");
  }

  return (
    <div>
      <h2>{status}</h2>
      <div className="Board-row">
        <Square value={squares[0]} handleClick={() => handleClick(0)} />
        <Square value={squares[1]} handleClick={() => handleClick(1)} />
        <Square value={squares[2]} handleClick={() => handleClick(2)} />
      </div>
      <div className="Board-row">
        <Square value={squares[3]} handleClick={() => handleClick(3)} />
        <Square value={squares[4]} handleClick={() => handleClick(4)} />
        <Square value={squares[5]} handleClick={() => handleClick(5)} />
      </div>
      <div className="Board-row">
        <Square value={squares[6]} handleClick={() => handleClick(6)} />
        <Square value={squares[7]} handleClick={() => handleClick(7)} />
        <Square value={squares[8]} handleClick={() => handleClick(8)} />
      </div>
      <button className="Button-reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default App;
