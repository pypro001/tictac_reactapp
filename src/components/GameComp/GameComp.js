import './GameComp.css'
const gamecomp = (props)=>{
   return(
    <main className="MainGameCont">
        <div id="gameScreen">
            <div class="gameContainer">
                 <div id="0-0" class="grid-item" value="0-0" onClick={props.clicked.bind(this)}> </div>
                 <div id="0-1" class="grid-item" value="0-1" onClick={props.clicked.bind(this)}> </div>
                 <div id="0-2" class="grid-item" value="0-2" onClick="boxClick(this)"> </div>
                 <div id="1-0" class="grid-item" value="1-0" onClick="boxClick(this)"> </div>
                 <div id="1-1" class="grid-item" value="1-1" onClick="boxClick(this)"> </div>
                 <div id="1-2" class="grid-item" value="1-2" onClick="boxClick(this)"> </div>
                 <div id="2-0" class="grid-item" value="2-0" onClick="boxClick(this)"> </div>
                 <div id="2-1" class="grid-item" value="2-1" onClick="boxClick(this)"> </div>
                 <div id="2-2" class="grid-item" value="2-2" onClick="boxClick(this)"> </div>
            </div>
        </div>
    </main>
   )
 }
 export default gamecomp;