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


    return(
        <div className="lobby">
       <div>game code : {serverId}</div>
       <div>copy</div>
       <div>Ones your friend join, Game Automatic start!</div>
       <button >continue</button>
       </div>
    );
}

