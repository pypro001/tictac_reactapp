import './HeaderComp.css'
const header = (props)=>{
   return(
    <header className="GameHeader">
    <div id="currentPlayer">
        <h2 id="txtTurn">Player Turn:</h2>
       <h2 id="turnText"> {`${props.playerInfo.name}(${props.playerInfo.roll})`}</h2>
    </div>
    </header>
   )
 }
 export default header;