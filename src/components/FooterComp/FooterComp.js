import './FooterComp.css'
const footer = (props)=>{
   return(
    <footer className="GameFooter">
    <h2>Player1</h2>
    <div id="p1Score" className="score">(0)</div>
    <div className="vs">-~vs~-</div>
    <h2>player2</h2>
    <div id="p2Score" className="score">(0)</div>
</footer>
   )
 }
 export default footer;