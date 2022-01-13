import './HeaderComp.css'
const header = (props)=>{
   return(
    <header className="GameHeader">
    <div id="currentPlayer">
        <h2 id="txtTurn">Player Turn:</h2>
       <h2 id="turnText"> Player 1(x)</h2>
    </div>
    </header>
   )
 }
 export default header;