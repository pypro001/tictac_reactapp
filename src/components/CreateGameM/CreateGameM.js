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
    return(
     <div className="CreateGameM">
         <div>enter your name</div>
    <input type="text" className="enterCode" onChange={inputChangeHandler.bind(this)}/>
    <div className="actionBtn">
   <button className="cancel" onClick={props.btnCancelGame}>cancel</button>
   <button className="continue" onClick={()=>navigate("/lobby",{state:{player1Name: player1Name,serverId:serverId}})}>continue</button>

    </div>
     </div>
    )
  }
  export default CreateGameM;