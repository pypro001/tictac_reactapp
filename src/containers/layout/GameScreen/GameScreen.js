import React, { Component } from 'react';
import './GameScreen.css'
import firebaseApp from '../../../utils/firebaseApp.js'
import { getDatabase, ref, onValue, set, get, child, update } from "firebase/database";

import Auxilary from '../../../hoc/auxilary.js'
import GameHeader from '../../../components/HeaderComp/HeaderComp.js'
import GameFooter from '../../../components/FooterComp/FooterComp.js'
import GameMainCont from '../../../components/GameComp/GameComp.js'
import Modal from '../../../components/UI/Modal/Modal.js'
import GameOverComp from '../../../components/GameOverComp/GameOverComp.js'
//import {firebaseInit,gameData} from './firebaseBackend.js'

class GameScreen extends Component {
    constructor(props) {
        super(props)
         this.serverId = localStorage.getItem('serverId'); 
         this.iam = localStorage.getItem('iam');
    }

    Player1 = {
        name: "__Player1",
        roll: "X"
    }
    Player2 = {
        name: "__Player2",
        roll: "0"
    }
  
    state = {
        currentPlayer: this.Player1,
        arr: [["", "", ""],
        ["", "", ""],
        ["", "", ""]],
        P1_score: 0,
        P2_score: 0,
        COUNT: 0,
        greenIt: {
            it1: "",
            it2: "",
            it3: ""
        },
        gameOver: true,
        dataFatched: false
    }
    
    componentDidMount()  {
        const db = getDatabase();
        const serverRef = ref(db, `${this.serverId}/`);
        onValue(serverRef, (snapshot) => {
            const data = snapshot.val();
           this.updateSate(data)
            console.log("setting data");
        });
    }
    updateSate = (data)=>{
        this.setState({currentPlayer: data.currentPlayer}) //current Player
        this.setState({arr:data.arr}) //arr
        this.setState({P1_score: data.P1_score}) //P1_score
        this.setState({P2_score: data.P2_score}) //p2 score
        this.setState({COUNT: data.COUNT}) //count
        this.setState({greenIt: data.greenIt}) //greenIT
        this.setState({gameOver: data.gameOver}) //gameOver
    }
    gameInit = () => {
        if (!this.state.dataFatched) {
            const dbRef = ref(getDatabase());
            get(child(dbRef, `${this.serverId}/`)).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    if (this.Player1.name === "__Player1" && this.Player2.name === "__Player2") {
                        this.Player1.name = data.player1;
                        this.Player2.name = data.player2;
                    }
                    this.setState({ dataFatched: true });
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        }

    }

    changePlayerHandler = () => {
        if (this.state.currentPlayer.name === this.Player1.name) {
            this.updateToFirebase("currentPlayer",this.Player2)
            this.setState({ currentPlayer: this.Player2 })
        } else {
            this.updateToFirebase("currentPlayer",this.Player1)
            this.setState({ currentPlayer: this.Player1 })
        }
    }
    updateToFirebase = (what, data) => {
        const db = getDatabase();
        update(ref(db, `${this.serverId}/`), { [what]: data });
    }
    boxClick = (event) => {
        
        let px, py = 0;
        const currentState = { ...this.state }
        if(this.iam === currentState.currentPlayer.name){
        const position = event.target.id;
        const gameCount = currentState.COUNT;
        this.setState({ COUNT: gameCount + 1 })
        this.updateToFirebase("COUNT",gameCount + 1)
        const myarr = [...this.state.arr];
        [px, py] = position.split("-");
        if (myarr[px][py].length === 0) {
            myarr[px][py] = this.state.currentPlayer.roll;
            this.changePlayerHandler();
            this.updateToFirebase("arr", myarr)
            this.gameManager(myarr, currentState);
            if (currentState.COUNT === 8) {
                this.gameOver("Match drow !", "", "", "", currentState);
            }
        } else {
            console.log("already filled !")
        }
        this.setState({ arr: myarr });
    }else{
        console.log("other player turn !")
    }
    }

