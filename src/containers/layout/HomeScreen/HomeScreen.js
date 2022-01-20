import React, { Component } from 'react';
import { Navigate } from 'react-router-dom'
import './HomeScreen.css'
import { getDatabase, ref, child, get, update } from "firebase/database";

import Modal from '../../../components/UI/Modal/Modal.js'
import CreateGameM from '../../../components/CreateGameM/CreateGameM';
import BottomAlert from '../../../components/UI/BottomAlert/BottomAlert.js';
class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.playerName = React.createRef();
        this.serverId = React.createRef();
    }
    state = {
        showModal: false,
        navigate:false,
        alertMsg:""
    }
    setAlertMsg() {
        if(this.state.alertMsg){
            setTimeout(()=>{
                this.hideAlert();
            },2000)
        }
    }
    hideAlert() {
        this.setState({alertMsg:""})
    }
    createGameErrorHandler =(error)=>{
        if(error){
            this.setState({alertMsg:"Enter your Name"})
        }
    }
    btnCreateGame = () => {
        this.setState({ showModal: true })
    }
    btnCancelGame = () => {
        this.setState({ showModal: false })
    }
    btnJoinGame = () => {
        let player2Name = this.playerName.current.value;
        let gameCode = this.serverId.current.value;
        if (player2Name && gameCode) {
            const dbRef = ref(getDatabase());
            get(child(dbRef, `${gameCode}/`)).then((snapshot) => {
                if (snapshot.exists()) {
                    localStorage.setItem("serverId", gameCode);
                    localStorage.setItem("iam",player2Name);
                    update(child(dbRef, `${gameCode}/`), {player2:player2Name});
                    update(child(dbRef, `${gameCode}/`), {gameStart:true});
                    this.setState({navigate:true})
                } else {
                    console.log("No data available, Pls enter correct Game Code");
                    this.setState({ alertMsg:"No data available, Pls enter correct Game Code" })
                }
            }).catch((error) => {
                console.error(error);
            });
            this.setState({ alertMsg:"Please wait ....!" })
        } else {
            console.log('pls enter your name and game code')
            this.setState({ alertMsg:"Pls enter your name and game code to join Game! " })
        }
    }
    render() {
        this.setAlertMsg() ;
        return (
            <main className="HomeScreen">
                { this.state.navigate?<Navigate to={"/game-screen"} gameCode="abscd"/>:null}
                <div className="container">
                    <Modal backdropShow={this.state.showModal} >
                        <CreateGameM createGameError={(error)=>this.createGameErrorHandler(error)} btnCancelGame={this.btnCancelGame} />
                    </Modal>
                    <BottomAlert msg={this.state.alertMsg}/>
                    <h1 id="app-name">
                        The X'0 online
                    </h1>
                    <div className="inputs">
                        <input type="text" id="playerName" placeholder="Enter your name" ref={this.playerName} />
                        <input type="text" id="code" placeholder="Enter code" ref={this.serverId} />
                    </div>

                    <button className="btn" onClick={this.btnJoinGame}>Join game</button>
                    <h2  style={{
                   margin:'5px',
                   fontWeight:'bold'
                 }}> OR </h2>
                    <button className="btn" onClick={this.btnCreateGame}>Create game</button>

                </div>

            </main>
        )
    }

}
export default HomeScreen;
