import logo from './logo.svg';
import './App.css';
import styles from './App.module.css'
import styled from 'styled-components'
import Square from './components/square'
import { useState } from 'react';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xPlayer, setxPlayer] = useState(true)
  const handlePlay = (index) => {
    const temp = board.slice()
    if (xPlayer) {
      temp[index] = "X"
    } else {
      temp[index] = "O"
    }
    setBoard(temp)
    setxPlayer(!xPlayer)
  }
  const winer = caculateWinner(board)
  if(winer.winner){
    const isWin = winer.location
    const [a, b, c] = isWin;
    // console.log(a);
    checkXem(a, b, c); 

  }
  const handleReset = () => {
    setxPlayer(null)
    setBoard(Array(9).fill(null))
    const nodeList = document.querySelectorAll(".btn");
    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i].style.backgroundColor = "";
    }
  }
  return (
    <>
      {winer.winner ? <H2>{winer.winner} is Winner </H2> : null}
      <Board>
        {board.map((item, index) => <Square handlePlay={() => handlePlay(index)} value={item} />)}
      </Board>
      {winer.winner && <div style={{ textAlign: "center", marginTop: "30px", }}>
        <button onClick={() => {handleReset()}} className={styles.square}>Reset</button>
      </div>}
    </>
  );
}
const H2 = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 30px;
`
const Board = styled.div`
  background-color: light-gray;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  max-width: 256px;
  margin: auto;
`;

const caculateWinner = (board) => {
  const winLine = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < winLine.length; i++) {
    const [a, b, c] = winLine[i]
    if (board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a],
        location: [a, b ,c],
      }
    }
  }
  return null
}
const checkXem = (a, b, c) => {
  const nodeList = document.querySelectorAll(".btn");
  for (let i = 0; i < nodeList.length; i++) {
    if (i == a || i == b || i == c) {
      nodeList[i].style.backgroundColor = "red";
    }
  }
};

export default App;
