import React from 'react';
import { useNavigate } from 'react-router-dom'
import './GameOverComp.css'

const GameOverComp = (props)=>{
  let data = props.gameOverData;
  let msg = "somthing went wrong";
  if(data){
   if(data.winner){
     if(data.winner === data.iam){
       msg = "✨🎉You have WON 🔥😏"
     }else if(data.winner === "drow"){
       msg = "😮 Match drow, Play Again 🔥😉"
     }else{
      msg = `✨🎉${data.winner} WON 😁😎`
     }
   }
  }
  const navigate = useNavigate()
 
   return(
    <div className="GameOverComp">
    <div className="msg">{msg}</div>
    <h2 className="total-score">Total Score:</h2>
      <div className="playerScore">
          <h3>{data.player1.name}: &nbsp;🔹{data.player1.score}🔷 </h3>
          <h3>{data.player2.name}: &nbsp;🔸{data.player2.score}🔶 </h3>
      </div>
      <div className="gameOverBtns">
          <button className="play-again" onClick={props.playAgain}>Play Again</button>
          <button className="exit-game"  onClick={()=>navigate('/')}>Exit Game</button>
      </div>
    </div>
   )
 }
 export default GameOverComp;