import React,{useState} from 'react'
import './CreateGameM.css'
import { useNavigate } from 'react-router-dom'


const CreateGameM = (props)=>{
    const [player1Name,setPlayerName] = useState("")
    function inputChangeHandler(event){ 
        setPlayerName(event.target.value);  
    }
    const navigate = useNavigate()
    const serverId = Math.random().toString(36).slice(8);
    function btnContinue(){
        if(player1Name){
          navigate("/lobby",{state:{player1Name: player1Name,serverId:serverId}})
        }else{
           props.createGameError(true) 
        }
    }
    return(
     <div className="CreateGameM">
         <div id="lable">Enter your name:</div>
    <input type="text" className="enterCode" onChange={inputChangeHandler.bind(this)}/>
    <div className="actionBtn">
        <div>
   <button className="btn" id="btnCancel" onClick={props.btnCancelGame}>Cancel</button>
   <button className="btn" id ="btnCon" onClick={btnContinue}>Continue</button>
   </div>
    </div>
     </div>
    )
  }
  export default CreateGameM;