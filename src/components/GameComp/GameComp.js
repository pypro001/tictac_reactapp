import './GameComp.css'
const gamecomp = (props)=>{
    let classname = "grid-item"
   const Boxes  = props.array.map((citem,ckey)=>{
    return  citem.map((ritem,rkey)=>{
        if(props.greenIt.it1 === `${ckey}-${rkey}` || props.greenIt.it2 === `${ckey}-${rkey}` ||props.greenIt.it3 === `${ckey}-${rkey}`){
            classname = "grid-item green"
        }else{
            classname = "grid-item"
        }
          return (<div id={`${ckey}-${rkey}`} key={`${ckey}-${rkey}`} className={classname} value={`${ckey}-${rkey}`} onClick={props.clicked.bind(this)}>{ritem}</div>)
      })

})

   return(
    <main className="MainGameCont">
        <div id="gameScreen">
            <div className="gameContainer">

                {Boxes}
                 {/* <div id="0-0" className="grid-item" value="0-0" onClick={props.clicked.bind(this)}> </div>
                 <div id="0-1" className="grid-item" value="0-1" onClick={props.clicked.bind(this)}> </div>
                 <div id="0-2" className="grid-item" value="0-2" onClick="boxClick(this)"> </div>
                 <div id="1-0" className="grid-item" value="1-0" onClick="boxClick(this)"> </div>
                 <div id="1-1" className="grid-item" value="1-1" onClick="boxClick(this)"> </div>
                 <div id="1-2" className="grid-item" value="1-2" onClick="boxClick(this)"> </div>
                 <div id="2-0" className="grid-item" value="2-0" onClick="boxClick(this)"> </div>
                 <div id="2-1" className="grid-item" value="2-1" onClick="boxClick(this)"> </div>
                 <div id="2-2" className="grid-item" value="2-2" onClick="boxClick(this)"> </div> */}
            </div>
        </div>
    </main>
   )
 }
 export default gamecomp;