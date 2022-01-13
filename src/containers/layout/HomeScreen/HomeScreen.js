import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './HomeScreen.css'

class HomeScreen extends Component {
    state = {

    }

    render() {
        return (
            <main className="HomeScreen">
                <div className="container">
                    <h1 id="app-name">
                        The X'0 online
                    </h1>
                    <input type="text" id="code" placeholder="enter code"/>
                    <Link className="btn" to="/game-screen">Join game</Link>
                    <Link className="btn" to="/game-screen">Create game</Link>

                </div>

            </main>
        )
    }

}
export default HomeScreen;
