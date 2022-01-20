import React,{useState} from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import { getDatabase, ref, onValue, set} from "firebase/database";
import {WhatsappShareButton,WhatsappIcon} from "react-share";

import loading_icon from '../../../assets/images/loading_icon.gif'
import firebaseApp from '../../../utils/firebaseApp.js'
import BottomAlert from '../../../components/UI/BottomAlert/BottomAlert.js';
import './Lobby.css'

export default function Lobby ( props){
    const [getAlert,setAlert] = useState("")

    let ulocation = useLocation();
    let navigate = useNavigate();
    let player1Name = ulocation.state.player1Name;
    let serverId =ulocation.state.serverId;
    const myloc = window.location.host;
    console.log(serverId)
    if(player1Name && serverId){      
       createGame();
    }
    //whatsapp__share
    const msgTitle = `Game Code: ${serverId} \n Your friend ${player1Name} Inviting you to play a game :) join now !`;
    const msgUrl = `https://${myloc}/`;

    const db = getDatabase(firebaseApp);
    const gameStart = ref(db, `${serverId}/gameStart`);
     onValue(gameStart, (snapshot) => {
    const data = snapshot.val();
    if(data){
        localStorage.setItem("serverId", serverId);
        localStorage.setItem("iam",player1Name);
        navigate("/game-screen")
    }
  });

    function writeUserData(serverId, player1) {
        const db = getDatabase();
        set(ref(db, `${serverId}/`), {
            gameStart:false,
            player1: player1,
            player2: "",
            arr: [["","",""],["","",""],["","",""]],
            currentPlayer: { name: player1,roll: "X"},
            P1_score: 0,
            P2_score: 0,
            COUNT: 0,
            greenIt: {
                it1: "",
                it2: "",
                it3: ""
            },
            gameOver: false,
            
        });
      }

    function createGame(){ 
        let player1 = player1Name;
        writeUserData(serverId, player1);
        }

        function btnCopy(){
            navigator.clipboard.writeText(serverId);
            setAlert("You have copied code!")
        }

        if(getAlert){
            setTimeout(()=>{
                setAlert("")
            },2000)
        }
    return(
        <div className="lobby">
            <div className="lobby-container">
                <img src={loading_icon} alt="Waiting...!"/>
            <div className="game-code">
                <div className="txt-gameCode">Game Code : </div>
                <input type="text" className="inputCode" value= {serverId} readOnly/>
                <button className="copy-btn" onClick={btnCopy}>COPY</button>
            </div>
            <div className="share-btn" >   
            <WhatsappShareButton
            url={msgUrl}
            title={msgTitle}
            separator="--> "
            className="whatsapp__share-button"
            >Share 📲 
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          </div>
       <div className="wait-msg">Ones your friend join, Game will start Automatically !</div>
       <BottomAlert msg={getAlert}/>
       </div>
       </div>
    );
}

