import React,{useEffect} from 'react';
import './GameOverComp.css'
const GameOverComp = (props)=>{
  let msg,p1name,p2name,score,score2 = "somthing went wrong"
  useEffect(()=>{
    console.log(props.gameOverData)
  })
  if(props.gameOverData){
    ( {msg,p1name,p2name,score,score2} = {...props.gameOverData});
  }
 
   return(
    <div className="GameOverComp">
    <div>{msg}</div>
    <h2>Total Score:</h2>
      <div className="playerScore">
          <h3>{p1name}: {score} </h3>
          <h3>{p2name}: {score2} </h3>
      </div>
      <div className="gameOverBtns">
          <button onClick={props.playAgain}>Play Again</button>
          <button>Exit Game</button>
      </div>
    </div>
   )
 }
 export default GameOverComp;