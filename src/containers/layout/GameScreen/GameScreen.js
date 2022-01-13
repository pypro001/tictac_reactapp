import React, { Component } from 'react';
import './GameScreen.css'

import Auxilary from '../../../hoc/auxilary.js'
import GameHeader from '../../../components/HeaderComp/HeaderComp.js'
import GameFooter from '../../../components/FooterComp/FooterComp.js'
import GameMainCont from '../../../components/GameComp/GameComp.js'
import Backdrop from '../../../components/UI/Backdrop/Backdrop.js'

class GameScreen extends Component {
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
        }
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
        const myarr = [...this.state.arr];
        [px, py] = position.split("-");
        if (myarr[px][py].length === 0) {
            myarr[px][py] = this.state.currentPlayer.roll;
            this.changePlayerHandler();
            this.gameManager(myarr);
            if (this.state.COUNT === 9) {
                this.gameOver("Match drow !")
            }
        } else {
            console.log("already filled !")
        }
        this.setState({ arr: myarr});
    }

    gameManager = (arr) =>{
        arr.forEach((col,cindex)=>{
            col.forEach((row,rindex)=>{
                //check for row
                if(row){
                if(rindex===0){
                    if((row === arr[cindex][rindex+1])&&(row === arr[cindex][rindex+2])){
                       let item1 = `${cindex}-${rindex}`
                       let item2 = `${cindex}-${rindex+1}`
                       let item3 = `${cindex}-${rindex+2}`;
                      return this.gameOver(row,item1,item2,item3);            
                    }
                }
                if(cindex===0){
                    if((row === arr[cindex][rindex])&&(row === arr[1][rindex])&&(row === arr[2][rindex])){
                       let item1 = `${cindex}-${rindex}`
                       let item2 = `1-${rindex}`
                       let item3 = `2-${rindex}`;
                        return this.gameOver(row,item1,item2,item3);              
                    }
                }
                //cross start
                if(cindex===0 && rindex === 0){
                    if((row === arr[1][rindex+1])&&(row === arr[2][rindex+2])){
                        let item1 = `0-0`
                        let item2 = `1-${rindex+1}`
                        let item3 = `2-${rindex+2}`
                       return this.gameOver(row,item1,item2,item3);
                        
                    }
                }
                //cross end
                    if(cindex===0 && rindex === 2){
                    if((row === arr[1][rindex-1])&&(row === arr[2][rindex-2])){
                        let item1 = `0-2`
                        let item2 = `1-${rindex-1}`
                        let item3 = `2-${rindex-2}`
                       return this.gameOver(row,item1,item2,item3);
                    }       
                }              
            }else{
                return false
            }
            })
        })  
    
    }
    gameOver = (msg,item1,item2,item3) =>{
        this.setState({greenIt:{it1:item1,it2:item2,it3:item3}});
        console.log("player win",msg)
    }

    render() {
        return (
            <Auxilary>
                  <Backdrop backdropShow ={true} />
            <div className="game-screen">  
                <GameHeader playerInfo={this.state.currentPlayer}/>
                <GameMainCont array={this.state.arr} clicked={(event) => { this.boxClick(event)}} greenIt={this.state.greenIt}/>
                <GameFooter />
            </div>
            </Auxilary>
        )
    }

}
export default GameScreen;