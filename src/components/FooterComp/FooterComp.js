import './FooterComp.css'
const footer = (props)=>{
   return(
    <footer className="GameFooter">
    <h2>{props.player1.name}</h2>
    <div id="p1Score" className="score">({props.p1score})</div>
    <div className="vs">-~vs~-</div>
    <h2>{props.player2.name}</h2>
    <div id="p2Score" className="score">({props.p2score})</div>
</footer>
   )
 }
 export default footer;