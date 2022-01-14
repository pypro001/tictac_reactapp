import './GameOverComp.css'
const gameOverComp = (props)=>{
   return(
    <div className="GameOverComp">
    <div>__PlayerName-- Win!!</div>
    <h2>Total Score:</h2>
      <div className="playerScore">
          <h3>__PlayerName__: 0 </h3>
          <h3>__PlayerName__: 1 </h3>
      </div>
      <div className="greetMsg"> Well done __PlayerName__ :0</div>
      <div className="gameOverBtns">
          <button onClick={props.playAgain}>Play Again</button>
          <button>Exit Game</button>
      </div>
    </div>
   )
 }
 export default gameOverComp;