import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import firebaseApp from '../../../utils/firebaseApp.js'
import { getDatabase, ref, onValue, set} from "firebase/database";


export default function Lobby ( props){
    let location = useLocation();
    let navigate = useNavigate();
    let player1Name = location.state.player1Name;
    let serverId =location.state.serverId;
    console.log(serverId)
    if(player1Name && serverId){      
       createGame();
    }
    const db = getDatabase(firebaseApp);
    const gameStart = ref(db, `${serverId}/gameStart`);
     onValue(gameStart, (snapshot) => {
    const data = snapshot.val();
    if(data){
        navigate("/game-screen")
    }
  });

    function writeUserData(serverId, player1) {
        const db = getDatabase();
        set(ref(db, `${serverId}/`), {
            gameStart:false,
            player1: player1,
            player2: "",
            arr: [["","",""],["","",""],["","",""]]
        });
      }

    function createGame(){ 
        let player1 = player1Name;
        writeUserData(serverId, player1);
        }


    return(
        <div>
       <div>game code : {serverId}</div>
       <div>copy</div>
       <div>Ones your friend join, Game Automatic start!</div>
       <button >continue</button>
       </div>
    );
}

