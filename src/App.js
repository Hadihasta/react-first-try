import * as React from "react";
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXisNext] = useState(true);

  function restart() {
    Array(9).fill(null);
  }

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquare = squares.slice();
    if (xIsNext) {
      nextSquare[i] = "X";
    } else {
      nextSquare[i] = "O";
    }

    setSquares(nextSquare);
    setXisNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status = "";
  if (winner) {
    status = "Winner " + winner;
  } else {
    status = "Next Player is " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board ">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <div>
        <button onClick={restart}>restart</button>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    // kondisi  horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //kondisi vertikal
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //kondisi diagonal
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];

    if (squares[a] && squares[a] === squares[b] && squares[c]) {
      // jika square a ada isinya dan square a = square b dan sama dengan c
      return squares[a]; // munculkan isi square a
    }
  }
  return false;
}
