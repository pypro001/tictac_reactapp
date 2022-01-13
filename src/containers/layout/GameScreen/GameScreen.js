import React,{Component} from 'react';
import './GameScreen.css'

import GameHeader from '../../../components/HeaderComp/HeaderComp.js'
import GameFooter from '../../../components/FooterComp/FooterComp.js'
import GameMainCont from '../../../components/GameComp/GameComp.js'

class GameScreen extends Component {
    Player1 = {
        name:"Player_1",
        roll:"X"
    }
    Player2 = {
        name:"Player_2",
        roll:"0"
    }
    
    state={
      currentPlayer:this.Player1,
        arr :[["", "", ""],
               ["", "", ""], 
               ["", "", ""]],
        P1_score:0,
        P2_score:0,
    }

    changePlayerHandler = ()=>{
        if(this.state.currentPlayer.name === this.Player1.name){
            this.setState({currentPlayer:this.Player2})
        }else{
            this.setState({currentPlayer:this.Player1})
        }
    }
    boxClick = (event) => {
        console.log("hii",event)
        console.log("hellow")
    }

    render() {
        return (
            <div className="game-screen">
                <GameHeader />
                <GameMainCont clicked={(event)=>{this.boxClick(event)}}/>
                <GameFooter />
            </div>
        )
    }

}
export default GameScreen;