    gameManager = (arr, currentState) => {
        const cState = currentState;
        arr.forEach((col, cindex) => {
            col.forEach((row, rindex) => {
                //check for row
                if (row) {
                    if (rindex === 0) {
                        if ((row === arr[cindex][rindex + 1]) && (row === arr[cindex][rindex + 2])) {
                            let item1 = `${cindex}-${rindex}`
                            let item2 = `${cindex}-${rindex + 1}`
                            let item3 = `${cindex}-${rindex + 2}`;
                            return this.gameOver(row, item1, item2, item3, cState);
                        }
                    }
                    if (cindex === 0) {
                        if ((row === arr[cindex][rindex]) && (row === arr[1][rindex]) && (row === arr[2][rindex])) {
                            let item1 = `${cindex}-${rindex}`
                            let item2 = `1-${rindex}`
                            let item3 = `2-${rindex}`;
                            return this.gameOver(row, item1, item2, item3, cState);
                        }
                    }
                    //cross start
                    if (cindex === 0 && rindex === 0) {
                        if ((row === arr[1][rindex + 1]) && (row === arr[2][rindex + 2])) {
                            let item1 = `0-0`
                            let item2 = `1-${rindex + 1}`
                            let item3 = `2-${rindex + 2}`
                            return this.gameOver(row, item1, item2, item3, cState);

                        }
                    }
                    //cross end
                    if (cindex === 0 && rindex === 2) {
                        if ((row === arr[1][rindex - 1]) && (row === arr[2][rindex - 2])) {
                            let item1 = `0-2`
                            let item2 = `1-${rindex - 1}`
                            let item3 = `2-${rindex - 2}`
                            return this.gameOver(row, item1, item2, item3, cState);
                        }
                    }
                } else {
                    return false
                }
            })
        })

    }
    gameOver = (msg, item1, item2, item3, currentState) => {
        this.updateToFirebase("greenIt",{ it1: item1, it2: item2, it3: item3 })
        this.setState({ greenIt: { it1: item1, it2: item2, it3: item3 } });
        if (msg === "X") {
            let updatedScore = currentState.P1_score + 1;
            this.updateToFirebase("P1_score",updatedScore)
            this.setState({ P1_score: updatedScore })
        } else if (msg === "0") {
            let updatedScore = currentState.P2_score + 1;
            this.updateToFirebase("P2_score",updatedScore)
            this.setState({ P2_score: updatedScore })
        }
        this.updateToFirebase("gameOver",true)
        this.setState({ gameOver: true })
        console.log("player win", msg)
    }

    playAgain = () => {
        const arr = [["", "", ""], ["", "", ""], ["", "", ""]];
        const greenIt ={ it1: "", it2: "", it3: "" };
       
        this.updateToFirebase("arr", arr)
        this.updateToFirebase("greenIt", greenIt)
        this.updateToFirebase("COUNT", 0)
        this.updateToFirebase("gameOver", false)

        this.setState({ arr: arr });
        this.setState({ greenIt: greenIt });
        this.setState({ COUNT: 0 });
        this.setState({ gameOver: false });
    }

    render() {
        this.gameInit();
        return (
            <Auxilary>
                <div className="game-screen">
                    <Modal backdropShow={this.state.gameOver} >
                        <GameOverComp playAgain={this.playAgain} />
                    </Modal>
                    <GameHeader playerInfo={this.state.currentPlayer} />
                    <GameMainCont array={this.state.arr} clicked={(event) => { this.boxClick(event) }} greenIt={this.state.greenIt} />
                    <GameFooter player1={this.Player1} player2={this.Player2} p1score={this.state.P1_score} p2score={this.state.P2_score} />
                </div>
            </Auxilary>
        )
    }

}
export default GameScreen;