import React, { Component } from 'react';
import './GameScreen.css'
import { getDatabase, ref, onValue, set,update} from "firebase/database";

import Auxilary from '../../../hoc/auxilary.js'
import GameHeader from '../../../components/HeaderComp/HeaderComp.js'
import GameFooter from '../../../components/FooterComp/FooterComp.js'
import GameMainCont from '../../../components/GameComp/GameComp.js'
import Modal from '../../../components/UI/Modal/Modal.js'
import GameOverComp from '../../../components/GameOverComp/GameOverComp.js'

class GameScreen extends Component {
    constructor(props) {
        super(props);
        this.db = getDatabase();
        this.starCountRef = ref(this.db, 'f33bfc53/arr');
         onValue(this.starCountRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data)
      });
      console.log(props)
    }
    Player1 = {
        name: "Player_1",
        roll: "X"   
    }
    Player2 = {
        name: "Player_2",
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
        greenIt:{
            it1:"",
            it2:"", 
            it3:""
        },
        gameOver: false
    }
    
   
    changePlayerHandler = () => {
        if (this.state.currentPlayer.name === this.Player1.name) {
            this.setState({ currentPlayer: this.Player2 })
        } else {
            this.setState({ currentPlayer: this.Player1 })
        }
    }
    boxClick = (event) => {
        let px,py = 0;
        const position = event.target.id;
        const currentState = {...this.state}
        const gameCount = currentState.COUNT;
        this.setState({COUNT: gameCount+1})
        const myarr = [...this.state.arr];
        [px, py] = position.split("-");
        if (myarr[px][py].length === 0) {
            myarr[px][py] = this.state.currentPlayer.roll;
            this.changePlayerHandler();
            this.gameManager(myarr,currentState);
            if (currentState.COUNT === 8) {
                this.gameOver("Match drow !",null,null,null,currentState);
            }
        } else {
            console.log("already filled !")
        }
        this.setState({ arr: myarr});
    }

    gameManager = (arr,currentState) => {
        const cState = currentState;
        arr.forEach((col,cindex)=>{
            col.forEach((row,rindex)=>{
                //check for row
                if(row){
                if(rindex===0){
                    if((row === arr[cindex][rindex+1])&&(row === arr[cindex][rindex+2])){
                       let item1 = `${cindex}-${rindex}`
                       let item2 = `${cindex}-${rindex+1}`
                       let item3 = `${cindex}-${rindex+2}`;
                      return this.gameOver(row,item1,item2,item3,cState);            
                    }
                }
                if(cindex===0){
                    if((row === arr[cindex][rindex])&&(row === arr[1][rindex])&&(row === arr[2][rindex])){
                       let item1 = `${cindex}-${rindex}`
                       let item2 = `1-${rindex}`
                       let item3 = `2-${rindex}`;
                        return this.gameOver(row,item1,item2,item3,cState );              
                    }
                }
                //cross start
                if(cindex===0 && rindex === 0){
                    if((row === arr[1][rindex+1])&&(row === arr[2][rindex+2])){
                        let item1 = `0-0`
                        let item2 = `1-${rindex+1}`
                        let item3 = `2-${rindex+2}`
                       return this.gameOver(row,item1,item2,item3,cState );
                        
                    }
                }
                //cross end
                    if(cindex===0 && rindex === 2){
                    if((row === arr[1][rindex-1])&&(row === arr[2][rindex-2])){
                        let item1 = `0-2`
                        let item2 = `1-${rindex-1}`
                        let item3 = `2-${rindex-2}`
                       return this.gameOver(row,item1,item2,item3,cState );
                    }       
                }              
            }else{
                return false
            }
            })
        })  
    
    }
    gameOver = (msg,item1,item2,item3,currentState) =>{
        this.setState({greenIt:{it1:item1,it2:item2,it3:item3}});
        if(msg === "X"){
            let updatedScore = currentState.P1_score + 1;
            this.setState({P1_score:updatedScore})         
        }else if(msg ==="0"){
            let updatedScore = currentState.P2_score + 1;
            this.setState({P2_score:updatedScore})
        }
        this.setState({gameOver:true})
        console.log("player win",msg)
    }
    
    playAgain = ()=>{
        this.setState({arr:[["", "", ""],["", "", ""],["", "", ""]]});
        this.setState({greenIt:{it1:"",it2:"",it3:""}});
        this.setState({COUNT:0});
        this.setState({gameOver:false});
    }

    render() {
        return (
            <Auxilary>
                  
            <div className="game-screen"> 
            <Modal backdropShow ={this.state.gameOver} >
                     <GameOverComp playAgain = {this.playAgain}/>
                  </Modal> 
                <GameHeader playerInfo={this.state.currentPlayer}/>
                <GameMainCont array={this.state.arr} clicked={(event) => { this.boxClick(event)}} greenIt={this.state.greenIt}/>
                <GameFooter player1 = {this.Player1} player2 = {this.Player2} p1score = {this.state.P1_score} p2score = {this.state.P2_score}/>
            </div>
            </Auxilary>
        )
    }

}
export default GameScreen;